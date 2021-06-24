TRUNCATE TABLE certificat_papier;
INSERT INTO
    certificat_papier
SELECT
	--COALESCE(codedptlieugeodecesretenu, codedptlieugeodecessaisi, insee_codedptlieugeodeces), -- lieu_deces_geo_code_departement
	CASE
        WHEN codedptlieugeodecesretenu IS NOT NULL AND codedptlieugeodecesretenu != '00' THEN codedptlieugeodecesretenu
        WHEN codedptlieugeodecessaisi IS NOT NULL AND codedptlieugeodecessaisi != '00' THEN codedptlieugeodecessaisi
        WHEN insee_codedptlieugeodeces IS NOT NULL AND insee_codedptlieugeodeces != '00' THEN insee_codedptlieugeodeces
        ELSE NULL
    END, -- lieu_deces_geo_commune
	UPPER(REPLACE(COALESCE(communelieugeodecesretenu, communelieugeodecessaisi, insee_communelieugeodeces), '-', '')), -- lieu_deces_geo_commune
    DATE_PART('year', datedecesretenu), -- annee_deces
    COUNT(numcertificat) -- nombre
FROM
    sref_certificat
WHERE
    DATE_PART('year', datedecesretenu) > 2006
    AND certorigine = '2'
    AND numcertificat LIKE 'PR%'
GROUP BY
    1,
    2,
    3
;
