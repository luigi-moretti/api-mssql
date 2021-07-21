const roteador = require('express').Router();
const MDFe = require('../models/MDFe');
const TabelaMDFe = require('../repositorios/MDFe');

roteador.get('/', async(req, res)=>{
    try{
        const dataInicial = req.query.dataInicial;
        const dataFinal = req.query.dataFinal;
        const status = req.query.status ? req.query.status.toString(): null;
        const lista = req.query.chaves ? req.query.chaves : null;
    
        const resultados = await TabelaMDFe.buscaPorData(dataInicial, dataFinal, status, lista);
        res.status(200).json(resultados);

    }catch(erro){
        console.log(erro)
        res.status(400).json(erro);
    }
})

roteador.post('/', async(req, res)=>{
    try{
        const dadosRecebidos = req.body;
        const mdfe = new MDFe(dadosRecebidos);
        await mdfe.criar();
        res.status(201).json(mdfe);
    } catch(erro){
        console.log(erro)
        res.status(400).json(erro);
    }
});

roteador.delete('/:id', async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        const mdfe = new MDFe({id:id});
        await mdfe.remover(id);
        res.status(204).end();
    }catch(erro){
        console.log(erro);
        res.status(400).json(erro);
    }
});

roteador.put('/:id', async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        const dadosRecebidos = req.body;
        const dados = Object.assign({},dadosRecebidos,{id:id});
        const mdfe = new MDFe(dados);
        await mdfe.atualizar();
        res.status(204).end();
    }catch(erro){
        console.log(erro);
        res.status(400).json(erro);
    }
})


module.exports = roteador;