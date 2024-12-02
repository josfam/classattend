"""For app configuration"""

import os
from datetime import timedelta
from backend.models.engine.storage import db
from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    """Base configuration from which all other configurations will inherit
    from
    """

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # flask session
    SESSION_TYPE = 'sqlalchemy'
    SESSION_SQLALCHEMY = db
    SESSION_PERMANENT = False  # sessions are temporary
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=60)


class DevelopmentConfig(BaseConfig):
    """Configuration for the development environment"""

    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI_STRING')
    # flask session
    SESSION_COOKIE_SECURE = True
    # cors
    SESSION_COOKIE_SAMESITE = (
        'None'  # separate domain for frontend and backend
    )


class ProductionConfig(BaseConfig):
    """Configuration for the production environment"""

    SESSION_USE_SIGNER = True  # sign the cookie for security
