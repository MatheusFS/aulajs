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
    }
    
    add(event){
        
        event.preventDefault();
        this._listaNegociacoes.add(this._createNegociacao());
        this._mensagem.texto = 'Negociação inserida com sucesso!';
        this._resetForm();
    }

    import(){

        let service = new NegociacoesService();
        service.getNegociacoesSemana((err, negociacoes) => {

            if(err){
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.add(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        });
    }

    empty(){

        this._listaNegociacoes.empty();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
    
    _createNegociacao(){

        return new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
    
    _resetForm(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}