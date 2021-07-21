const TabelaCTe = require('../repositorios/CTe');
const moment = require('moment');

class CTe{
    constructor({id, chavecte, emitentecte, remetentecte, destinatariocte, dataautorizacao, status}){
        this.id = id;
        this.chavecte = chavecte;
        this.emitentecte = emitentecte;
        this.remetentecte = remetentecte;
        this.destinatariocte = destinatariocte;
        this.dataautorizacao = dataautorizacao;
        this.status = status;
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

        return TabelaCTe.buscaPorData(parametros);
    }

    async criar(){
        const resultado = await TabelaCTe.inserir([
            {chavecte:this.chavecte,tipo:'VarChar'},
            {emitentecte:this.emitentecte,tipo:'VarChar'},
            {remetentecte:this.remetentecte,tipo:'VarChar'},
            {destinatariocte:this.destinatariocte,tipo:'VarChar'},
            {dataautorizacao:this.dataautorizacao,tipo:'DateTime'},
            {status:this.status,tipo:'VarChar'}
        ]);
        this.id = resultado.id;

    }

    remover(){
        return TabelaCTe.remover(this.id);
    }

    async carregar(){
        const cteEncontrado = await TabelaCTe.buscaPorId(this.id);
        this.chavecte = cteEncontrado.chavecte;
        this.emitentecte = cteEncontrado.emitentecte;
        this.remetentecte = cteEncontrado.remetentecte;
        this.destinatariocte = cteEncontrado.destinatariocte;
        this.dataautorizacao = cteEncontrado.dataautorizacao;
        this.status = status;
    }

    async atualizar(){
        await TabelaCTe.buscaPorId(this.id);

        await TabelaCTe.atualizar([
            {id:this.id,tipo:'Int'},
            {chavecte:this.chavecte,tipo:'VarChar'},
            {emitentecte:this.emitentecte,tipo:'VarChar'},
            {remetentecte:this.remetentecte,tipo:'VarChar'},
            {destinatariocte:this.destinatariocte,tipo:'VarChar'},
            {dataautorizacao:this.dataautorizacao,tipo:'DateTime'},
            {status:this.status,tipo:'VarChar'}
        ]);
    }
}

module.exports = CTe;