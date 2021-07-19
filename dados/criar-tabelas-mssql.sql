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


--SELECT MDFE.*, @dataInicial dataInicial, @dataFinal dataFinal, @chaves chaves 
--FROM MDFE 
--WHERE 
--1=1
--DATAAUTORIZACAOMDFE BETWEEN @dataInicial AND @dataFinal
--and DATAAUTORIZACAOMDFE BETWEEN (case when @dataInicial is not null then @dataInicial else (GETDATE()-1) end) and (case when @dataFinal is not null then @dataFinal else (GETDATE()-1)end)
--and CHAVEMDFE in (@chaves)

--CHAVEMDFE in (case @chaves is not null then (@chaves)else)

/*
					IF (@dataInicial is not null and @dataFinal is not null )
			BEGIN
				SET @QUERYBASE = @QUERYBASE+' AND DATAAUTORIZACAOMDFE BETWEEN '+ @dataInicial +' AND '+ @dataFinal
			END
*/


--EXEC consultaMDFE @dataInicial = '01/02/2021', @dataFinal = '02/08/2021'; 
EXEC consultaMDFE @dataInicial = CONVERT(DATE, '2021-07-01 11:04:00', 120), @dataFinal = '2021-07-02 13:04:00';
