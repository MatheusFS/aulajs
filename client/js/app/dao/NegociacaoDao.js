'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._conn = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'insert',
        value: function insert(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._conn.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function () {
                    return resolve();
                };
                request.onerror = function (e) {
                    return reject(e.target.error.name);
                };
            });
        }
    }, {
        key: 'selectAll',
        value: function selectAll() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._conn.transaction([_this2._store], 'readonly').objectStore(_this2._store).openCursor();
                var negociacoes = [];

                cursor.onsuccess = function (e) {

                    var current = e.target.result;

                    if (current) {

                        var negociacao = current.value;
                        negociacoes.push(new Negociacao(negociacao._data, negociacao._quantidade, negociacao._valor));

                        current.continue();
                    } else {

                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (e) {

                    console.log(e.target.error.name);
                    reject('Não foi possível selecionar as negociações');
                };
            });
        }
    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var request = _this3._conn.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve('Negociacoes removidas com sucesso (DAO)');
                };
                request.onerror = function (e) {
                    return reject(e.target.error.name);
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map