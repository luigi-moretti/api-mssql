const sql = require('mssql');
const conexao = require('./conexao');

const execuraQuery = async (query = '', parametros = [], procedure = '') => {
    try {
        let pool = await sql.connect(conexao)
        if (query !== '') {
            // Quando for Query
            let resultadoQuery = pool.request();
                parametros.forEach(parametro => {
                    const key = Object.keys(parametro)[0];
                    const tipo = Object.values(parametro)[1];
                    resultadoQuery.input(key, sql[tipo], Object.values(parametro)[0])  
                });
            const resultado = await resultadoQuery.query(query)
            return resultado.recordset
        } else {
            // Quando for Stored procedure
            let resultadoProcedure = pool.request();
                parametros.forEach(parametro=>{
                    const key = Object.keys(parametro)[0];
                    const tipo = Object.values(parametro)[1];
                    resultadoProcedure.input(key, sql[tipo], Object.values(parametro)[0])
                })
                const resultado = await resultadoProcedure.execute(procedure)
            return resultado.recordset
        }
    } catch (erro) {
        console.log(erro)
        throw new Error('Erro ao executar query no banco de dados')
    }

}

module.exports = execuraQuery;