# Projeto para disciplina de Sistemas Distribuídos / Estoque Fácil

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

Este é um projeto desenvolvido para atender aos requisitos da disciplina de Sistemas Distribuídos, oferecendo um sistema de controle e gestão de Produtos e Itens, em cooperação com o Sistema MK-Auth para provedores de Internet.

## Principais Tecnologias
- Python
- Flask (Framework)
- MySQL
- SQLAlchemy (ORM)
- Frontend: jQuery, HTML

## Documentação
### Diagrama de Componentes
![Diagrama de Componentes](https://github.com/ssillva/estoque-facil-oficial/blob/master/docs/DIagrama%20Componente%20EF.jpg)

### Modelo Relacional
![Modelo Relacional](https://github.com/ssillva/estoque-facil-oficial/blob/master/docs/estoque-facil.png)

### Documento de Visão
* [Documento de Visão](https://github.com/ssillva/estoque-facil-oficial/blob/master/docs/Documento%20de%20Vis%C3%A3o.pdf)


## Instalação no Sistema Operacional Windows
1 - Faça a combinação de teclas Windows + r e digite cmd no campo abrir do executar
2 - Verifique se existe o Python instalado
```console
seu diretório C:\> python --version
```
Caso não tenha instalado o Python versão 3, clique abaixo para seguir tutorial de instalação:


Instalando Python 3 [Instalando o Python 3 no Windows](https://python.org.br/instalacao-windows/)

Certifique-se também que tenha instalado o git

Instalando Git [Download for Windows](https://git-scm.com/download/win)

### Baixando o projeto

Crie um diretório, como exemplo criarei no diretório raiz C:/ o diretório app
```console
C:\> mkdir app
C:\> cd app
```

No diretório app execute o comando:
```console
C:\app> git clone https://github.com/ssillva/estoque-facil-oficial
C:\app> cd estoque-facil-oficial
```
Criando um ambiente virtual executando os comandos abaixo:
```console
C:\app> python -m venv venv
C:\app> .\venv\Scripts\activate
```

Em seguida instale as dependências para executar a aplicação:

```console
(venv) C:\app> python.exe -m pip install --upgrade pip
(venv) C:\app> pip install - r requeriments.txt
```

Verifique no arquivo config.py qual conexão de Banco de dados você utilizará:

Finalmente execute a aplicação
```console
(venv) C:\app> python app.py
```



## Instalação no Sistema Operacional Linux

### Baixando o projeto

Vá para o diretório dos seus projetos e execute o comando no terminal linux:
```console
$ git clone https://github.com/ssillva/estoque-facil-oficial
```
### Crie um ambiente virtual para facilitar.
### ATENÇÃO: O SISTEMA SÓ FUNCIONARÁ COM O PYTHON VERSÃO 3. 

Python 2 não suporta a biblioteca connexion [swagger]

Execute no terminal a sequência de comandos a seguir:
```console
$ cd estoque-facil=oficial
```
Caso não tenha instalado em sua máquina o Virtual Environments para ambientes virtuais de desenvolvimento

```console
$ apt-get install python3-venv
```

```console
$ python3 -m venv venv
```
```console
$ source venv/bin/activate
```
Para confirmar que seu interpretador será Python versão 3, digite:
```console
$ alias python="/usr/bin/python3"
```
Então digite:

```console
$ pip install --upgrade pip
```
```console
$ pip install -r requeriments.txt
```

Para executar o programa digite:

```console
$ python3 app.py
```

# Referências
Real Python [Python REST APIs With Flask, Connexion, and SQLAlchemy](https://realpython.com/flask-connexion-rest-api-part-2)

Medium - Autor: Suman Das [Python REST APIs With Flask, Connexion, and SQLAlchemy](https://dassum.medium.com/python-rest-apis-with-flask-connexion-and-sqlalchemy-3c8c3292d9ce)
# Autor
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/11522653?v=4" width=115><br><sub>Sandro Oliveira da Silva</sub>](https://github.com/ssillva) |
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
