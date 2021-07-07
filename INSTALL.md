# RCED

Installation du serveur de production RCED

## PostgreSQL

> **ATTENTION** L'installation se fait sur le serveur de base de données

### Pré-requis

> Ouvrir le flux vers https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

```shell
yum install epel-release
yum install freetds-devel
yum install gcc make wget
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install llvm5.0-devel
```

### Installation de PostgreSQL

> Ouvrir le flux vers https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

```shell
rpm -i https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
yum install postgresql11 postgresql11-server postgresql11-libs postgresql11-devel
```

### Changement du répertoire des données

> Modifier /rce/rec1/bdd/n1 en fonction du filesysteme

Création du répertoire et changement de propriétaire

```shell
mkdir -p /rce/rec1/bdd/n1/data
chown -R postgres:postgres /rce/rec1/bdd/n1
```

Modification du service, ouvrir ou créer le fichier postgresql-11.service

```shell
vim /etc/systemd/system/postgresql-11.service
```

Et y ajouter ces lignes

```shell
.include /usr/lib/systemd/system/postgresql-11.service

[Service]
# Location of database directory
Environment=PGDATA=/rce/rec1/bdd/n1/data/
Environment=PGLOG=/rce/rec1/bdd/n1/data/pgstartup.log
```

Initialiser la base de données

```shell
postgresql-11-setup initdb
```

Utilisez l'utilitaire semanage pour ajouter un mappage de contexte pour /rce/rec1/bdd/n1 et tout autre répertoire ou fichier qu'il contient

```shell
semanage fcontext -a -t postgresql_db_t "/rce/rec1/bdd/n1(/.*)?"
```

Utilisez maintenant l'utilitaire restorecon pour appliquer ce mappage de contexte au système en cours d'exécution

```shell
restorecon -R -v /rce/rec1/bdd/n1
```

### Donner accès à la base de données en local à l'utilisateur **rced**

Modifier le fichier pg_hba.conf

```shell
vim /rce/rec1/bdd/n1/data/pg_hba.conf
```

Y ajouter

```shell
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   rced            rced                                    trust
host    rced            rced            127.0.0.1/32            trust
```

### Démarrer le service PostgreSQL

```shell
systemctl start postgresql-11
# ou
service postgresql-11 start
```

### Création de l'utilisateur et de la base de données **rced**

> Ne pas oublier de remplacer "***motDePasse***" avec un mot de passe robuste

```sql
CREATE USER rced WITH PASSWORD 'motDePasse';
CREATE DATABASE rced WITH ENCODING = 'UTF8' OWNER = rced;
```

## TDS Foreign data wrapper

> **ATTENTION** L'installation se fait sur le serveur de base de données

### Installation du wrapper

> Ouvrir le flux vers https://tds-fdw.github.io/yum/tds_fdw.repo

```shell
yum install freetds-devel.x86_64
curl https://tds-fdw.github.io/yum/tds_fdw.repo -o /etc/yum.repos.d/tds_fdw.repo
yum install postgresql-11-tds_fdw
```

### Creation de l'extension, du serveur et de la table étrangère

```shell
sudo -u postgres psql
```

> Ne pas oublier de remplacer "***nomServeur***", "***utilisateur***" et "***motDePasse***" par les ceux de la base de données sref

```sql
\c rced

CREATE EXTENSION tds_fdw;

CREATE SERVER sref FOREIGN DATA WRAPPER tds_fdw OPTIONS (
	servername 'nomServeur.inserm.fr',
	port '1540',
	DATABASE 'sref',
	tds_version '7.4'
);

CREATE FOREIGN TABLE certificat_sref (
    numcertificat varchar(13) OPTIONS (column_name 'NumCertificat') NOT NULL,
    certidentifiantorganismedeclarant varchar(10) OPTIONS (column_name 'CertIdentifiantOrganismeDeclarant') NULL,
    certnommedecindeclarant varchar(50) OPTIONS (column_name 'CertNomMedecinDeclarant') NULL,
    certorigine smallint OPTIONS (column_name 'CertOrigine') NULL,
    certstatuttest smallint OPTIONS (column_name 'CertStatutTest') NULL,
    certvoletcomplementaire smallint OPTIONS (column_name 'CertVoletComplementaire') NULL,
    codedptlieugeodecesretenu varchar(3) OPTIONS (column_name 'CodeDptLieuGeoDecesRetenu') NULL,
    codedptlieugeodecessaisi varchar(3) OPTIONS (column_name 'CodeDptLieuGeoDecesSaisi') NULL,
    communelieugeodecesretenu varchar(50) OPTIONS (column_name 'CommuneLieuGeoDecesRetenu') NULL,
    communelieugeodecessaisi varchar(100) OPTIONS (column_name 'CommuneLieuGeoDecesSaisi') NULL,
    datedecesretenu timestamp(3) OPTIONS (column_name 'DateDecesRetenu') NULL,
    insee_codedptlieugeodeces varchar(3) OPTIONS (column_name 'Insee_CodeDptLieuGeoDeces') NULL,
    insee_communelieugeodeces varchar(50) OPTIONS (column_name 'Insee_CommuneLieuGeoDeces') NULL,
    insee_lieudeces smallint OPTIONS (column_name 'Insee_LieuDeces') NULL,
    lieudecesretenu smallint OPTIONS (column_name 'LieuDecesRetenu') NULL,
    lieudecessaisi smallint OPTIONS (column_name 'LieuDecesSaisi') NULL,
    sourcedatas smallint OPTIONS (column_name 'SourceDatas') NULL
) SERVER sref OPTIONS (
    schema_name 'dbo',
    table_name 'CertificatsSRef'
);

GRANT ALL PRIVILEGES ON certificat_sref TO rced;

CREATE USER MAPPING FOR rced SERVER sref OPTIONS (
    username 'utilisateur',
    PASSWORD 'motDePasse'
);

CREATE USER MAPPING FOR postgres SERVER sref OPTIONS (
    username 'utilisateur',
    PASSWORD 'motDePasse'
);

\q
```

