from flask import session, request, jsonify
from . import lecturer_route
from backend.models.engine.storage import db
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom


@lecturer_route.route('/classrooms', methods=['GET'], strict_slashes=False)
def get_classrooms():
    lecturer_id = session['user_id']
    # see if this lecturer already has classrooms
    existing_classrooms = Classroom.query.filter_by(lecturer_id=lecturer_id).all()
    if not existing_classrooms:
        return jsonify({"message": "No classrooms found", "data": []}), 200
    return jsonify({"message": "classes received"}), 200
