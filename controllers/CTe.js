const roteador = require('express').Router();
const CTe = require('../models/CTe');

roteador.get('/', async(req, res)=>{
    const dataInicial = req.query.dataInicial;
    const dataFinal = req.query.dataFinal;
    const status = req.query.status ? req.query.status.toString(): null;
    const lista = req.query.chaves ? req.query.chaves : null;
    CTe.buscaPorData(dataInicial, dataFinal, status, lista)
        .then(resultado => res.status(200).json(resultado))
        .catch(erros => res.status(400).json(erros))
})


module.exports = roteador;