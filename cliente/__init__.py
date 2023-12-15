from flask import abort, make_response, request

from config import db
from models import Cliente, cliente_schema, clientes_schema


def read_all():
    clientes = Cliente.query.all()
    return clientes_schema.dump(clientes)

def read_one(id):
    cliente = Cliente.query.filter(Cliente.id == id).one_or_none()

    if cliente is not None:
        return cliente_schema.dump(cliente)
    else:
        abort(404, f"Cliente não encontrado")