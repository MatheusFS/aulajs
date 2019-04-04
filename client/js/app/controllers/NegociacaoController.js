class NegociacaoController {
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
    }
    
    add(){
        
        event.preventDefault();
        
        this._listaNegociacoes.add(this._createNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        this._resetForm();
        
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