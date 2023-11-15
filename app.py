from flask import render_template
# Remove: import connexion
import config
from models import Item

app = config.connex_app
app.add_api(config.basedir / "estoquefacil.yml")

@app.route("/")
def home():
    itens = Item.query.all()
    return render_template("home.html", itens=itens)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
