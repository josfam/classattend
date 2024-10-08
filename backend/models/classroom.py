#!/usr/bin/env python3

"""Represents a classroom, where attendance can be opened, and taken"""

from datetime import datetime as dt
from .engine.storage import db


class Classroom(db.Model):
    """Represents a classroom where attendance can be opened, and taken"""

    __tablename__ = 'classrooms'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.String(60), nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    lecturer_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=True
    )
    created_at = db.Column(db.DateTime, nullable=False, default=dt.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=dt.now)

    # relationship to the lecturer
    lecturer = db.relationship('Lecturer', back_populates='classrooms')
    # relationship to students via an association table
    students = db.relationship('StudentClassroom', back_populates='classroom')
