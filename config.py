import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

basedir = pathlib.Path(__file__).parent.resolve()
connex_app = connexion.App(__name__, specification_dir=basedir)

app = connex_app.app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mkradius.db'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:vertrigo@10.1.10.213/mkradius'

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)