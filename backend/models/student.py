#!/usr/bin/env python3

"""Data model for a student"""

from .engine.storage import db
from .user import User


class Student(db.Model):
    """Represents a student"""

    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True
    )

    # storing the public key for biometric authentication via fingerprint
    public_key = db.Column(db.Text, nullable=True)

    # relationship back to the user table
    user = db.relationship('User', back_populates='student', uselist=False)
    # relationship with classrooms via the association table
    classrooms = db.relationship('StudentClassroom', back_populates='student')
