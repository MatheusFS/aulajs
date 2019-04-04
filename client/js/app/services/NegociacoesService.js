class NegociacoesService {

    constructor(){

        this._http = new HttpService();
    }

    getNegociacoesSemana(){

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana')
                })
        })
    }

    getNegociacoesSemanaAnterior(){

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana anterior')
                })
        })
    }

    getNegociacoesSemanaRetrasada(){

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana retrasada')
                })
        })
    }
}