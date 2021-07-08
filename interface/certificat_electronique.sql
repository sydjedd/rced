TRUNCATE TABLE certificat_electronique;
INSERT INTO
    certificat_electronique(id, medecin_declarant, organisme_declarant, volet_complementaire, hors_etablissement, lieu_deces, departement, commune, date_deces, annee_deces, trimestre_deces, semaine_deces, semaine_deces_annee, source)
SELECT
    numcertificat, -- id
    certnommedecindeclarant, -- medecin_declarant
    certidentifiantorganismedeclarant, -- organisme_declarant
    certvoletcomplementaire, -- volet_complementaire
    CASE WHEN certidentifiantorganismedeclarant = '1000000002' THEN 1 ELSE 0 END, -- hors_etablissement
    COALESCE(lieudecesretenu, lieudecessaisi, insee_lieudeces), -- lieu_deces
    CASE
        WHEN certidentifiantorganismedeclarant = '1000000002' THEN
            CASE
                WHEN COALESCE(CodeDptLieuGeoDecesRetenu, CodeDptLieuGeoDecesSaisi) != '978' THEN COALESCE(CodeDptLieuGeoDecesRetenu, CodeDptLieuGeoDecesSaisi)
                ELSE NULL
            END
        ELSE
            CASE
                WHEN SUBSTRING(certidentifiantorganismedeclarant, 1, 2) = '97'   THEN  CONCAT('97',  SUBSTRING(certidentifiantorganismedeclarant, 4, 1))
                WHEN SUBSTRING(certidentifiantorganismedeclarant, 1, 4) = '9805' THEN '976'
                ELSE SUBSTRING(certidentifiantorganismedeclarant, 1, 2)
            END
    END, -- departement
    UPPER(REPLACE(COALESCE(communelieugeodecesretenu, communelieugeodecessaisi, insee_communelieugeodeces), '-', '')), -- commune
    datedecesretenu, -- date_deces
    DATE_PART('year', datedecesretenu), -- annee_deces
    DATE_PART('quarter', datedecesretenu), -- trimestre_deces
    TO_CHAR(datedecesretenu, 'IW')::INTEGER, -- semaine_deces
    TO_CHAR(datedecesretenu, 'IYYY')::INTEGER, -- semaine_deces_annee
    sourcedatas -- source
FROM
    certificat_sref
WHERE
    DATE_PART('year', datedecesretenu) > 2006
    AND certstatuttest = 1
    AND (certvoletcomplementaire IS NULL OR certvoletcomplementaire = '1')
    AND certorigine = '1'
    AND numcertificat LIKE 'ER%'
;
