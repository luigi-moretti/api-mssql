const query = require('../infraestrutura/database/querie');

module.exports={
    async listar(){
        const sql = 'select * from MDFE';
        return query(sql);
    },

    async buscaPorId(id){
        const sql = 'select * from MDFE where id = ?';
        return query(sql, id);
    }
}