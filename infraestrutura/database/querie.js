const sql = require('mssql');
const conexao = require('./conexao');

const execuraQuery = async (query, parametros = '') => {
    try {
        const conn = await conexao();
        await sql.connect(conn);
        const result = await sql.query(query, parametros)
        return result.recordset
    } catch (err) {
        console.log(err)
    }

}

module.exports = execuraQuery;