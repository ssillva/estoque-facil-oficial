from flask import render_template
# Remove: import connexion
import config
from produtos.models import Sis_produto

app = config.connex_app
app.add_api(config.basedir / "estoquefacil.yml")

@app.route("/")
def home():
    produtos = Sis_produto.query.all()
    return render_template("home.html", produtos=produtos)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
