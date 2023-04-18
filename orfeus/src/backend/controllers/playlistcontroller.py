import os
from flask import Blueprint, jsonify, make_response, request, send_file
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, jwt_required
from orfeus_config import db, meta
from models import SongFile, GeneratedFile, Playlist, User, PlaylistSong

playlist_bp = Blueprint('playlists', __name__)


@playlist_bp.route('/playlist/', methods=['POST', 'OPTIONS'])
@jwt_required()
@cross_origin()
def addPlaylist():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    # Parse the incoming JSON request
    data = request.get_json()

    # Check if 'name' is provided in the request
    if 'name' not in data:
        return jsonify({"error": "Missing playlist name"}), 400

    # Create a new Playlist instance with the provided data
    new_playlist = Playlist(name=data['name'], user_id=user.id)

    # Save the new playlist to the database
    db.session.add(new_playlist)
    db.session.commit()

    # Return a success message and the new playlist's ID
    return jsonify({"message": "Playlist created successfully", "playlist_id": new_playlist.id}), 201


@playlist_bp.route('/playlist/', methods=['GET'])
@jwt_required()
@cross_origin()
def getUserPlaylists():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"message": "User not found"}), 404

    user_playlists = Playlist.query.filter_by(user_id=user.id).all()

    if user_playlists is None:
        return jsonify({"message": "No playlists found"}), 404

    playlists_data = []
    for playlist in user_playlists:
        playlist_songs = PlaylistSong.query.filter_by(
            playlist_id=playlist.id).all()
        generated_files_list = [{'id': ps.generated_file.id,
                                 'filepath': ps.generated_file.filepath} for ps in playlist_songs]

        playlist_data = {
            'id': playlist.id,
            'name': playlist.name,
            'user_id': playlist.user_id,
            'songs': generated_files_list
        }
        playlists_data.append(playlist_data)

    return jsonify(playlists_data), 200


@playlist_bp.route('/playlist/<int:playlist_id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletePlaylist(playlist_id):
    playlist = Playlist.query.filter_by(id=playlist_id).first()
    if not playlist:
        make_response(
            404, description=f"Playlist with id {playlist_id} not found")
     # Query to grab all PlaylistSong instances by playlist_id
    playlist_songs = PlaylistSong.query.filter_by(
        playlist_id=playlist_id).all()

    # Delete each PlaylistSong instance
    for playlist_song in playlist_songs:
        db.session.delete(playlist_song)

    # Commit the changes to the database
    db.session.delete(playlist)
    db.session.commit()
    return jsonify(message=f"Playlist with id {playlist_id} deleted successfully"), 200

@playlist_bp.route('/playlist/<int:playlist_id>/add/<int:generated_file_id>', methods=['POST'])
@cross_origin()
def addSongToPlaylist(playlist_id, generated_file_id):
    if request.method == 'POST':

        # Load the playlist and generated file from the database
        playlist = Playlist.query.filter_by(id=playlist_id).first()
        generated_file = GeneratedFile.query.filter_by(id=generated_file_id).first()

        playlist_song = PlaylistSong(playlist=playlist, generated_file=generated_file)

        # Add the new playlist song relationship to the session and commit it to the database
        db.session.add(playlist_song)
        db.session.commit()

        # Optionally, you can print out the newly created playlist song instance for confirmation
        print(playlist_song)

        # Return a success message
        return jsonify({'message': 'Song added to playlist successfully.'}), 200
    
    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.status_code = 200
        return response

@playlist_bp.route('/playlist/<int:playlist_id>/remove/<int:generated_file_id>', methods=['POST'])
@cross_origin()
def removeSongToPlaylist(playlist_id, generated_file_id):
    if request.method == 'POST':
        playlist_song = PlaylistSong.query.filter_by(playlist_id=playlist_id, generated_file_id=generated_file_id).first()

        # Add the new playlist song relationship to the session and commit it to the database
        db.session.delete(playlist_song)
        db.session.commit()

        # Optionally, you can print out the newly created playlist song instance for confirmation
        print(playlist_song)

        # Return a success message
        return jsonify({'message': 'Song added to playlist successfully.'}), 200
    
    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.status_code = 200
        return response
