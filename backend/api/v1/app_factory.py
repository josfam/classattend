#!/usr/bin/env python3

"""Creates and returns an application object"""

from flask import Flask
from flask_session import Session
from backend.models.engine.storage import db
from backend.models.user import User
from backend.models.student import Student
from backend.models.admin import Admin
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom
from backend.models.student_classroom import StudentClassroom


def create_app(configuration=None):
    """Creates and returns the application object"""
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///classattend.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # configs for flask session
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SESSION_SQLALCHEMY'] = db
    app.config['SESSION_USE_SIGNER'] = True # sign the cookie for security
    app.config['SESSION_PERMANENT'] = True # sessions are cleared on explicit logout or after expiration


    # apply the configuration if it exists
    if configuration:
        app.config.update(configuration)

    # initialize all extensions
    db.init_app(app)
    Session(app)

    # create the database tables
    with app.app_context():
        db.create_all()

    # register blueprints

    return app
