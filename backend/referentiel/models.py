from django.db import models


class Region(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    libelle = models.CharField(max_length=30)

    class Meta:
        db_table = 'referentiel_region'
        ordering = ['id']
        verbose_name = 'région'
        verbose_name_plural = 'régions'

    def __str__(self):
        return self.id + ' ' + self.libelle


class Departement(models.Model):
    id = models.CharField(primary_key=True, max_length=3)
    libelle = models.CharField(max_length=30)
    region = models.ForeignKey('Region', models.DO_NOTHING, blank=True, null=True,)

    class Meta:
        db_table = 'referentiel_departement'
        ordering = ['id']
        verbose_name = 'département'
        verbose_name_plural = 'départements'

    def __str__(self):
        return self.id + ' ' + self.libelle


class LieuDeces(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    libelle = models.CharField(max_length=30)

    class Meta:
        db_table = 'referentiel_lieu_deces'
        ordering = ['id']
        verbose_name = 'lieu de décès'
        verbose_name_plural = 'lieux de décès'

    def __str__(self):
        return self.id + ' ' + self.libelle
