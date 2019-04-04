class NegociacaoController {
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'add','empty'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.selectAll())
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.add(negociacao)))
            .catch(err => this._mensagem.texto = err);
    }
    
    add(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let negociacao = this._createNegociacao();

                new NegociacaoDao(connection)
                    .insert(negociacao)
                    .then(() => {
                        this._listaNegociacoes.add(negociacao);
                        this._mensagem.texto = 'Negociação inserida com sucesso!';
                        this._resetForm();
                    })
            })
            .catch(err => this._mensagem.texto = err);
    }

    import(){

        let service = new NegociacoesService();

        Promise.all([
            service.getNegociacoesSemana(),
            service.getNegociacoesSemanaAnterior(),
            service.getNegociacoesSemanaRetrasada()
        ])
            .then(negociacoes => {
                negociacoes
                    .reduce((uniqueArray, array) => uniqueArray.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.add(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            })
            .catch(err => this._mensagem.texto = err);
    }

    empty(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.deleteAll())
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