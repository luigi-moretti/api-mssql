const query = require('../infraestrutura/database/querie');

module.exports={
    async listar(){
        const sql = 'select * from CTE';
        return query(sql);
    },

    async buscaPorId(id){
        const sql = 'select * from CTE where id = ?';
        return query(sql, id);
    }
}