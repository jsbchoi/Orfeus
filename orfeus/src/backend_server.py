from flask import Flask, jsonify
from flask import make_response
from flask import request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy import insert
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import ForeignKey, exc, Table, Column, Integer, String, MetaData, VARBINARY
from flask_jwt_extended import decode_token, current_user, get_jwt_identity, JWTManager, create_access_token, jwt_required
import bcrypt
import json
import os, io
import numpy as np
from datetime import datetime
from scipy.io import wavfile

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:coolcool@127.0.0.1:3306/mydb'
engine = create_engine(
    "mysql+pymysql://root:coolcool@127.0.0.1:3306/mydb", echo=True)
app.config['JWT_SECRET_KEY'] = 'key'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 180
db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)

meta = MetaData()
user = Table(
    'user', meta,
    Column('id', Integer, primary_key=True),
    Column('username', String),
    Column('password', VARBINARY),
    Column('email', String),
    Column('role', Integer),
    Column('privacy_level', Integer),
    Column('profile_picture_path', String),
    Column('account_creation_date', String),
)

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.Integer, nullable=False)
    privacy_level = db.Column(db.Integer, nullable=False)
    profile_picture_path = db.Column(db.String(200), nullable=False)
    account_creation_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

song_file = Table("song_file", meta,
    Column("song_id", Integer, primary_key=True),
    Column("title", String(255)),
    Column("filepath", String(255)),
    Column("uploaded_date", String),
    Column("genre_id", Integer, ForeignKey("genre.id")),
    Column("artist_id", Integer, ForeignKey("artist.id")),
    Column("user_id", Integer, ForeignKey("user.id")),
)
class SongFile(db.Model):
    __tablename__ = "song_file"

    song_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    filepath = db.Column(db.String(255))
    uploaded_date = db.Column(db.String)
    genre_id = db.Column(db.Integer, db.ForeignKey("genre.id"))
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __repr__(self):
        return f"SongFile('{self.title}', '{self.filepath}', '{self.uploaded_date}')"

artist_table = Table("artist", meta,
    Column("id", Integer, primary_key=True),
    Column("name", String(45)),
)
class Artist(db.Model):
    __tablename__ = "artist"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    
    def __repr__(self):
        return f"Artist('{self.name}')"

genre = Table("genre", meta,
    Column("id", Integer, primary_key=True),
    Column("name", String(45), nullable=True)
)
class Genre(db.Model):
    __tablename__ = "genre"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=True)
    
    def __repr__(self):
        return f"Genre('{self.name}')"


@jwt.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data):
    identity = jwt_data['sub']
    user = User.query.filter_by(username=identity).one_or_none()
    return user


@app.route('/users/<int:user_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def delete_user(user_id):
    if request.method == 'DELETE':
        try:
            user = User.query.filter_by(id=user_id).first()
            if user:
                song_files = SongFile.query.filter_by(user_id=user_id).all()
                for song_file in song_files:
                    db.session.delete(song_file)
                    if os.path.isfile(song_file.filepath):
                        os.remove(song_file.filepath)   
                user_dir = os.path.join(os.getcwd(), 'song_database', user.username)
                os.rmdir(user_dir)
                db.session.delete(user)
                db.session.commit()
                return jsonify({'message': 'User deleted'})
            else:
                return jsonify({'error': 'User not found'}), 404
        except exc.SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'DELETE')
        response.status_code = 200
        return response


