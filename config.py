from flask import Flask
import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

basedir = pathlib.Path(__file__).parent.resolve()
connex_app = connexion.App(__name__, specification_dir=basedir)

app = connex_app.app
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:vertrigo@172.31.255.2/mkradius'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:vertrigo@192.168.1.5/mkradius'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


