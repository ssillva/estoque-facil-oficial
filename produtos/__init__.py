from flask import abort, make_response

from config import db
from models import Produto, produtos_schema, produto_schema


def read_all():
    produtos = Produto.query.all()
    return produtos_schema.dump(produtos)


def create(produto):
    nome = produto.get("nome")
    existing_produto = Produto.query.filter(Produto.nome == nome).one_or_none()

    if existing_produto is None:
        new_produto = produto_schema.load(produto, session=db.session)
        db.session.add(new_produto)
        db.session.commit()
        return produto_schema.dump(new_produto), 201
    else:
        abort(406, f"O produto {nome} possui cadastro no sistema!")


def read_one(id):
    produto = Produto.query.filter(Produto.id == id).one_or_none()

    if produto is not None:
        return produto_schema.dump(produto)
    else:
        abort(404, f"Produto não encontrado")


def update(id, produto):
    existing_produto = Produto.query.filter(Produto.id == id).one_or_none()

    if existing_produto:
        update_produto = produto_schema.load(produto, session=db.session)
        existing_produto.nome = update_produto.nome
        existing_produto.descricao = update_produto.descricao
        existing_produto.grupo = update_produto.grupo
        db.session.merge(existing_produto)
        db.session.commit()
        return produto_schema.dump(existing_produto), 201
    else:
        abort(404, f"Produto com informações não encontrado {id}")


def delete(id):
    existing_produto = Produto.query.filter(Produto.id == id).one_or_none()

    if existing_produto:
        db.session.delete(existing_produto)
        db.session.commit()
        return make_response(f"{id} Apagado com Sucesso", 200)
    else:
        abort(404, f"Produto não encontrado {id} ")
