#!/usr/bin/env python3

"""Runs an instance of the application"""

from flask import jsonify
from backend.api.v1.app_factory import create_app

# from .api.v1.app_factory import create_app

app = create_app()


# default route
@app.route('/', strict_slashes=False, methods=['GET'])
def home():
    """Default home page"""
    return jsonify({'message': 'welcome to class attend'})


if __name__ == '__main__':
    app.run()
