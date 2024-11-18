#!/usr/bin/env python3

"""Represents a pending student, that is, a student who is part of a class, but
may not have an account in the application yet. A pending student is simply part
of a student list that was uploaded by a lecturer.
"""

from .engine.storage import db


class PendingStudent(db.Model):
    """Represents a pending student, that is, a student who is part of a class,
    but may not have an account in the application yet. A pending student is
    simply part of a student list that was uploaded by a lecturer."""

    __tablename__ = 'pending_students'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    classroom_id = db.Column(
        db.Integer, db.ForeignKey('classrooms.id'), nullable=False
    )
    # relationship back to the classroom
    classroom = db.relationship('Classroom', back_populates='pending_students')
