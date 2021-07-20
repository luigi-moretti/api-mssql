const TabelaMDFe = require('../repositorios/MDFe');
const moment = require('moment');


class MDFe{

    listar(){
        return TabelaMDFe.listar()
    }

    buscaPorData(dataInicial, dataFinal){
        const dataInicialFormatada = moment(dataInicial,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const parametros = [
            {dataInicial: dataInicialFormatada},
            {dataFinal: dataFinalFormatada}
        ];

        return TabelaMDFe.buscaPorData(parametros);
    }
}

module.exports = new MDFe;