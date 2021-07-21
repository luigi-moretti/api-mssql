const query = require('../infraestrutura/database/querie');
const moment = require('moment');

module.exports={
    async listar(){
        const sql = 'select * from MDFE';
        return query(sql)
    },
    
    buscaPorData(dataInicial, dataFinal, status=null, lista=null){
        const dataInicialFormatada = moment(dataInicial,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const parametros = [
            {dataInicial: dataInicialFormatada, tipo:'DateTime'},
            {dataFinal: dataFinalFormatada, tipo:'DateTime'},
            {status:status, tipo:'VarChar'},
            {lista: lista ,tipo:'VarChar'}
        ];
        const procedure = 'consultaMDFE';
        return query('',parametros,procedure);
    },

    async inserir(parametros) {
        const sql = `insert into MDFE OUTPUT INSERTED.ID
                        values (@chavemdfe, @emitentemdfe, @dataautorizacao,@status)
        `;
        return query(sql, parametros)
    },

    remover(id){
        const preparaId = [{id: id, tipo: 'Int'}];
        const sql = `delete from MDFE where id = @id`;
        return query(sql, preparaId);
    },

    buscaPorId(id){
        const preparaId = [{id: id, tipo: 'Int'}];
        const sql = `select * from MDFE where id = @id`;
        return query(sql, preparaId);
    },

    atualizar(parametros){
        const sql = `update MDFE set chavemdfe = @chavemdfe,  emitentemdfe = @emitentemdfe, DATAAUTORIZACAOMDFE = @dataautorizacao, status = @status where id = @id`;
        return query(sql, parametros);
    }
}