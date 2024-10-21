from flask import session, request, jsonify
from backend.routes import auth_route

@auth_route.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """Signs a user up"""
    data = request.get_json()
    first_name = data.get('firstName')
    return jsonify({'message': 'signed up successfully!'})
    print(f'User: {first_name}')


@auth_route.route('/logout', methods=['POST'], strict_slashes=False)
def logout():
    """Logs a user out of the application"""
    pass
