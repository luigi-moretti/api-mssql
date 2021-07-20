create TABLE CTE (
    id int not null IDENTITY PRIMARY key,
    CHAVECTE VARCHAR(100),
    EMITENTECTE VARCHAR(100),
    REMETENTECTE VARCHAR(100),
    DESTINATAIOCRE VARCHAR(100),
    DATAAUTORIZACAOCTE DATETIME
);

select * from cte;

create TABLE MDFE (
    id int not null IDENTITY PRIMARY key,
    CHAVEMDFE VARCHAR(100),
    EMITENTEMDFE VARCHAR(100),
    DATAAUTORIZACAOMDFE DATETIME
);

drop TABLE MDFE;

select id, CHAVEMDFE, EMITENTEMDFE, Convert(VarChar(10), DATAAUTORIZACAOMDFE,103) data from MDFe;

select * from MDFE where id = 1

--select * from MDFE where Convert(VarChar(10), DATAAUTORIZACAOMDFE,103) BETWEEN Convert(VarChar(10),('01/02/2021'), 103) and Convert(VarChar(10),('02/08/2021'), 103);



IF NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'MDFE')
        BEGIN
        create TABLE MDFE (
            id int not null IDENTITY PRIMARY key,
            CHAVEMDFE VARCHAR(100),
            EMITENTEMDFE VARCHAR(100),
            DATAAUTORIZACAOMDFE DATETIME)
        END
;/*
CREATE OR ALTER PROCEDURE consultaMDFE
@dataInicial datetime = null,   
@dataFinal datetime = null
AS
	BEGIN
		DECLARE @QUERYBASE VARCHAR(100)
		DECLARE @TABELA VARCHAR(50) = 'MDFE'
		SET @QUERYBASE= 'SELECT * FROM '+ @TABELA +' WHERE 1=1 AND DATAAUTORIZACAOMDFE BETWEEN '+ (CONVERT(DATE, @dataInicial, 120)) +' AND '+ (CONVERT(DATE, @dataFinal, 120))

		SELECT @QUERYBASE
		EXEC (@QUERYBASE)
	END

CREATE OR ALTER PROCEDURE consultaMDFE
@dataInicial datetime = null,   
@dataFinal datetime = null
AS
SELECT * FROM MDFE WHERE 1=1 and DATAAUTORIZACAOMDFE BETWEEN @dataInicial AND @dataFinal

CREATE OR ALTER PROCEDURE consultaCTE
@dataInicial datetime = null,   
@dataFinal datetime = null
AS
SELECT * FROM CTE WHERE 1=1 and DATAAUTORIZACAOCTE BETWEEN @dataInicial AND @dataFinal
--and DATAAUTORIZACAOMDFE BETWEEN (case when @dataInicial is not null then @dataInicial else (GETDATE()-1) end) and (case when @dataFinal is not null then @dataFinal else (GETDATE()-1)end)
--and CHAVEMDFE in (@chaves)
*/
--CHAVEMDFE in (case @chaves is not null then (@chaves)else)

/*
					IF (@dataInicial is not null and @dataFinal is not null )
			BEGIN
				SET @QUERYBASE = @QUERYBASE+' AND DATAAUTORIZACAOMDFE BETWEEN '+ @dataInicial +' AND '+ @dataFinal
			END
*/


--EXEC consultaMDFE @dataInicial = '01/02/2021', @dataFinal = '02/08/2021'; 
--EXEC consultaMDFE @dataInicial = '2021-07-01 11:04:00', @dataFinal = '2021-07-02 13:04:00';

CREATE OR ALTER PROCEDURE consultaCTEPorChave
@chaves TABLE
AS
select * from CTE where CHAVECTE in @chaves


CREATE OR ALTER PROCEDURE consultaCTEPorChave
@lista NVARCHAR(MAX) = null,
@status NVARCHAR(MAX) = null
AS
DECLARE @pos INT
DECLARE @nextpos INT
DECLARE @valuelen INT
DECLARE @tbl TABLE (number NVARCHAR(MAX))


DECLARE @Spos INT
DECLARE @Snextpos INT
DECLARE @Svaluelen INT
DECLARE @Stbl TABLE (number NVARCHAR(MAX))
SELECT @pos = 0, @nextpos = 1;

--IF @lista IS NOT NULL
WHILE @nextpos > 0
BEGIN
    SELECT @nextpos = charindex(',', @lista, @pos + 1)
    SELECT @valuelen = CASE WHEN @nextpos > 0
                            THEN @nextpos
                            ELSE len(@lista) + 1
                        END - @pos - 1
    INSERT @tbl (number)
        VALUES (convert(NVARCHAR(MAX), substring(@lista, @pos + 1, @valuelen)))
    SELECT @pos = @nextpos;
END


SELECT @Spos = 0, @Snextpos = 1;
	WHILE @Snextpos > 0
	BEGIN
		SELECT @Snextpos = charindex(',', @status, @Spos + 1)
		SELECT @Svaluelen = CASE WHEN @Snextpos > 0
								THEN @Snextpos
								ELSE len(@status) + 1
							END - @Spos - 1
		INSERT @Stbl (number)
			VALUES (convert(NVARCHAR(MAX), substring(@status, @Spos + 1, @Svaluelen)))
		SELECT @Spos = @Snextpos;
	END
select CTE.*
from CTE 
where 1=1
and (CASE WHEN @lista is NULL then 'A' else CTE.CHAVECTE end) in (select case when number is null then 'A' else number end from @tbl)
and (CASE when @status is NULL then 'A' else CTE.STATUS end) in (select  case when number is null then 'A' else number end from @Stbl)
;
EXEC consultaCTEPorChave  @status='CANCELADO,AUTORIZADO', @lista='33659708046795850800570010013155058314981119,33659708046795850800570010013155058314986026,33659708046795850800570010013155058314986026,33659708046795850800570010013154358314942415'
;

CREATE OR ALTER PROCEDURE consultaMDFEPorChave
@lista NVARCHAR(MAX)
AS
DECLARE @pos INT
DECLARE @nextpos INT
DECLARE @valuelen INT
DECLARE @tbl TABLE (number NVARCHAR(MAX) NOT NULL)

SELECT @pos = 0, @nextpos = 1;

WHILE @nextpos > 0
BEGIN
    SELECT @nextpos = charindex(',', @lista, @pos + 1)
    SELECT @valuelen = CASE WHEN @nextpos > 0
                            THEN @nextpos
                            ELSE len(@lista) + 1
                        END - @pos - 1
    INSERT @tbl (number)
        VALUES (convert(NVARCHAR(MAX), substring(@lista, @pos + 1, @valuelen)))
    SELECT @pos = @nextpos;
END
select * from MDFE where CHAVEMDFE in(select * from @tbl)