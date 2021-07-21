const TabelaCTe = require('../repositorios/CTe');
const moment = require('moment');

class CTe{

    listar(){
        return TabelaCTe.listar()
    }

    buscaPorData(dataInicial, dataFinal, status=null, lista=null){
        const dataInicialFormatada = moment(dataInicial,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataFinalFormatada = moment(dataFinal,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        //console.log(status)
        const parametros = [
            {dataInicial: dataInicialFormatada, tipo:'DateTime'},
            {dataFinal: dataFinalFormatada, tipo:'DateTime'},
            {status:status, tipo:'VarChar'},
            {lista: lista ,tipo:'VarChar'}
        ];

        return TabelaCTe.buscaPorData(parametros);
    }
}

module.exports = new CTe;