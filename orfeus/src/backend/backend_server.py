from controllers.usercontroller import users_bp
from controllers.filecontroller import file_bp
from flask_cors import CORS
from models import init_app
from orfeus_config import app

CORS(app)
init_app(app)
app.register_blueprint(users_bp)
app.register_blueprint(file_bp)


if __name__ == "__main__":
    app.run(port=4000, debug=True)
