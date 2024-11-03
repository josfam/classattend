from flask import session, request, jsonify
from backend.routes import auth_route

@auth_route.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """Signs a user up"""
    data = request.get_json()
    print(data)
    first_name = data.get('firstName')
    print(f'User: {first_name}')
    return jsonify({'message': 'signed up successfully!'})

@auth_route.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Logs a user in"""
    return jsonify({'message': 'logged in successfully'})

@auth_route.route('/logout', methods=['POST'], strict_slashes=False)
def logout():
    """Logs a user out of the application"""
    pass
