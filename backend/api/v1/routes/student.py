from flask import session, request, jsonify
from . import student_route
from backend.models.engine.storage import db
from backend.models.student_classroom import StudentClassroom
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
    # get all classes from this student
    all_classes = [
        classroom.classrooms.to_dict() for classroom in student_classrooms
    ]

    return jsonify({"message": "classes received", "data": all_classes}), 200
