from config import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, user_schema, users_schema

@login_manager.user_loader
def get_user(user_id):
    return User.query.filter_by(id=user_id).first()


def verify_password(user):
    password = User.query.filter_by(User.sha == pwd)
    return check_password_hash(self.password, pwd)

def read_all():
    itens = Item.query.all()
    return itens_schema.dump(itens)


def create(item):
    mac = item.get("mac")
    existing_item = Item.query.filter(Item.mac == mac).one_or_none()

    if existing_item is None:
        new_item = item_schema.load(item, session=db.session)
        db.session.add(new_item)
        db.session.commit()
        return item_schema.dump(new_item), 201
    else:
        abort(406, f"O item com mac = {mac} possui cadastro no sistema!")


def read_one(id_patrimonio):
    item = Item.query.filter(Item.id_patrimonio == id_patrimonio).one_or_none()

    if item is not None:
        return item_schema.dump(item)
    else:
        abort(404, f"Produto não encontrado")


def update(id_patrimonio, item):
    existing_item = Item.query.filter(Item.id_patrimonio == id_patrimonio).one_or_none()

    if existing_item:
        update_item = item_schema.load(item, session=db.session)
        existing_item.mac = update_item.mac
        existing_item.fonte = update_item.fonte
        existing_item.volts = update_item.volts
        existing_item.ampere = update_item.ampere
        existing_item.obs = update_item.obs
        existing_item.produto_id = update_item.produto_id
        db.session.merge(existing_item)
        db.session.commit()
        return item_schema.dump(existing_item), 201
    else:
        abort(404, f"Item com informações não encontrado")


def delete(id_patrimonio):
    existing_item = Item.query.filter(Item.id_patrimonio == id_patrimonio).one_or_none()

    if existing_item:
        db.session.delete(existing_item)
        db.session.commit()
        return make_response(f"Item deletado com sucesso", 200)
    else:
        abort(404, f"Item não encontrado")