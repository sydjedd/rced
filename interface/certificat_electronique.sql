TRUNCATE TABLE certificat_electronique;
INSERT INTO
    certificat_electronique
SELECT
    numcertificat, -- id
    --certorigine, -- origine
    certnommedecindeclarant, -- medecin_declarant
    certidentifiantorganismedeclarant, -- organisme_declarant
    certvoletcomplementaire, -- volet_complementaire
    CASE WHEN certidentifiantorganismedeclarant = '1000000002' THEN 1 ELSE 0 END, -- hors_etablissement
    COALESCE(lieudecesretenu, lieudecessaisi, insee_lieudeces), -- lieu_deces
    CASE
        WHEN certidentifiantorganismedeclarant = '1000000002' THEN
            COALESCE(CodeDptLieuGeoDecesRetenu, CodeDptLieuGeoDecesSaisi)
        ELSE
            CASE
                WHEN SUBSTRING(certidentifiantorganismedeclarant, 1, 2) = '97'   THEN  CONCAT('97',  SUBSTRING(certidentifiantorganismedeclarant, 4, 1))
                WHEN SUBSTRING(certidentifiantorganismedeclarant, 1, 4) = '9805' THEN '976'
                ELSE SUBSTRING(certidentifiantorganismedeclarant, 1, 2)
            END
    END, -- lieu_deces_geo_code_departement
    UPPER(REPLACE(COALESCE(communelieugeodecesretenu, communelieugeodecessaisi, insee_communelieugeodeces), '-', '')), -- lieu_deces_geo_commune
    datedecesretenu, -- date_deces
    DATE_PART('year', datedecesretenu), -- annee_deces
    DATE_PART('quarter', datedecesretenu), -- trimestre_deces
    sourcedatas -- source
FROM
    sref_certificat
WHERE
    DATE_PART('year', datedecesretenu) > 2006
    AND certstatuttest = 1
    AND (certvoletcomplementaire IS NULL OR certvoletcomplementaire = '1')
    AND certorigine = '1'
    AND numcertificat LIKE 'ER%'
;
