from flask import request, jsonify
from . import lecturer_route
from backend.models.engine.storage import db
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom
from backend.models.student import Student
from backend.models.student_classroom import StudentClassroom
from backend.models.pending_student import PendingStudent
from backend.api.v1.utils.auth import requires_token
from .attendance import (
    attendance_session_exists,
    get_attendance_session,
    student_has_taken_attendance,
    get_attendance_session_id,
)


@lecturer_route.route('/classrooms', methods=['GET'], strict_slashes=False)
@requires_token
def get_classrooms(decoded_token):
    lecturer_id = decoded_token.get('role_id')
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
@requires_token
def add_classroom(decoded_token):
    data: dict = request.get_json()
    class_name = data.get('className')
    class_code = data.get('classCode')
    class_description = data.get('classDescription')
    lecturer_id = decoded_token.get('role_id')

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
@requires_token
def get_student_list(decoded_token, class_id):
    student_classroom_data = (
        db.session.query(StudentClassroom).filter_by(class_id=class_id).first()
    )
    pending_student_data = (
        db.session.query(PendingStudent)
        .filter_by(classroom_id=class_id)
        .first()
    )

    if not (student_classroom_data or pending_student_data):
        return (
            jsonify(
                {
                    'message': 'There are no students here, add some.',
                    'data': [],
                }
            ),
            200,
        )

    # check if attendance is currently happening
    attendance_id = get_attendance_session_id(class_id)

    # collect students with accounts
    students_in_class = []
    for student_classroom in (
        db.session.query(StudentClassroom).filter_by(class_id=class_id).all()
    ):
        student_info = {
            'studentId': student_classroom.student_id,
            'firstName': student_classroom.student.user.first_name,
            'lastName': student_classroom.student.user.last_name,
            'isPending': False,
        }
        has_taken_attendance = student_has_taken_attendance(
            student_id=student_classroom.student.id,
            class_id=class_id,
            attendance_id=attendance_id,
        )
        student_info.update({'hasTakenAttendance': has_taken_attendance})
        students_in_class.append(student_info)

    # collect pending students
    students_in_class.extend(
        [
            {
                'studentId': pending_student.offset_student_id,
                'firstName': pending_student.first_name,
                'lastName': pending_student.last_name,
                'isPending': True,
            }
            for pending_student in db.session.query(PendingStudent)
            .filter_by(classroom_id=class_id)
            .all()
        ]
    )

    sorted_students = sorted(
        students_in_class, key=lambda x: x.get('firstName')
    )

    # check if attendance is currently being taken
    attendance_data = {}
    if attendance_session_exists(class_id):
        attendance_session = get_attendance_session(class_id)
        attendance_data = {
            'id': attendance_session.id,
            'attendanceId': attendance_session.attendance_id,
        }

    return jsonify(
        {
            'message': 'Here is the class list',
            'classId': class_id,
            'attendanceData': attendance_data,
            'data': sorted_students,
        }
    )


@lecturer_route.route(
    '/uploadStudentList', methods=['POST'], strict_slashes=False
)
@requires_token
def upload_student_list(decoded_token):
    data: list[dict] = request.get_json()
    if not len(data):
        return (
            jsonify({'message': 'No student data was uploaded. Try again'}),
            400,
        )

    # fetch all student emails and decide if a student is a pending student
    all_students = {
        student.user.email: student.user.id
        for student in db.session.query(Student)
    }

    all_pending_students_rows = set(
        (pending_student.email, pending_student.classroom_id)
        for pending_student in db.session.query(PendingStudent).all()
    )

    all_student_classrooms = set(
        (student_classroom.student_id, student_classroom.class_id)
        for student_classroom in db.session.query(StudentClassroom).all()
    )

    classroom_id = data.get('classId')
    for student_data in data.get('students'):
        email = student_data.get('student email')
        if (
            email not in all_students
            and (email, classroom_id) not in all_pending_students_rows
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
            # do not re-add existing students
            student_exists = (
                student_id,
                classroom_id,
            ) in all_student_classrooms
            if not student_id or student_exists:
                continue
            student_classroom = StudentClassroom(
                student_id=student_id, class_id=classroom_id
            )
            db.session.add(student_classroom)
    db.session.commit()

    return jsonify({'message': 'Student list uploaded!'}), 200
