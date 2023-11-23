from config import db, ma
from datetime import date
from flask_login import UserMixin
from werkzeug.security import generate_password_hash

# Modelo dos Itens
class Item(db.Model):
    __tablename__ = 'sis_item'
    id_patrimonio = db.Column(db.Integer, autoincrement=True, primary_key=True)
    data_cadastro = db.Column(db.Date, nullable=False, default=date.today)
    mac = db.Column(db.String(12), unique=True)
    fonte = db.Column(db.String(80), nullable=False)
    volts = db.Column(db.Integer, primary_key=False)
    ampere = db.Column(db.Float(2), primary_key=False)
    obs = db.Column(db.String(255), nullable=False)
    produto_id = db.Column(db.Integer, primary_key=False)
    #produto_id = db.Column(db.Integer, db.ForeignKey('sis_produto.id'))
    # cse_entradahist = db.relationship('Cse_entrada', secondary=cse_entradahist, lazy='subquery',
    #                                 backref=db.backref('sis_item', lazy=True))

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True
        sqla_session = db.session

item_schema = ItemSchema()
itens_schema = ItemSchema(many=True)

class Produto(db.Model):
    __tablename__ = 'sis_produto'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    grupo = db.Column(db.String(128), nullable=False)
    #fk_id_item = db.relationship('Item', backref='sis_produto', lazy=True)

class ProdutoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Produto
        load_instance = True
        sqla_session = db.session

produto_schema = ProdutoSchema()
produtos_schema = ProdutoSchema(many=True)

class Movimento(db.Model):
    __tablename__ = 'ef_movimento'

    id_movimento = db.Column(db.Integer, autoincrement=True, primary_key=True)
    data_movimento = db.Column(db.Date, nullable=False, default=date.today)
    documento = db.Column(db.String(45))
    qtd = db.Column(db.Integer)
    motivo = db.Column(db.String(100))
    origem = db.Column(db.String(80))
    destino = db.Column(db.String(80))
    tipo = db.Column(db.String(2), nullable=False)
    obs_movimento = db.Column(db.String(455))
    item_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    #user_id = db.Column(db.Integer, db.ForeignKey('sis_acesso.idacesso'))

class MovimentoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movimento
        load_instance = True
        sqla_session = db.session

movimento_schema = MovimentoSchema()
movimentos_schema = MovimentoSchema(many=True)

class User(db.Model, UserMixin):
    __tablename__ = 'sis_acesso'
    idacesso = db.Column(db.Integer, autoincrement=True, primary_key=True)
    uuid_acesso = db.Column(db.String(48), unique=True)
    login = db.Column(db.String(255), nullable=False)
    sha = db.Column(db.String(255), nullable=False) #password
    email = db.Column(db.String(255), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session
    
user_schema = UserSchema()
users_schema = UserSchema(many=True)