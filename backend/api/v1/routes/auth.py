import bcrypt
import jwt
import os
from functools import wraps
from dotenv import load_dotenv
from backend.utils.constants import TOKEN_EXPIRATION_TIME
from datetime import datetime as dt, timedelta, timezone
from flask import request, jsonify
from . import auth_route
from backend.models.engine.storage import db
from backend.models.user import User, UserRole
from backend.models.lecturer import Lecturer
from backend.models.student import Student
from backend.models.pending_student import PendingStudent
from backend.models.student_classroom import StudentClassroom
from backend.api.v1.utils.auth import requires_token

load_dotenv()


@auth_route.route('/checkloggedin', methods=['POST'], strict_slashes=False)
@requires_token
def check_logged_in(decoded_token):
    """Checks if the user is logged in via JWT"""
    return jsonify({'message': 'OK'}), 200


@auth_route.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """Signs a user up"""
    data: dict = request.get_json()
    first_name = data.get('firstname')
    last_name = data.get('lastname')
    email = data.get('email')
    role = UserRole[data.get('role').upper()]
    password_hash = hash_password(data.get('password'))

    # create a new user
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        role=role,
        password_hash=password_hash,
    )
    db.session.add(new_user)
    db.session.commit()

    new_user_id = new_user.id

    # also create a lecturer or student, depending on the user's role.
    if role == UserRole.LECTURER:
        title = data.get('title')
        faculty = data.get('faculty')
        add_lecturer(
            title=title,
            faculty=faculty,
            user_id=new_user_id,
        )
    elif role == UserRole.STUDENT:
        public_key = data.get('public_key', None)
        new_student = Student(user_id=new_user_id, public_key=public_key)
        db.session.add(new_student)
        db.session.commit()

        # remove the student from all the pending student lists and add them to student classrooms
        pending_rows = (
            db.session.query(PendingStudent).filter_by(email=email).all()
        )
        for pending_row in pending_rows:
            # add the student to the correct classroom
            new_student_classroom = StudentClassroom(
                student_id=new_user_id, class_id=pending_row.classroom_id
            )
            db.session.add(new_student_classroom)
            # remove from pending students
            db.session.delete(pending_row)

    # commit changes
    db.session.commit()

    return jsonify({'message': 'Signed up successfully!'}), 200


@auth_route.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Logs a user in"""
    data: dict = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # check if user exists
    existing_user = User.query.filter_by(email=email).first()

    if not existing_user:
        return jsonify({'message': 'Account not found'}), 401

    hashed_password = existing_user.password_hash
    if not passwords_match(password, hashed_password=hashed_password):
        return jsonify({'message': 'Email or password is incorrect'}), 401
    role = existing_user.role.name.title()
    role_id = None
    if role == UserRole.LECTURER.name.title():
        role_id = existing_user.lecturer.id
    else:
        role_id = existing_user.student.id

    # Generate the JWT token
    jwt_payload = {
        'user_id': existing_user.id,
        'role_id': role_id,
        'role': existing_user.role.name.title(),
        'expiration': (
            dt.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRATION_TIME)
        ).isoformat(),
    }
    secret_key = os.getenv('SECRET_KEY')
    jwt_token = jwt.encode(jwt_payload, secret_key, algorithm='HS256')

    return (
        jsonify({'message': 'Logged in successfully', 'jwt_token': jwt_token}),
        200,
    )


@auth_route.route('/logout', methods=['POST'], strict_slashes=False)
@requires_token
def logout(decoded_token):
    """Logs a user out of the application"""
    return jsonify({"message": "Logged out successfully"}), 200


def hash_password(password: str):
    """Hashes the provided password, and returns the hashed version"""
    salt = bcrypt.gensalt()
    password = password.encode('utf-8')
    return bcrypt.hashpw(password, salt)


def passwords_match(password: str, hashed_password: bytes):
    """Returns True if the password provided matches one that is stored (hash-wise)"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)


def add_lecturer(title='', faculty='', user_id=0):
    new_lecturer = Lecturer(user_id=user_id, faculty=faculty, title=title)
    db.session.add(new_lecturer)
    db.session.commit()
