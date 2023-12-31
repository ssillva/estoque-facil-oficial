from flask import render_template
# Remove: import connexion
from config import db, app, ma, connex_app, basedir
from models import Item
from importlib import reload
import sys

app = connex_app
app.add_api(basedir / "estoquefacil.yml")

@app.route("/")
def home():
    return render_template("produtos.html")

@app.route("/itens")
def itens():
    return render_template("itens.html")

@app.route("/movimento")
def movimento():
    return render_template("movimento.html")

@app.app.before_request
def create_tables():
    db.create_all()

if __name__ == "__main__":
    #with app.app_context():
     #   db.create_all()
    #db.init_app(app.app)
    ma.init_app(app)
    app.run(host="0.0.0.0", port=8000)
    reload(sys)