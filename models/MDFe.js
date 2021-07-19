const TabelaMDFe = require('../repositorios/MDFe');


class MDFe{

    listar(){
        return TabelaMDFe.listar()
    }

    buscaPorId(id){
        return TabelaMDFe.buscaPorId(id);
    }
}

module.exports = new MDFe;