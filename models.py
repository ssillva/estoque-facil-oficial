from config import db, ma
from datetime import date, datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash
from sqlalchemy import Enum


class User(db.Model):
    __tablename__ = 'sis_acesso'
    idacesso = db.Column(db.Integer, autoincrement=True, primary_key=True)
    uuid_acesso = db.Column(db.String(48), unique=True)
    login = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    #movimento_id = db.relationship('Movimento', backref='sis_acesso', lazy=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session
    
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class Cliente(db.Model):
    __tablename__ = 'sis_cliente'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    #item_id = db.relationship('Item', backref='sis_cliente', lazy=True)

class ClienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cliente
        load_instance = True
        sqla_session = db.session
    
cliente_schema = ClienteSchema()
clientes_schema = ClienteSchema(many=True)

class Fornecedor(db.Model):
    __tablename__ = 'sis_fornecedor'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    razaosoc = db.Column(db.String(255), nullable=False)
    #item_id = db.relationship('Item', backref='sis_fornecedor', lazy=True)

class FornecedorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Fornecedor
        load_instance = True
        sqla_session = db.session
    
fornecedor_schema = FornecedorSchema()
fornecedores_schema = FornecedorSchema(many=True)

class Movimento(db.Model):
    __tablename__ = 'mgt_movimentacoes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    data_movimento = db.Column(db.Date, nullable=False, default=date.today)
    documento = db.Column(db.String(45))
    motivo = db.Column(db.String(100))
    tipo = db.Column(db.String(45), nullable=False)
    obs = db.Column(db.String(255))
    contraparte = db.Column(db.String(50), nullable=False) # cliente ou fornecedor
    contraparte_id = db.Column(db.Integer, nullable=False) # id do cliente ou fornecedor
    item_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    local_id = db.Column(db.Integer, nullable=False)
    #user_id = db.Column(db.Integer, db.ForeignKey('sis_acesso.idacesso'))
    #item_produto_id = db.Column(db.Integer, db.ForeignKey('mgt_itens_produtos.patrimonio'))
    #local_id = db.Column(db.Integer, db.ForeignKey('mgt_locais.id'))

class MovimentoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movimento
        load_instance = True
        sqla_session = db.session

movimento_schema = MovimentoSchema()
movimentos_schema = MovimentoSchema(many=True)

# Modelo dos Itens
class Item(db.Model):
    __tablename__ = 'mgt_itens_produtos'
    patrimonio = db.Column(db.Integer, autoincrement=True, primary_key=True)
    data_cadastro = db.Column(db.Date, nullable=False, default=date.today)
    mac = db.Column(db.String(15), unique=True)
    #fonte = db.Column(db.String(80), nullable=False)
    #volts = db.Column(db.Integer, primary_key=False)
    #ampere = db.Column(db.Float(2), primary_key=False)
    obs = db.Column(db.String(255), nullable=False)
    valor_compra = db.Column(db.Numeric(12, 2), nullable=False)
    produto_id = db.Column(db.Integer, primary_key=False)
    #produto_id = db.Column(db.Integer, db.ForeignKey('sis_produto.id'))
    fornecedor_id = db.Column(db.Integer, primary_key=False)
    #fornecedor_id = db.Column(db.Integer, db.ForeignKey('sis_fornecedor.id'))
    #cliente_id = db.Column(db.Integer, db.ForeignKey('sis_cliente.id'))
    #movimento_id = db.relationship('Movimento', backref='mgt_itens_produtos', lazy=True)
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
    uuid_produto = db.Column(db.String(48), nullable=False)
    idforn = db.Column(db.Integer)
    precoatual = db.Column(db.Numeric(12, 2), nullable=False)
    precovelho = db.Column(db.Numeric(12, 2), nullable=False)
    datacad = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    ultcompra = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    ultalteracao = db.Column(db.Numeric(10, 0), nullable=False)
    peso = db.Column(db.Numeric(12, 2), nullable=False)
    ativo = db.Column(Enum('sim', 'não'), nullable=False)
    codbarras = db.Column(db.String(255), nullable=False)
    med = db.Column(db.String(3), nullable=False)
    aplicacao = db.Column(db.Text)
    codigo = db.Column(db.String(50), nullable=False)
    #item_id = db.relationship('Item', backref='sis_produto', lazy=True)

class ProdutoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Produto
        load_instance = True
        sqla_session = db.session

produto_schema = ProdutoSchema()
produtos_schema = ProdutoSchema(many=True)


class Local(db.Model):
    __tablename__ = 'mgt_locais'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(200))
    lat = db.Column(db.Float(11, 7))
    long = db.Column(db.Float(11, 7))
    movimento_id = db.Column(db.Integer)
    #movimento_id = db.relationship('Movimento', backref='mgt_locais', lazy=True)

class LocalSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Local
        load_instance = True
        sqla_session = db.session

local_schema = LocalSchema()
locais_schema = LocalSchema(many=True)

