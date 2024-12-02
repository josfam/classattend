"""For application routes"""

from flask import Blueprint

auth_route = Blueprint('auth_route', __name__, url_prefix='/api/v1/auth/')
lecturer_route = Blueprint(
    'lecturer_route', __name__, url_prefix='/api/v1/lecturer/'
)
student_route = Blueprint(
    'student_route', __name__, url_prefix='/api/v1/student/'
)
classroom_route = Blueprint(
    'classroom_route', __name__, url_prefix='/api/v1/classroom/'
)

from .auth import *
from .lecturer import *
from .student import *
from .classroom import *
