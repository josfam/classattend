"""For application routes"""

from flask import Blueprint

auth_route = Blueprint('auth_route', __name__, url_prefix='/api/v1/auth/')

from backend.routes.auth import *
