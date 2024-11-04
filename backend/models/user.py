#!/usr/bin/env python3

"""Data model for a user of the application"""

import enum
from .engine.storage import db
from textwrap import dedent

class UserRole(enum.Enum):
    """Defines the possible roles a user can have"""
    ADMIN = 'Admin'
    STUDENT = 'Student'
    LECTURER = 'Lecturer'


class User(db.Model):
    """Represents a user with attributes common to all users of the application"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    # relationship to a student
    student = db.relationship('Student', back_populates='user', uselist=False)
    # relationship to an admin
    admin = db.relationship('Admin', back_populates='user', uselist=False)
    # relationship with lecturer
    lecturer = db.relationship(
        'Lecturer', back_populates='user', uselist=False
    )

    def __str__(self) -> str:
        return dedent(f"""
        [id: {self.id}] ({self.role}) {self.first_name}, {self.last_name} - {self.email}""")
