class NegociacaoController {
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new ListaNegociacoes(this, function(model){
            this._negociacoesView.update(model);
        });
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }
    
    add(event){
        
        event.preventDefault();

        // Atualiza Models
        this._listaNegociacoes.add(this._createNegociacao());
        this._mensagem.texto = 'Negociação inserida com sucesso!';

        // Atualiza Views
        this._mensagemView.update(this._mensagem);

        this._resetForm();
        
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