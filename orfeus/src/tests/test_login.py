import pytest
import requests
from flask import Flask

baseURL = "http://127.0.0.1:4000/"

@pytest.fixture
def app():
    app = Flask(__name__)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_login_success():
    # Send a POST request with valid credentials
    data = [{"id": "1", "value": "regularuser"}, {"id": "2", "value": "user"}]
    url = baseURL + 'login'
    print(f"Sending request to {url} with data {data}")
    response = requests.post(url, json=data)
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.text}")
    
    # Check that the response status code is 200 OK
    assert response.status_code == 200

    # Check that the response contains an access token
    assert 'access_token' in response.json()

def test_login_failure(client):
    # Send a POST request with invalid credentials
    data = [{"id": "1", "value": "regularuser"}, {"id": "2", "value": "wrongpassword"}]
    url = baseURL + 'login'
    print(f"Sending request to {url} with data {data}")
    response = requests.post(url, json=data)
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.text}")

    # Check that the response status code is 403 Forbidden
    assert response.status_code == 403

    # Check that the response contains an error message
    assert response.text == "Bad credentials"
