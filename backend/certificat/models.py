from django.db import models


class CertificatElectronique(models.Model):
    id = models.CharField(primary_key=True, max_length=13)
    medecin_declarant = models.CharField(max_length=50, blank=True, null=True)
    organisme_declarant = models.CharField(max_length=10, blank=True, null=True)
    volet_complementaire = models.SmallIntegerField(blank=True, null=True)
    hors_etablissement = models.SmallIntegerField(blank=True, null=True)
    lieu_deces = models.SmallIntegerField(blank=True, null=True)
    departement = models.ForeignKey('referentiel.Departement', models.DO_NOTHING, blank=True, null=True, db_column='departement')
    commune = models.CharField(max_length=55, blank=True, null=True)
    date_deces = models.DateTimeField(blank=True, null=True)
    annee_deces = models.SmallIntegerField(blank=True, null=True)
    trimestre_deces = models.SmallIntegerField(blank=True, null=True)
    semaine_deces = models.SmallIntegerField(blank=True, null=True)
    semaine_deces_annee = models.SmallIntegerField(blank=True, null=True)
    source = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        db_table = 'certificat_electronique'


class CertificatPapier(models.Model):
    departement = models.ForeignKey('referentiel.Departement', models.DO_NOTHING, blank=True, null=True, db_column='departement')
    commune = models.CharField(max_length=55, blank=True, null=True)
    annee_deces = models.SmallIntegerField(blank=True, null=True)
    nombre = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'certificat_papier'


class CertificatInsee(models.Model):
    departement = models.ForeignKey('referentiel.Departement', models.DO_NOTHING, blank=True, null=True, db_column='departement')
    date_deces = models.DateTimeField(blank=True, null=True)
    annee_deces = models.SmallIntegerField(blank=True, null=True)
    semaine_deces = models.SmallIntegerField(blank=True, null=True)
    semaine_deces_annee = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        db_table = 'certificat_insee'
        verbose_name = 'certificat INSEE'
        verbose_name_plural = 'certificats INSEE'
