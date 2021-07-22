class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarMDFe();
        this.criarCTe();
        this.criarProcCTE();
        this.criarProcMDFE();
    }

    criarMDFe() {
        const sql = `
        IF NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'MDFE')
        BEGIN
        create TABLE MDFE (
            id int not null IDENTITY PRIMARY key,
            CHAVEMDFE VARCHAR(100),
            EMITENTEMDFE VARCHAR(100),
            DATAAUTORIZACAOMDFE DATETIME,
            STATUS VARCHAR (11)
        )END`;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela MDFe criada ou encontrada com sucesso')
            }
        })
    }

    criarCTe() {
        const sql = `
        IF NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'CTE')
        BEGIN
        create TABLE CTE (
            id int not null IDENTITY PRIMARY key,
            CHAVECTE VARCHAR(100),
            EMITENTECTE VARCHAR(100),
            REMETENTECTE VARCHAR(100),
            DESTINATARIOCTE VARCHAR(100),
            DATAAUTORIZACAOCTE DATETIME,
            STATUS VARCHAR (11)
        )END`;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela CTe criada ou alterada com sucesso')
            }
        })
    }

    criarProcCTE() {
        const sql = ` 
        CREATE OR ALTER PROCEDURE consultaCTE
        @lista NVARCHAR(MAX) = null,
        @status NVARCHAR(MAX) = null,
        @dataInicial DATETIME = null,
        @dataFinal DATETIME = null
        
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
        
        WHILE @nextpos > 0
        BEGIN
            SELECT @nextpos = charindex(';', @lista, @pos + 1)
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
        and CTE.DATAAUTORIZACAOCTE BETWEEN @dataInicial and @dataFinal
        `;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Procedure consultaCTE criada ou alterada com sucesso')
            }
        })
    }

    criarProcMDFE() {
        const sql = `
        CREATE OR ALTER PROCEDURE consultaMDFE
        @lista NVARCHAR(MAX) = null,
        @status NVARCHAR(MAX) = null,
        @dataInicial DATETIME = null,
        @dataFinal DATETIME = null

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

        WHILE @nextpos > 0
        BEGIN
            SELECT @nextpos = charindex(';', @lista, @pos + 1)
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
        select MDFE.*
        from MDFE 
        where 1=1
        and (CASE WHEN @lista is NULL then 'A' else MDFE.CHAVEMDFE end) in (select case when number is null then 'A' else number end from @tbl)
        and (CASE when @status is NULL then 'A' else MDFE.STATUS end) in (select  case when number is null then 'A' else number end from @Stbl)
        and MDFE.DATAAUTORIZACAOMDFE BETWEEN @dataInicial and @dataFinal
        `;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Procedure consultaMDFE  criada ou encontrada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas;