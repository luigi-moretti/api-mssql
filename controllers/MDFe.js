const roteador = require('express').Router();
const MDFe = require('../models/MDFe');

roteador.get('/', async(req, res)=>{
    MDFe.listar()
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
});

roteador.get('/:id', async(req, res)=>{
    const id = parseInt(req.params.id);
    MDFe.buscaPorId(id)
        .then(resultado => res.status(200).json(resultado))
        .catch(erros => res.status(400).json(erros))

})


module.exports = roteador;