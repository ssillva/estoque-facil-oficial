from config import db, ma

class Sis_produto(db.Model):
    __tablename__ = 'sis_produto'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    grupo = db.Column(db.String(128), nullable=False)
    #fk_id_item = db.relationship('Sis_item', backref='sis_produto', lazy=True)

class ProdutoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Sis_produto
        load_instance = True
        sqla_session = db.session

produto_schema = ProdutoSchema()
produtos_schema = ProdutoSchema(many=True)