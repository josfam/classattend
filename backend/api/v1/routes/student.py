from flask import session, request, jsonify
from . import student_route
from backend.models.engine.storage import db
from backend.models.student_classroom import StudentClassroom
from backend.models.attendance_session import AttendanceSession
from backend.api.v1.utils.auth import requires_token


@student_route.route('/getclasses', methods=['GET'], strict_slashes=False)
@requires_token
def get_classrooms(decoded_token):
    """Returns all classrooms that the student is a part of"""
    student_id = decoded_token['user_id']
    # check that the student is part of some class/classes
    student_classrooms = (
        db.session.query(StudentClassroom)
        .filter_by(student_id=student_id)
        .all()
    )

    if not student_classrooms:
        return jsonify({"message": "No classrooms found", "data": []}), 200
    # get all classes, and attendance status from this student
    all_classes = []
    for classroom in student_classrooms:
        class_dict = classroom.classrooms.to_dict()
        existing_session = (
            db.session.query(AttendanceSession)
            .filter_by(class_id=classroom.classrooms.id)
            .first()
        )
        if existing_session:
            attendance_data = existing_session.to_dict()
            attendance_data.update({'studentId': student_id})
            class_dict.update({'attendanceData': attendance_data})
        all_classes.append(class_dict)

    return jsonify({"message": "classes received", "data": all_classes}), 200
