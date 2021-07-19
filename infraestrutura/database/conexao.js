const mssql  = require('mssql');

async function conexao() {
    const config = {
        user: 'sa',
        password: '<YourStrong@Passw0rd>',
        database: 'frconsultoria',
        server: 'localhost',
        port:1401,
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },  
        options: {
          encrypt: false, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    };
    const conectado =  await mssql.connect(config);
    return conectado;
}

module.exports = conexao;