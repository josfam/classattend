from backend.models.engine.storage import db
from backend.models.attendance_session import AttendanceSession


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
