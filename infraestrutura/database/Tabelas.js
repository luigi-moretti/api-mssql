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
            DATAAUTORIZACAOMDFE DATETIME)
        END`;

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
            DESTINATAIOCRE VARCHAR(100),
            DATAAUTORIZACAOCTE DATETIME
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
        @dataInicial datetime = null,   
        @dataFinal datetime = null
        AS
        SELECT * FROM CTE WHERE 1=1 and DATAAUTORIZACAOCTE BETWEEN @dataInicial AND @dataFinal
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
        @dataInicial datetime = null,   
        @dataFinal datetime = null
        AS
        SELECT * FROM MDFE WHERE 1=1 and DATAAUTORIZACAOMDFE BETWEEN @dataInicial AND @dataFinal
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