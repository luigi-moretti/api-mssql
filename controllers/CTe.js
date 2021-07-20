const roteador = require('express').Router();
const CTe = require('../models/CTe');

roteador.get('/', async(req, res)=>{
    const dataInicial = req.query.dataInicial;
    const dataFinal = req.query.dataFinal;

    CTe.buscaPorData(dataInicial, dataFinal)
        .then(resultado => res.status(200).json(resultado))
        .catch(erros => res.status(400).json(erros))
})


module.exports = roteador;