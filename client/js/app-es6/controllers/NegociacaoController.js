import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacoesService } from '../services/NegociacoesService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

export class NegociacaoController {
    
    constructor(){

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add','empty');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._service = new NegociacoesService();
        this._init();
    }

    _init(){

        this._service
        .render()
        .then(negociacoes =>
            negociacoes.forEach(negociacao =>
                this._listaNegociacoes.add(negociacao)))
        .catch(err => this._mensagem.texto = err);
    }
    
    add(event){

        event.preventDefault();

        let negociacao = this._createNegociacao();

        this._service
        .insert(negociacao)
        .then(mensagem => {
            this._listaNegociacoes.add(negociacao);
            this._mensagem.texto = mensagem;
            this._resetForm();
        })
        .catch(err => this._mensagem.texto = err);
    }

    import(){

        this._service
            .import(this._listaNegociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.add(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            })
            .catch(err => this._mensagem.texto = err);
    }

    empty(){

        this._service
        .empty()
        .then(mensagem => {
            this._listaNegociacoes.empty();
            this._mensagem.texto = mensagem
        })
        .catch(err => this._mensagem.texto = err);
    }
    
    _createNegociacao(){

        return new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
    
    _resetForm(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}