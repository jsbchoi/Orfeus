from datetime import datetime
import subprocess
import time
from flask import Blueprint, Request, make_response, request, send_file
from flask_cors import cross_origin
from flask_jwt_extended import decode_token
import paramiko
from models import User, song_file, GeneratedFile
from orfeus_config import engine
from sqlalchemy import select
from scipy.io import wavfile
import numpy as np
import os
import io
from paramiko import SSHClient
import os, json, io


file_bp = Blueprint('files', __name__)




@file_bp.route('/generatedfiles/<int:sound_file_id>', methods=['GET', 'OPTIONS'])
@cross_origin()
def getGeneratedFileForPlayback(sound_file_id):
    song = GeneratedFile.query.filter_by(id=sound_file_id).first()
    base_path = os.getcwd()
    song_path = os.path.relpath(song.filepath, os.path.join(base_path, "src\\backend"))

    # Check if the song exists in the database
    if song is None:
        return make_response("Song not found", 404)
    
    # Check if the file exists
    if not os.path.isfile(song_path):
        return make_response("Audio file not found", 404)
    
    # Send the audio file in the response
    return send_file(song_path, mimetype='audio/mpeg')


@file_bp.route('/carouselfiles', methods=['GET', 'OPTIONS'])
@cross_origin()
def getCarouselSongs():
    songs = GeneratedFile.query.all()
    song_list = []
    for song in songs:
        song_dict = {
            column.name: getattr(song, column.name)
            for column in song.__table__.columns
            if column.name != "InstanceState"
        }
        song_list.append(song_dict)
    print(song_list)
    return json.dumps(song_list, default=str)


@file_bp.route('/file', methods=['POST', 'OPTIONS'])
@cross_origin()
def upload():
    if request.method == 'POST':

        uploaded_file = request.files["file"]
        data = uploaded_file.read()
        now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        # Get the username from the decoded token
        access_token = request.headers.get('Authorization')
        decoded_token = decode_token(
            access_token.replace("Bearer", "").strip())
        decoded_token = decode_token(
            access_token.replace("Bearer", "").strip())
        user = decoded_token['sub']

        # # Create the output directory if it doesn't exist
        output_dir = os.path.join(os.getcwd(), 'song_database', user)
        if not os.path.isdir(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        # Save the file as a WAV file
        output_filename = f"{user}-{now}.wav"
        output_path = os.path.join(output_dir, output_filename)
        print(output_path)
        data_buffer = io.BytesIO(data)
        audio_data = np.frombuffer(data_buffer.read(), dtype=np.int16)
        wavfile.write(output_path, 44100, audio_data)

        # Get user id to store file path and user id in database

        # Get user id to store file path and user id in database
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
        # Start the first subprocess to establish the SSH tunnel
        # Start first subprocess
        result = subprocess.Popen(['ssh', '-t', '-L', '5000:mworks06.rd.unr.edu:22', 'jschoi@nxlogin.engr.unr.edu', 'export SSH_AUTH_SOCK=/tmp/ssh-eJvJepg1tw6n/agent.2523; echo "command complete"; exec $SHELL -l'], start_new_session=True, creationflags=subprocess.CREATE_NEW_CONSOLE)
        # Delay for Authentication
        time.sleep(5)
        # Start second subprocess
        result2 = subprocess.Popen(['ssh', 'localhost'])
        return make_response("file saved in " + output_path, 200)

    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.status_code = 200
        return response
    return "flask server"
