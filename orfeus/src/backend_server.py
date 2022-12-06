from flask import Flask
from flask import make_response
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy import insert
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, MetaData, VARBINARY
import bcrypt
import json

meta = MetaData()
user = Table(
   'user', meta, 
   Column('id', Integer, primary_key = True), 
   Column('username', String), 
   Column('password', VARBINARY), 
   Column('email', String), 
   Column('role', Integer), 
   Column('privacy_level', Integer), 
   Column('profile_picture_path', String), 
   Column('account_creation_date', String), 
)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:coolcool@127.0.0.1:3306/mydb'
engine = create_engine("mysql+pymysql://root:coolcool@127.0.0.1:3306/mydb", echo=True)
db = SQLAlchemy(app)
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    # s = json.dumps(data, indent=4, sort_keys=True)
    bytesPassword = bcrypt.hashpw(data[1]["value"].encode('utf8'), bcrypt.gensalt())
    stmt = (
        db.insert(user).values(username=data[0]["value"], password=bytesPassword,email=data[2]["value"],role=1,privacy_level=1,profile_picture_path="fakepath",account_creation_date=datetime.now())
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
    response = app.make_response({"id":dictionaryForQueryResult["id"]})
    return response

@app.route('/login', methods=['POST'])
def login():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    print(data)
    s = select(user.c.password, user.c.id).where(user.c.username == data[0]["value"])
    conn = engine.connect()
    result = conn.execute(s)
    dictionaryForQueryResult = {}
    for row in result:
        dictionaryForQueryResult = row._mapping
    if bcrypt.checkpw(data[1]["value"].encode('utf8'), dictionaryForQueryResult["password"]):
        print("authenticated")
        response = app.make_response({"id":dictionaryForQueryResult["id"]})
        print(response.data)
        return response
    else:
        return make_response("Bad credentials", 403) 


@app.route('/users', methods=['GET'])
def admin():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    users = select(users)
    print(users.compile().params)
    conn = engine.connect()
    result = conn.execute(users)
    return "flask server"





if __name__ == "__main__":
    app.run(port=5000, debug=True)