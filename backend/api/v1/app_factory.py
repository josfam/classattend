#!/usr/bin/env python3

"""Creates and returns an application object"""

from flask import Flask
from backend.models.engine.storage import db
from backend.models.user import User
from backend.models.student import Student
from backend.models.admin import Admin
from backend.models.lecturer import Lecturer


def create_app(configuration=None):
    """Creates and returns the application object"""
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///classattend.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # apply the configuration if it exists
    if configuration:
        app.config.update(configuration)

    # initialize all extensions
    db.init_app(app)

    # create the database tables
    with app.app_context():
        db.create_all()

    return app
