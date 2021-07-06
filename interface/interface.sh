#!/bin/bash

for table in certificat_electronique certificat_papier
do
  exit_status=0
  fichier="./${table}.sql"
  table=$(echo $table | tr '[a-z]' '[A-Z]')

  echo "[$(date +"%Y-%m-%d %H:%M:%S")] [${table}] Import de la table" >> ./interface.log

  sudo -u postgres psql -d rced -f $fichier -v "ON_ERROR_STOP=1" >> ./interface.log 2>&1;

  exit_status=$?

  if [ "$exit_status" != "0" ]
  then
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] [${table}] Erreur lors de l'import" >> ./interface.log
  else
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] [${table}] Succès de l'import" >> ./interface.log
  fi
done

exit $exit_status
