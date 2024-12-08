#!/usr/bin/env python3

"""Creates and returns an application object"""

import os
from flask import Flask
from flask_migrate import Migrate
from flask_session import Session
from flask_cors import CORS
from backend.models.engine.storage import db
from backend.models.user import User
from backend.models.student import Student
from backend.models.admin import Admin
from backend.models.lecturer import Lecturer
from backend.models.classroom import Classroom
from backend.models.student_classroom import StudentClassroom
from backend.models.pending_student import PendingStudent
from .routes import auth_route, lecturer_route, student_route, classroom_route
from dotenv import load_dotenv
from datetime import timedelta
from .config import DevelopmentConfig, ProductionConfig

load_dotenv()


def create_app():
    """Creates and returns the application object"""
    app = Flask(__name__)
    # set up migrations
    migrate = Migrate(app=app, db=db)

    # apply a config based on environment
    if os.getenv('APP_ENVIRONMENT') == 'development':
        app.config.from_object(DevelopmentConfig)
        frontend_client = os.getenv('DEV_CLIENT_ADDRESS')
    else:
        app.config.from_object(ProductionConfig)
        frontend_client = os.getenv('PROD_CLIENT_ADDRESS')

    # setup cors for all routes
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [frontend_client],
                "methods": ['GET', 'POST', 'PUT', 'OPTIONS', 'PATCH'],
                "allow_headers": ['Content-Type', 'Authorization'],
            }
        },
        supports_credentials=True,
    )

    # initialize all extensions
    db.init_app(app)
    Session(app)

    # create the database tables
    with app.app_context():
        # db.drop_all()
        db.create_all()

    # register blueprints
    app.register_blueprint(auth_route)
    app.register_blueprint(lecturer_route)
    app.register_blueprint(student_route)
    app.register_blueprint(classroom_route)

    return app
