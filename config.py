import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

basedir = pathlib.Path(__file__).parent.resolve()
connex_app = connexion.App(__name__, specification_dir=basedir)

app = connex_app.app
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mkradius.db' #para banco local para testar a aplicação
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:vertrigo@172.31.255.2/mkradius' #caso possua o MK-Auth instalado com configurações padrões
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:vertrigo@10.1.29.67/mkradius' #caso tenha colocado o sistema como rede DHCP da sua rede

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)