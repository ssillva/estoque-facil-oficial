from config import db, ma
from datetime import date

# Modelo dos Itens
class Item(db.Model):
    __tablename__ = 'sis_item'
    id_patrimonio = db.Column(db.Integer, primary_key=True)
    data_cadastro = db.Column(db.Date, nullable=False, default=date.today)
    mac = db.Column(db.String(12), unique=True)
    fonte = db.Column(db.String(80), nullable=False)
    volts = db.Column(db.Integer, primary_key=False)
    ampere = db.Column(db.Float(2), primary_key=False)
    obs = db.Column(db.String(255), nullable=False)
    produto_id = db.Column(db.Integer, primary_key=False)
    #produto_id = db.Column(db.Integer, db.ForeignKey('sis_produto.id'))
    # cse_entradahist = db.relationship('Cse_entrada', secondary=cse_entradahist, lazy='subquery',
    #                                  backref=db.backref('sis_item', lazy=True))

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True
        sqla_session = db.session

item_schema = ItemSchema()
itens_schema = ItemSchema(many=True)

class Produto(db.Model):
    __tablename__ = 'sis_produto'
    id = db.Column(db.Integer, primary_key=True)
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
