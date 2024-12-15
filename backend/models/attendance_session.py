#!/usr/bin/env python3

"""Represents an open attendance_session"""

from .engine.storage import db
from uuid import uuid4


class AttendanceSession(db.Model):
    """Represents an attendance session"""

    __tablename__ = 'attendance_sessions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    attendance_id = db.Column(
        db.String(36), nullable=False, default=lambda: str(uuid4())
    )
    class_id = db.Column(
        db.Integer, db.ForeignKey('classrooms.id'), nullable=False
    )
    is_open = db.Column(db.Boolean, default=True, nullable=False)

    def to_dict(self):
        """Dictionary representation of an attendance session"""
        return {
            'id': self.id,
            'attendance_id': self.attendance_id,
            'classId': self.class_id,
            'isOpen': self.is_open,
        }
