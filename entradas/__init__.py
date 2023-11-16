from flask import abort, make_response

from config import db
from models import Entrada, entradas_schema, entrada_schema


def read_all():
    entradas = Entrada.query.all()
    return entradas_schema.dump(entradas)


def create(entrada):
    documento = entrada.get("documento")
    existing_entrada = Entrada.query.filter(Entrada.documento == documento).one_or_none()

    if existing_entrada is None:
        new_entrada = entrada_schema.load(entrada, session=db.session)
        db.session.add(new_entrada)
        db.session.commit()
        return entrada_schema.dump(new_entrada), 201
    else:
        abort(406, f"O documento {documento} possui cadastro no sistema!")


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


def delete(id):
    existing_item = Item.query.filter(Item.id == id).one_or_none()

    if existing_item:
        db.session.delete(existing_item)
        db.session.commit()
        return make_response(f"Item deletado com sucesso", 200)
    else:
        abort(404, f"Item não encontrado")