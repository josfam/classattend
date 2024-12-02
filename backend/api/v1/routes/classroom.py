from flask import session, request, jsonify
from . import classroom_route
from backend.models.engine.storage import db
from backend.models.classroom import Classroom


@classroom_route.route(
    '/isAttendanceOpen/<int:class_id>', methods=['GET'], strict_slashes=False
)
def is_attendance_open(class_id):
    """Returns whether or not the attendance for a provided class is open"""
    classroom = db.session.query(Classroom).filter_by(id=class_id).first()
    if not classroom:
        return jsonify({'message': 'Something went wrong'}), 500
    return jsonify({'attendanceOpen': classroom.attendance_open})


@classroom_route.route(
    '/toggleAttendanceStatus/<int:class_id>',
    methods=['PATCH'],
    strict_slashes=False,
)
def toggle_attendance_status(class_id):
    """Toggles the attendance status of the classroom"""
    classroom = db.session.query(Classroom).filter_by(id=class_id).first()
    if not classroom:
        return jsonify({'message': 'Something went wrong'}), 500
    try:
        classroom.attendance_open = not classroom.attendance_open
        db.session.commit()
        message = (
            'Attendance taking started'
            if classroom.attendance_open
            else 'Attendance taking stopped'
        )
        return (
            jsonify(
                {
                    'message': message,
                    'attendanceOpen': classroom.attendance_open,
                }
            ),
            200,
        )
    except Exception as e:
        # rollback in case of an error
        db.session.rollback()
        message = (
            'Could not turn on attendance taking'
            if classroom.attendance_open
            else 'Could not turn off attendance taking'
        )
        return jsonify({'message': message}), 500
