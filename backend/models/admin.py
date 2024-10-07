#!/usr/bin/env python3

"""Represents an admin"""

from .engine.storage import db


class Admin(db.Model):
    """Represents an admin"""

    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True
    )

    # relationship back to the user table
    user = db.relationship('User', back_populates='admin', uselist=False)
