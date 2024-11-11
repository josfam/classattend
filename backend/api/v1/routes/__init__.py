"""For application routes"""

from flask import Blueprint

auth_route = Blueprint('auth_route', __name__, url_prefix='/api/v1/auth/')
lecturer_route = Blueprint('lecturer_route', __name__, url_prefix='/api/v1/lecturer/')

from .auth import *
from .lecturer import *
