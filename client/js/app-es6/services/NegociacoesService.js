import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacoesService {

    constructor() {

        this._http = new HttpService();
    }


    getNegociacoesSemana() {

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
    getNegociacoesSemanaAnterior() {

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
    getNegociacoesSemanaRetrasada() {

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

    getNegociacoes() {

        return Promise.all([
            this.getNegociacoesSemana(),
            this.getNegociacoesSemanaAnterior(),
            this.getNegociacoesSemanaRetrasada()
        ])
            .then(periodos => {

                let negociacoes = periodos
                    .reduce((uniqueArray, array) => uniqueArray.concat(array), [])
                    .map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));

                return negociacoes;
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    insert(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.insert(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível adicionar a negociacao')
            });
    }

    render() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.selectAll())
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possivel listar as negociações')
            });
    }

    empty() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.deleteAll())
            .then(() => 'Lista negociações limpa!')
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível limpar a lista de negociações')
            });
    }

    import(listaNegociacoes) {

        return this.getNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaNegociacoes.negociacoes.some(negociacaoIn =>
                        JSON.stringify(negociacaoIn) == JSON.stringify(negociacao)))
            )
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}