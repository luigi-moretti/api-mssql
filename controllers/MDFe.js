const roteador = require('express').Router();
const MDFe = require('../models/MDFe');

roteador.get('/', async(req, res)=>{
    const dataInicial = req.query.dataInicial;
    const dataFinal = req.query.dataFinal;

    MDFe.buscaPorData(dataInicial, dataFinal)
        .then(resultado => res.status(200).json(resultado))
        .catch(erros => res.status(400).json(erros))
})


module.exports = roteador;