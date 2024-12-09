import os
from dotenv import load_dotenv
import jwt
from flask import request, jsonify
from functools import wraps

load_dotenv()


def requires_token(f):
    """Decorator for functions that need JWT token authentication"""

    @wraps(
        f
    )  # Ensures the original function's name and docstring are preserved
    def wrapper(*args, **kwargs):
        auth_token = None
        # check for token in request header
        if 'Authorization' in request.headers:
            auth_token = request.headers['Authorization'].split(' ')[
                1
            ]  # Bearer <auth_token>
        if not auth_token:
            return (
                jsonify(
                    {
                        'message': 'Unauthorized. Missing Token!. Please login again'
                    }
                ),
                401,
            )

        try:
            # Decode the token
            secret_key = os.getenv('SECRET_KEY')
            decoded_token = jwt.decode(
                auth_token, secret_key, algorithms=['HS256']
            )
        except jwt.ExpiredSignatureError:
            return (
                jsonify({'message': 'Token has expired. Please login again'}),
                401,
            )
        except jwt.InvalidTokenError:
            return (
                jsonify({'message': 'Invalid token! Please login again'}),
                401,
            )

        # pass the decoded token payload to the route function
        return f(decoded_token, *args, **kwargs)

    return wrapper