### Verifier que le service PostgreSQL est démarré

```shell
systemctl status postgresql-11
# ou
service postgresql-11 status
```

## Python

> **ATTENTION** L'installation se fait sur le serveur applicatif

### Installation de Python
```shell
yum install python3
```

### Installation des paquets Python

> Ouvrir les flux vers :
> * https://pypi.python.org/simple/django/
> * https://pypi.python.org/simple/django-import-export/
> * https://pypi.python.org/simple/python-dotenv/gunicorn/
> * https://pypi.python.org/simple/psycopg2/
> * https://pypi.python.org/simple/python-dotenv/
> * https://pypi.python.org/simple/psycopg2-binary/
```shell
pip3 install django
pip3 install django-import-export
pip3 install gunicorn
pip3 install psycopg2
pip3 install psycopg2-binary
pip3 install python-dotenv
```

## Nodejs

> **ATTENTION** L'installation se fait sur le serveur applicatif

> Ouvrir le flux https://rpm.nodesource.com/setup_16.x

```shell
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
node -v
npm -v
```

## Yarn

> **ATTENTION** L'installation se fait sur le serveur applicatif

> Ouvrir le flux https://dl.yarnpkg.com/rpm/yarn.repo

```shell
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
yum install yarn
yarn -v
```

## Vue CLI

```shell
npm install -g @vue/cli
```

## Gunicorn

> **ATTENTION** L'installation se fait sur le serveur applicatif

### Création du service

Créer le fichier gunicorn.service

```shell
vim /etc/systemd/system/gunicorn.service
```

Y ajouter ces lignes

> Adapter le chemin "/rce/rec1/appli/n1"

```properties
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
Type=notify
User=root
Group=root
RuntimeDirectory=gunicorn
WorkingDirectory=/rce/rec1/appli/n1
ExecStart=/rce/rec1/appli/n1/backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/run/gunicorn.sock --chdir /rce/rec1/appli/n1/backend backend.wsgi
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### Création du socket

Créer le fichier gunicorn.socket

```shell
vim /etc/systemd/system/gunicorn.socket
```

Y ajouter ces lignes

```properties
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock
SocketUser=nginx

[Install]
WantedBy=sockets.target
```

### Activer et démarrer le le socket gunicorn

```shell
systemctl --now enable gunicorn.socket
# ou
service gunicorn.socket enable
service gunicorn.socket start
```

### Verifier que le socket Gunicorn est démarré

```shell
systemctl status gunicorn.socket
# ou
service gunicorn.socket status
```

## Nginx

> **ATTENTION** L'installation se fait sur le serveur applicatif

### Installer Nginx

```shell
yum install nginx
```

Modifier le fichier nginx.conf

```shell
vim /etc/nginx/nginx.conf
```

Avec ces lignes

> Adapter le chemin "/rce/rec1/appli/n1"

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }

    location /static/ {
        root /rce/rec1/appli/n1/backend/;
    }

    location ~ ^/(auth|admin|national|regional|etablissement)/.*$ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://unix:/run/gunicorn.sock;
    }

    location /index.html {
        root /rce/rec1/appli/n1/frontend/dist/;
    }

    location / {
        rewrite ^/(.*) index.html permanent;
    }
}
```

### Activer et démarrer le le socket gunicorn

```shell
systemctl status nginx
# ou
service nginx start
```

### Verifier que le socket Gunicorn est démarré

```shell
systemctl status nginx
# ou
service nginx status
```

## Interface

> **ATTENTION** L'installation se fait sur le serveur applicatif

Editer le fichier crontab

```shell
crontab -e
```

Y ajouter

> Adapter le chemin "/rce/rec1/appli/n1"

```shell
0 0 * * 0 cd /rce/rec1/appli/n1/interface; sh interface.sh > /dev/null 2>&1
```
