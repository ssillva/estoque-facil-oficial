# Projeto para disciplina de Sistemas Distribuídos

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
# Baixando o projeto

Vá para o diretório dos seus projetos e execute o comando no terminal linux:
```console
$ git clone https://github.com/ssillva/estoque-facil-oficial
```
# Crie um ambiente virtual para facilitar.
# ATENÇÃO: O SISTEMA SÓ FUNCIONARÁ COM O PYTHON VERSÃO 3. 

Python 2 não suporta a biblioteca connexion [swagger]

Execute no terminal a sequência de comandos a seguir:
```console
$ cd estoque-facil=oficial
```
```console
$ python3 -m venv venv

$ source venv/bin/activate
```
Para confirmar que seu interpretador será Python versão 3, digite:
```console
$ alias python="/usr/bin/python3"
```
Então digite:

```console
$ pip install --upgrade pip

$ pip install -r requeriments.txt
```

Para executar o programa digite:

```console
$ python3 app.py
```

# Referências
Real Python [Python REST APIs With Flask, Connexion, and SQLAlchemy](https://realpython.com/flask-connexion-rest-api-part-2)

# Autor
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/11522653?v=4" width=115><br><sub>Sandro Oliveira da Silva</sub>](https://github.com/ssillva) |
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|