from flask import abort, make_response

from config import db
from models import Movimento, movimentos_schema, movimento_schema


def read_all():
    movimentos = Movimento.query.all()
    return movimentos_schema.dump(movimentos)


def create(movimento):
    id_movimento = movimento.get("id_movimento")
    existing_movimento = Movimento.query.filter(Movimento.id_movimento == id_movimento).one_or_none()

    if existing_movimento is None:
        new_movimento = movimento_schema.load(movimento, session=db.session)
        db.session.add(new_movimento)
        db.session.commit()
        return movimento_schema.dump(new_movimento), 201
    else:
        abort(406, f"O movimento {id_movimento} possui cadastro no sistema!")


def read_one(id_movimento):
    movimento = Movimento.query.filter(Movimento.id_movimento == id_movimento).one_or_none()

    if movimento is not None:
        return movimento_schema.dump(movimento)
    else:
        abort(404, f"Movimento não encontrado")


def update(id_movimento, movimento):
    existing_item = Movimento.query.filter(Movimento.id_movimento == id_movimento).one_or_none()

    if existing_item:
        update_item = movimento_schema.load(movimento, session=db.session)
        existing_item.documento = update_item.documento
        existing_item.qtd = update_item.qtd
        existing_item.motivo = update_item.motivo
        existing_item.origem = update_item.origem
        existing_item.destino = update_item.destino
        existing_item.tipo = update_item.tipo
        existing_item.obs_movimento = update_item.obs_movimento
        existing_item.produto_id = update_item.produto_id
        db.session.merge(existing_item)
        db.session.commit()
        return movimento_schema.dump(existing_item), 201
    else:
        abort(404, f"Movimento com informações não encontrado")


def delete(id_movimento):
    existing_movimento = Movimento.query.filter(Movimento.id_movimento == id_movimento).one_or_none()

    if existing_movimento:
        db.session.delete(existing_movimento)
        db.session.commit()
        return make_response(f"Movimento Excluído com sucesso", 200)
    else:
        abort(404, f"Movimento não encontrado")