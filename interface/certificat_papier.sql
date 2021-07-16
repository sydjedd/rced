TRUNCATE TABLE certificat_papier;
INSERT INTO
    certificat_papier(lieu_deces, departement, commune, annee_deces, nombre)
SELECT
    COALESCE(lieudecesretenu, lieudecessaisi, insee_lieudeces), -- lieu_deces
    CASE
        WHEN codedptlieugeodecesretenu IS NOT NULL AND codedptlieugeodecesretenu IN (SELECT id FROM referentiel_departement) THEN codedptlieugeodecesretenu
        WHEN codedptlieugeodecessaisi IS NOT NULL AND codedptlieugeodecessaisi IN (SELECT id FROM referentiel_departement) THEN codedptlieugeodecessaisi
        WHEN insee_codedptlieugeodeces IS NOT NULL AND insee_codedptlieugeodeces IN (SELECT id FROM referentiel_departement) THEN insee_codedptlieugeodeces
        ELSE NULL
    END, -- departement
    UPPER(REPLACE(COALESCE(communelieugeodecesretenu, communelieugeodecessaisi, insee_communelieugeodeces), '-', '')), -- commune
    DATE_PART('year', datedecesretenu), -- annee_deces
    COUNT(numcertificat) -- nombre
FROM
    certificat_sref
WHERE
    DATE_PART('year', datedecesretenu) > 2006
    AND certorigine = '2'
    AND numcertificat LIKE 'PR%'
GROUP BY
    1,
    2,
    3,
    4
;
