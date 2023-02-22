from datetime import datetime
import subprocess
import time
from flask import Blueprint, Request, make_response, request
from flask_cors import cross_origin
from flask_jwt_extended import decode_token
import paramiko
from models import User, song_file
from orfeus_config import engine
from sqlalchemy import select
from scipy.io import wavfile
import numpy as np
import os
import io
from paramiko import SSHClient


file_bp = Blueprint('files', __name__)


@file_bp.route('/uploadFile', methods=['POST', 'OPTIONS'])
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