@app.route('/uploadFile', methods=['POST', 'OPTIONS'])
@cross_origin()
def upload():
    if request.method == 'POST':
        uploaded_file = request.files["file"]
        data = uploaded_file.read()
        now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        # Get the username from the decoded token
        access_token = request.headers.get('Authorization')
        decoded_token = decode_token(access_token.replace("Bearer", "").strip())
        user = decoded_token['sub']

        # # Create the output directory if it doesn't exist
        output_dir = os.path.join(os.getcwd(), 'song_database', user)
        os.makedirs(output_dir, exist_ok=True)  

        # Save the file as a WAV file
        output_filename = f"{user}-{now}.wav"
        output_path = os.path.join(output_dir, output_filename)
        print(output_path)
        data_buffer = io.BytesIO(data)
        audio_data = np.frombuffer(data_buffer.read(), dtype=np.int16)
        wavfile.write(output_path, 44100, audio_data)
        
        #Get user id to store file path and user id in database
        user_id_query = select(User.id).where(User.username == user)
        conn = engine.connect()
        idResult = conn.execute(user_id_query)
        dictionaryForQueryResult = {}
        for row in idResult:
            dictionaryForQueryResult = row._mapping
        insert_query = song_file.insert().values(title=output_filename, 
                                                 filepath=output_path, 
                                                 uploaded_date=str(now), 
                                                 genre_id=1, artist_id=1, 
                                                 user_id=dictionaryForQueryResult['id'])
        connection = engine.connect()
        result = connection.execute(insert_query)
        print(result)
        connection.close()
        return make_response("file saved in " + output_path, 200)

    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.status_code = 200
        return response
    # os.makedirs(user_song_dir, exist_ok=True)
    # file_path = f"{user_song_dir}/{file_name}.wav"
    # uploaded_file.save(file_path)
    # my_json = request.get_data().decode('utf8')
    # data = json.loads(my_json)
    # s = json.dumps(data, indent=4, sort_keys=True)
    # print(s)
    # filepath = f"song_database/{username}/"
    # print(filepath)
    # if not os.path.exists(filepath):
    #     os.makedirs(filepath)
    return "flask server"


@app.route('/register', methods=['POST'])
def register():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    # s = json.dumps(data, indent=4, sort_keys=True)
    bytesPassword = bcrypt.hashpw(
        data[1]["value"].encode('utf8'), bcrypt.gensalt())
    stmt = (
        db.insert(user).values(username=data[0]["value"], password=bytesPassword, email=data[2]["value"],
                               role=0, privacy_level=1, profile_picture_path="fakepath", account_creation_date=datetime.now())
    )
    s = select(user.c.id).where(user.c.username == data[0]["value"])
    print(stmt.compile().params)
    conn = engine.connect()
    result = conn.execute(stmt)
    idResult = conn.execute(s)
    print(result)
    dictionaryForQueryResult = {}
    for row in idResult:
        dictionaryForQueryResult = row._mapping
    # response = app.make_response({"id":dictionaryForQueryResult["id"], "username":session["name"]})
    directory = os.path.join("song_database", data[0]["value"])
    if not os.path.exists(directory):
        os.makedirs(directory)

    access_token = create_access_token(
        identity=data[0]["value"], additional_claims={'role': "user"})
    return jsonify(access_token=access_token)


@app.route('/login', methods=['POST'])
def login():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    print(data)
    s = select(user.c.password, user.c.id, user.c.role).where(
        user.c.username == data[0]["value"])
    conn = engine.connect()
    result = conn.execute(s)
    dictionaryForQueryResult = {}
    for row in result:
        dictionaryForQueryResult = row._mapping
    if bcrypt.checkpw(data[1]["value"].encode('utf8'), dictionaryForQueryResult["password"]):
        directory = os.path.join("song_database", data[0]["value"])
        if not os.path.exists(directory):
            os.makedirs(directory)
        print("authenticated")
        if dictionaryForQueryResult["role"] == 1:
            access_token = create_access_token(
                identity=data[0]["value"], additional_claims={'role': "admin"})
        else:
            access_token = create_access_token(
                identity=data[0]["value"], additional_claims={'role': "user"})
        return jsonify(access_token=access_token)
    else:
        return make_response("Bad credentials", 403)


@app.route('/users', methods=['GET'])
@jwt_required()
def users():
    if current_user.role == 1:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                column.name: getattr(user, column.name)
                for column in user.__table__.columns
                if column.name != "InstanceState"
            }
            user_list.append(user_dict)
        return json.dumps(user_list, default=str)
    else:
        return make_response(jsonify({"error": "You are not authorized to access this route"}), 401)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
