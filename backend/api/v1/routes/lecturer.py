from flask import session, request, jsonify
from . import lecturer_route
from backend.models.engine.storage import db
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom
from backend.models.student import Student
from backend.models.student_classroom import StudentClassroom
from backend.models.pending_student import PendingStudent


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
    print('Class id', type(class_id))  # DEBUG
    student_classroom_data = db.session.query(StudentClassroom)
    pending_student_data = db.session.query(PendingStudent)

    if not (student_classroom_data and pending_student_data):
        return (
            jsonify(
                {
                    'message': 'There are no students here, add some.',
                    'data': [],
                }
            ),
            200,
        )
    # collect both pending students and students officially in the class
    all_student_classrooms = {
        student_classroom.student_id: student_classroom.class_id
        for student_classroom in db.session.query(StudentClassroom)
    }

    students = ""
    return jsonify({'message': 'Here is the class list', 'data': students})


@lecturer_route.route(
    '/uploadStudentList', methods=['POST'], strict_slashes=False
)
def upload_student_list():
    data: list[dict] = request.get_json()
    if not len(data):
        return (
            jsonify({'message': 'No student data was uploaded. Try again'}),
            400,
        )

    # fetch all student emails and decide if a student is a pending student
    all_students = {
        student.user.email: student.id for student in db.session.query(Student)
    }

    all_pending_student_emails = set(
        pending_student.email
        for pending_student in db.session.query(PendingStudent)
    )

    classroom_id = data.get('classId')
    for student_data in data.get('students'):
        email = student_data.get('student email')
        if (
            email not in all_students
            and email not in all_pending_student_emails
        ):
            # add to pending students
            pending_student = PendingStudent(
                first_name=student_data.get('first name', ''),
                last_name=student_data.get('last name', ''),
                email=email,
                classroom_id=classroom_id,
            )
            db.session.add(pending_student)
        else:
            # add to student classroom
            student_id = all_students.get(email)
            if not student_id:
                continue
            student_classroom = StudentClassroom(
                student_id=student_id, class_id=classroom_id
            )
            db.session.add(student_classroom)
    db.session.commit()

    # print('All emails', all_emails)
    return jsonify({'message': 'Student list uploaded!'}), 200
