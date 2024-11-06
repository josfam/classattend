import bcrypt
from flask import session, request, jsonify
from . import auth_route
from backend.models.engine.storage import db
from backend.models.user import User, UserRole
from backend.models.lecturer import Lecturer
from backend.models.student import Student


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

    print(new_user)  # DEBUG
    new_user_id = new_user.id

    # also create a lecturer or student, depending on the user's role.
    if role == UserRole.LECTURER:
        title = data.get('title')
        staff_id = data.get('staffId')
        faculty = data.get('faculty')
        add_lecturer(
            title=title,
            staff_id=staff_id,
            faculty=faculty,
            user_id=new_user_id,
        )
    elif role == UserRole.STUDENT:
        student_id = data.get('studentId')
        public_key = data.get('public_key', None)
        add_student(
            student_id=student_id, public_key=public_key, user_id=new_user_id
        )

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
    # add user to session
    session['user_id'] = existing_user.id
    role = existing_user.role.name.title()
    session['user_role'] = role
    return jsonify({'message': 'Logged in successfully', 'role': role}), 200


@auth_route.route('/logout', methods=['POST'], strict_slashes=False)
def logout():
    """Logs a user out of the application"""
    pass


def hash_password(password: str):
    """Hashes the provided password, and returns the hashed version"""
    salt = bcrypt.gensalt()
    hashed_pwd = bcrypt.hashpw(password.encode(), salt)
    return hashed_pwd


def passwords_match(password: str, hashed_password: str):
    """Returns True if the password provided matches one that is stored (hash-wise)"""
    hashed_pwd = hash_password(password)
    return bcrypt.checkpw(password, hashed_password)


def add_lecturer(title='', staff_id='', faculty='', user_id=0):
    new_lecturer = Lecturer(
        user_id=user_id, faculty=faculty, title=title, staff_id=staff_id
    )
    db.session.add(new_lecturer)
    db.session.commit()


def add_student(student_id='', public_key=None, user_id=0):
    new_student = Student(
        user_id=user_id, student_id=student_id, public_key=public_key
    )
    db.session.add(new_student)
    db.session.commit()
