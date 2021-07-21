const query = require('../infraestrutura/database/querie');
const moment = require('moment');

module.exports = {
    async listar() {
        const sql = 'select * from CTE';
        return query(sql);
    },

    async buscaPorData(dataInicial, dataFinal, status = null, lista = null) {

        const dataInicialFormatada = moment(dataInicial, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const parametros = [
            { dataInicial: dataInicialFormatada, tipo: 'DateTime' },
            { dataFinal: dataFinalFormatada, tipo: 'DateTime' },
            { status: status, tipo: 'VarChar' },
            { lista: lista, tipo: 'VarChar' }
        ];


        const procedure = 'consultaCTE';
        return query('', parametros, procedure);
    },

    async inserir(parametros) {
        const sql = `insert into CTE OUTPUT INSERTED.ID
                        values (@chavecte, @emitentecte, @remetentecte,@destinatariocte,@dataautorizacao,@status)
        `;
        return query(sql, parametros)
    },

    remover(id){
        const preparaId = [{id: id, tipo: 'Int'}];
        const sql = `delete from CTE where id = @id`;
        return query(sql, preparaId);
    },

    buscaPorId(id){
        const preparaId = [{id: id, tipo: 'Int'}];
        const sql = `select * from CTE where id = @id`;
        return query(sql, preparaId);
    },

    atualizar(parametros){
        //const preparaId = [{id: id, tipo: 'Int'}];
        const sql = `update CTE set chavecte = @chavecte,  emitentecte = @emitentecte, remetentecte = @remetentecte, destinataiocre = @destinatariocte, dataautorizacaocte = @dataautorizacao, status = @status where id = @id`;
        return query(sql, parametros);
    }
}