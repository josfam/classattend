#!/usr/bin/env python3

"""Joining table between students and classrooms"""

from .engine.storage import db


class StudentClassroom(db.Model):
    """Represents the joining table between students and classrooms"""

    __tablename__ = "student_classrooms"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(
        db.Integer, db.ForeignKey('students.user_id', name='fk_students_user_id'), nullable=False
    )
    class_id = db.Column(
        db.Integer, db.ForeignKey('classrooms.id', name='fk_classrooms_id'), nullable=False
    )

    # relationship to the student
    student = db.relationship('Student', back_populates='classrooms')
    # relationship to the classroom
    classrooms = db.relationship('Classroom', back_populates='students')
