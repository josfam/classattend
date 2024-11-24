from flask import session, request, jsonify
from . import lecturer_route
from backend.models.engine.storage import db
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom
from backend.models.student_classroom import StudentClassroom


@lecturer_route.route('/classrooms', methods=['GET'], strict_slashes=False)
def get_classrooms():
    lecturer_id = session['user_id']
    # see if this lecturer already has classrooms
    existing_classrooms = Classroom.query.filter_by(
        lecturer_id=lecturer_id
    ).all()
    if not existing_classrooms:
        return jsonify({"message": "No classrooms found", "data": []}), 200

    all_classes = []
    for classroom in existing_classrooms:
        all_classes.append(classroom.to_dict())

    return jsonify({"message": "classes received", "data": all_classes}), 200


@lecturer_route.route('/addclassroom', methods=['POST'], strict_slashes=False)
def add_classroom():
    data: dict = request.get_json()
    class_name = data.get('className')
    class_code = data.get('classCode')
    class_description = data.get('classDescription')
    lecturer_id = session.get('user_id')

    # check if this class already exists
    existing_class = Classroom.query.filter_by(code=class_code).first()
    if existing_class:
        return jsonify({'message': 'This classroom already exists'}), 409
    # create a classroom
    classroom = Classroom(
        code=class_code,
        name=class_name,
        description=class_description,
        lecturer_id=lecturer_id,
    )
    db.session.add(classroom)
    db.session.commit()

    return jsonify({'message': 'Classroom added successfully'}), 200


@lecturer_route.route(
    '/getStudentList/<int:class_id>', methods=['GET'], strict_slashes=False
)
def get_student_list(class_id):
    print('Class id is: ', class_id)  # DEBUG
    student_entries = StudentClassroom.query.filter_by(class_id=class_id)
    student_count = student_entries.count()
    print(f'Student count: {student_count}')

    if not student_count:
        return (
            jsonify(
                {
                    'message': 'There are no students here, add some.',
                    'data': [],
                }
            ),
            200,
        )
    students = ""
    return jsonify({'message': 'Here is the class list', 'data': students})


@lecturer_route.route(
    '/uploadStudentList', methods=['POST'], strict_slashes=False
)
def upload_student_list():
    data: dict = request.get_json()
    if not len(data):
        return (
            jsonify({'message': 'No student data was uploaded. Try again'}),
            400,
        )
    print('Student dict submitted is: ', data)  # DEBUG
    return jsonify({'message': 'Student list uploaded!'}), 200
