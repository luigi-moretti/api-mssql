const TabelaMDFe = require('../repositorios/MDFe');
const moment = require('moment');


class MDFe{

    listar(){
        return TabelaMDFe.listar()
    }

    buscaPorData(dataInicial, dataFinal, status=null, lista=null){
        const dataInicialFormatada = moment(dataInicial,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const parametros = [
            {dataInicial: dataInicialFormatada, tipo:'DateTime'},
            {dataFinal: dataFinalFormatada, tipo:'DateTime'},
            {status:status, tipo:'VarChar'},
            {lista: lista ,tipo:'VarChar'}
        ];

        return TabelaMDFe.buscaPorData(parametros);
    }
}

module.exports = new MDFe;