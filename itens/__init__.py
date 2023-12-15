from flask import abort, make_response, request

from config import db
from models import Item, itens_schema, item_schema


def read_all():
    itens = Item.query.all()
    return itens_schema.dump(itens)


def create():
    item_req_json = request.get_json()
    existing_item = Item.query.filter(Item.mac == item_req_json["mac"]).one_or_none()
    if existing_item is None:
        new_item = item_schema.load(item_req_json, session=db.session)
        db.session.add(new_item)
        db.session.commit()
        return item_schema.dump(new_item), 201
    else:
        abort(406, f"Este MAC já foi cadastro no sistema!")

def read_one(patrimonio):
    item = Item.query.filter(Item.patrimonio == patrimonio).one_or_none()

    if item is not None:
        return item_schema.dump(item)
    else:
        abort(404, f"Item não encontrado")

def get_itens_by_mac(mac):
    existing_mac = Item.query.filter(Item.mac == mac).all()
    if existing_mac:
        return itens_schema.dump(existing_mac)
    else:
        abort(404, f"MAC não encontrado")
    

def update(patrimonio):
    item_req_json =  request.get_json()
    existing_item = Item.query.filter(Item.patrimonio == patrimonio).one_or_none()

    if existing_item:
        update_item = item_schema.load(item_req_json, session=db.session)
        existing_item.mac = update_item.mac
        #existing_item.fonte = update_item.fonte
        #existing_item.volts = update_item.volts
        #existing_item.ampere = update_item.ampere
        existing_item.obs = update_item.obs
        existing_item.valor_compra = update_item.valor_compra
        existing_item.produto_id = update_item.produto_id
        existing_item.fornecedor_id = update_item.fornecedor_id
        db.session.merge(existing_item)
        db.session.commit()
        return item_schema.dump(existing_item), 201
    else:
        abort(404, f"Item com informações não encontrado")


def delete(patrimonio):
    existing_item = Item.query.filter(Item.patrimonio == patrimonio).one_or_none()

    if existing_item:
        db.session.delete(existing_item)
        db.session.commit()
        return make_response(f"Item deletado com sucesso", 200)
    else:
        abort(404, f"Item não encontrado")