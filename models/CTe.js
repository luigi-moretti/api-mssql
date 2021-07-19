const TabelaCTe = require('../repositorios/CTe');


class CTe{

    listar(){
        return TabelaCTe.listar()
    }

    buscaPorId(id){
        return TabelaCTe.buscaPorId(id);
    }
}

module.exports = new CTe;