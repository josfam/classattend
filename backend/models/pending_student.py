#!/usr/bin/env python3

"""Represents a pending student, that is, a student who is part of a class, but
may not have an account in the application yet. A pending student is simply part
of a student list that was uploaded by a lecturer.
"""

from .engine.storage import db
from backend.utils.constants import PENDING_STUDENTS_ID_OFFSET


class PendingStudent(db.Model):
    """Represents a pending student, that is, a student who is part of a class,
    but may not have an account in the application yet. A pending student is
    simply part of a student list that was uploaded by a lecturer."""

    __tablename__ = 'pending_students'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(120), nullable=False, default='')
    last_name = db.Column(db.String(120), nullable=False, default='')
    email = db.Column(db.String(120), nullable=False)
    classroom_id = db.Column(
        db.Integer, db.ForeignKey('classrooms.id'), nullable=False
    )
    # relationship back to the classroom
    classroom = db.relationship('Classroom', back_populates='pending_students')

    @property
    def offset_student_id(self):
        """Returns an offset id for this entry, to prevent id collision with normal registered students"""
        return self.id + PENDING_STUDENTS_ID_OFFSET
