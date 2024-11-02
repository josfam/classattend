#!/usr/bin/env python3

"""Represents a lecturer"""

from .engine.storage import db


class Lecturer(db.Model):
    """Represents a lecturer"""

    __tablename__ = 'lecturers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    faculty = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(60), nullable=False)
    staff_id = db.Column(db.String(60), nullable=False)

    # relationship with user
    user = db.relationship('User', back_populates='lecturer', uselist=False)
    # relationship with classrooms
    classrooms = db.relationship('Classroom', back_populates='lecturer')
