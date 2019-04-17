'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'empty');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._service = new NegociacoesService();
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.render().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.add(negociacao);
                });
            }).catch(function (err) {
                return _this._mensagem.texto = err;
            });
        }
    }, {
        key: 'add',
        value: function add(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._createNegociacao();

            this._service.insert(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.add(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._resetForm();
            }).catch(function (err) {
                return _this2._mensagem.texto = err;
            });
        }
    }, {
        key: 'import',
        value: function _import() {
            var _this3 = this;

            this._service.import(this._listaNegociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this3._listaNegociacoes.add(negociacao);
                });
                _this3._mensagem.texto = 'Negociações importadas com sucesso';
            }).catch(function (err) {
                return _this3._mensagem.texto = err;
            });
        }
    }, {
        key: 'empty',
        value: function empty() {
            var _this4 = this;

            this._service.empty().then(function (mensagem) {
                _this4._listaNegociacoes.empty();
                _this4._mensagem.texto = mensagem;
            }).catch(function (err) {
                return _this4._mensagem.texto = err;
            });
        }
    }, {
        key: '_createNegociacao',
        value: function _createNegociacao() {

            return new Negociacao(DateHelper.stringToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_resetForm',
        value: function _resetForm() {

            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map