from orfeus_config import db, meta
from sqlalchemy import ForeignKey, Table, Column, Integer, String, VARBINARY

def init_app(app):
    db.init_app(app)

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
