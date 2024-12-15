from flask import jsonify
from backend.models.engine.storage import db
from backend.models.attendance_session import AttendanceSession
from backend.models.attendance import Attendance
from backend.api.v1.utils.auth import requires_token
from . import attendance_route


def create_attendance_session(class_id):
    """Creates a new attendance session"""
    existing_session = (
        db.session.query(AttendanceSession)
        .filter_by(class_id=class_id)
        .first()
    )
    if not existing_session:
        new_session = AttendanceSession(class_id=class_id)
        db.session.add(new_session)
        db.session.commit()
        return new_session


def remove_attendance_session(class_id):
    """Removes this attendance session"""
    existing_session = (
        db.session.query(AttendanceSession)
        .filter_by(class_id=class_id)
        .first()
    )
    if existing_session:
        db.session.delete(existing_session)
        db.session.commit()


def attendance_session_exists(class_id):
    """Returns whether or not an attendance session exists"""
    existing_session = (
        db.session.query(AttendanceSession)
        .filter_by(class_id=class_id)
        .first()
    )
    return len(existing_session) > 0


@attendance_route.route(
    '/registerAttendance/<string:attendance_id>/<int:class_id>/<int:lecturer_id>',
    methods=['POST'],
    strict_slashes=False,
)
@requires_token
def register_attendance(decoded_token, attendance_id, class_id, lecturer_id):
    """Registers a student's attendance for a particular class"""
    student_id = decoded_token['role_id']
    # check that this student id combo does not exist
    existing_record = (
        db.session.query(Attendance)
        .filter_by(
            attendance_id=attendance_id,
            student_id=student_id,
            class_id=class_id,
        )
        .first()
    )
    if existing_record:
        return jsonify({'message': 'You have already taken attendance'}), 409
    # add an entry to the attendance table
    new_attendance = Attendance(
        class_id=class_id,
        student_id=student_id,
        attendance_id=attendance_id,
        lecturer_id=lecturer_id,
    )
    db.session.add(new_attendance)
    db.session.commit()

    return jsonify({'message': 'Attendance registered'}), 200
