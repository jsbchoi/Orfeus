from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    print(request.get_data())
    return "Flask server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)