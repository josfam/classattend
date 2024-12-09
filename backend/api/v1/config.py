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


class DevelopmentConfig(BaseConfig):
    """Configuration for the development environment"""

    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI_STRING')
    DEBUG = True


class ProductionConfig(BaseConfig):
    """Configuration for the production environment"""

    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI_STRING')
    DEBUG = False
