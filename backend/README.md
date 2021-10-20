# RCED backend

Rapports sur la certification électronique des décès

## Pré-requis

* Python
* PIP

## Installation

### Créer le fichier dotenv

> Ne pas oublier de remplacer "***rcedUtilisateur***", "***rcedBaseDeDonnees***" et "***motDePasse***" par les ceux de la base de données rced

```dotenv
ENV=development
ALLOWED_HOSTS=localhost,127.0.0.1
SECRET_KEY=r!t66or+g%y33@g8o9f2c1efpbu1#r+v796u97s8gyjql4#fgx

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=rcedBaseDeDonnees
DATABASE_USER=rcedUtilisateur
DATABASE_PASSWORD=rcedMotDePasse

EMAIL_CEPIDC=cepidc@inserm.fr
EMAIL_TMA=tma@inserm.fr
EMAIL_CDS=cds@inserm.fr

EMAIL_HOST=smtp.inserm.fr
EMAIL_PORT=587
EMAIL_HOST_USER=rced.dsi@inserm.fr
EMAIL_HOST_PASSWORD=rcedMotDePasse
```

### Installer l'environnement virtuel

```shell
python3 -m venv venv
```

### Activer l'environnement virtuel

```shell
. venv/bin/activate
```

### Mise à jour de pip

```shell
pip3 install --upgrade pip
```

### Installer les dépendances

```shell
pip3 install -r requirements.txt
```

### Création des tables

```shell
python3 manage.py makemigrations certificat
python3 manage.py makemigrations referentiel
python3 manage.py migrate
```

### Importer les référentiels

```shell
python3 manage.py loaddata referentiel
```

## Lancer l'application en développement

```shell
python3 manage.py runserver 0.0.0.0:8000
```

## Lancer l'application en production

### Pré-requis

<!--
* Préparer le serveur de production [ici](../INSTALL.md)
* Compiler et minifier le frontend [ici](../frontend/README.md#lancer-l'application-en-production)
-->
* Préparer le serveur de production voir le fichier **Installation.pdf**
* Frontend voir le fichier **Frontend.pdf**, rubrique Lancer l'application en production

### Creation des fichiers static

> Préalablement activer l'environnement virtuel

```shell
python3 manage.py collectstatic
```

## Extra

### Création d'un super utilisateur

```shell
python3 manage.py createsuperuser --username=toto --email=toto@example.com
```

### Désactiver l'environnement virtuel

```shell
deactivate
```

### Creation d'une clé secrete

```shell
python3
from django.utils.crypto import get_random_string
get_random_string(80)
```

### Linter et fixer les fichiers

```shell

```