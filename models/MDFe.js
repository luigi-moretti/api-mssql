const TabelaMDFe = require('../repositorios/MDFe');
const moment = require('moment');


class MDFe{
    constructor({id, chavemdfe, emitentemdfe, dataautorizacao, status}){
        this.id = id;
        this.chavemdfe = chavemdfe;
        this.emitentemdfe = emitentemdfe;
        this.dataautorizacao = dataautorizacao;
        this.status = status;
    }

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
    };

    async criar(){
        const resultado = await TabelaMDFe.inserir([
            {chavemdfe:this.chavemdfe,tipo:'VarChar'},
            {emitentemdfe:this.emitentemdfe,tipo:'VarChar'},
            {dataautorizacao:this.dataautorizacao,tipo:'DateTime'},
            {status:this.status,tipo:'VarChar'}
        ]);
        this.id = resultado.id;

    }

    remover(){
        return TabelaMDFe.remover(this.id);
    }

    async carregar(){
        const mdfeEncontrado = await TabelaMDFe.buscaPorId(this.id);
        this.chavemdfe = mdfeEncontrado.chavemdfe;
        this.emitentemdfe = mdfeEncontrado.emitentemdfe;
        this.dataautorizacao = mdfeEncontrado.dataautorizacao;
        this.status = status;
    }

    async atualizar(){
        await TabelaMDFe.buscaPorId(this.id);

        await TabelaMDFe.atualizar([
            {id:this.id,tipo:'Int'},
            {chavemdfe:this.chavemdfe,tipo:'VarChar'},
            {emitentemdfe:this.emitentemdfe,tipo:'VarChar'},
            {dataautorizacao:this.dataautorizacao,tipo:'DateTime'},
            {status:this.status,tipo:'VarChar'}
        ]);
    }
}

module.exports = MDFe;