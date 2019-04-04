class ListaNegociacoes {
    
    constructor(context, armadilha){
        
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._context = context;
    }
    
    add(negociacao){

        this._negociacoes.push(negociacao);
        Reflect.apply(this._armadilha, this._context,[this]);
    }
    
    get negociacoes(){

        return [].concat(this._negociacoes);
    }

    empty(){

        this._negociacoes = [];
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._context,[this]);
    }
}