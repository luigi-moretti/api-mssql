const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const mdfe = require('./controllers/MDFe');
const cte = require('./controllers/CTe');
const conexao = require('./infraestrutura/database/conexao');
const sql = require('mssql');
const Tabelas = require('./infraestrutura/database/Tabelas');

const iniciar =  async() =>{
    try{
        const conn = await conexao();
        const conectado = await sql.connect(conn);
        Tabelas.init(conectado)
        app.use(bodyParser.urlencoded({extended:true}));
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            app.use(cors());
            next();
        });
        app.use('/api/mdfe',mdfe);
        app.use('/api/cte',cte);
        app.listen(3001, ()=> console.log('Servidor está rodando na porta 3001'))
    }catch(erro){
        console.log(erro)
    }
}

iniciar();