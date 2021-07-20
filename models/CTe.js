const TabelaCTe = require('../repositorios/CTe');
const moment = require('moment');

class CTe{

    listar(){
        return TabelaCTe.listar()
    }

    buscaPorData(dataInicial, dataFinal){
        const dataInicialFormatada = moment(dataInicial,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const parametros = [
            {dataInicial: dataInicialFormatada},
            {dataFinal: dataFinalFormatada}
        ];

        return TabelaCTe.buscaPorData(parametros);
    }
}

module.exports = new CTe;