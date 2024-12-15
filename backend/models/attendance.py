#!/usr/bin/env python3

"""Represents an attendance record"""

from .engine.storage import db
from datetime import datetime as dt, timezone
from uuid import uuid4


class Attendance(db.Model):
    """Represents an attendance record"""

    __tablename__ = 'attendances'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    class_id = db.Column(
        db.Integer, db.ForeignKey('classrooms.id'), nullable=False
    )
    student_id = db.Column(
        db.Integer, db.ForeignKey('students.id'), nullable=False
    )
    attendance_id = db.Column(
        db.String(36), nullable=False, default=lambda: str(uuid4())
    )
    recorded_at = db.Column(
        db.DateTime, nullable=False, default=dt.now(timezone.utc)
    )
    lecturer_id = db.Column(
        db.Integer, db.ForeignKey('lecturers.id'), nullable=False
    )
