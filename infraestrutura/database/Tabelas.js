class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarMDFe();
        this.criarCTe();
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
                console.log('Tabela CTe criada ou encontrada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas;