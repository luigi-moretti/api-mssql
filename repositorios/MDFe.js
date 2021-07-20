const query = require('../infraestrutura/database/querie');

module.exports={
    async listar(){
        const sql = 'select * from MDFE';
        return query(sql)
    },
    
    buscaPorData(parametros){
        const procedure = 'consultaMDFE';
        return query('',parametros,procedure);
    }
}