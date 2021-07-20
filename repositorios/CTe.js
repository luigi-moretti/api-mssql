const query = require('../infraestrutura/database/querie');

module.exports={
    async listar(){
        const sql = 'select * from CTE';
        return query(sql);
    },

    async buscaPorData(parametros){
        const procedure = 'consultaCTE';
        return query('',parametros,procedure);
    }
}