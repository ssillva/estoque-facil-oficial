from flask import abort, make_response, request

from config import db
from models import Fornecedor, fornecedor_schema, fornecedores_schema


def read_all():
    fornecedores = Fornecedor.query.all()
    return fornecedores_schema.dump(fornecedores)

def read_one(id):
    fornecedor = Fornecedor.query.filter(Fornecedor.id == id).one_or_none()

    if fornecedor is not None:
        return fornecedor_schema.dump(fornecedor)
    else:
        abort(404, f"Fornecedor não encontrado")