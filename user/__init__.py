from config import db
from models import User, user_schema, users_schema


def read_all():
    users = User.query.all()
    return users_schema.dump(users)


def read_one(idacesso):
    user = User.query.filter(User.idacesso == idacesso).one_or_none()

    if user is not None:
        return user_schema.dump(user)
    else:
        abort(404, f"Usuário não encontrado")
