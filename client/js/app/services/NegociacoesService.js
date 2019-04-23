'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacoesService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacoesService', NegociacoesService = function () {
                function NegociacoesService() {
                    _classCallCheck(this, NegociacoesService);

                    this._http = new HttpService();
                }

                _createClass(NegociacoesService, [{
                    key: 'getNegociacoesSemana',
                    value: function getNegociacoesSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('negociacoes/semana').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana');
                            });
                        });
                    }
                }, {
                    key: 'getNegociacoesSemanaAnterior',
                    value: function getNegociacoesSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana anterior');
                            });
                        });
                    }
                }, {
                    key: 'getNegociacoesSemanaRetrasada',
                    value: function getNegociacoesSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana retrasada');
                            });
                        });
                    }
                }, {
                    key: 'getNegociacoes',
                    value: function getNegociacoes() {

                        return Promise.all([this.getNegociacoesSemana(), this.getNegociacoesSemanaAnterior(), this.getNegociacoesSemanaRetrasada()]).then(function (periodos) {

                            var negociacoes = periodos.reduce(function (uniqueArray, array) {
                                return uniqueArray.concat(array);
                            }, []).map(function (negociacao) {
                                return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                            });

                            return negociacoes;
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    }
                }, {
                    key: 'insert',
                    value: function insert(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.insert(negociacao);
                        }).then(function () {
                            return 'Negociação adicionada com sucesso!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível adicionar a negociacao');
                        });
                    }
                }, {
                    key: 'render',
                    value: function render() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.selectAll();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possivel listar as negociações');
                        });
                    }
                }, {
                    key: 'empty',
                    value: function empty() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.deleteAll();
                        }).then(function () {
                            return 'Lista negociações limpa!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível limpar a lista de negociações');
                        });
                    }
                }, {
                    key: 'import',
                    value: function _import(listaNegociacoes) {

                        return this.getNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaNegociacoes.negociacoes.some(function (negociacaoIn) {
                                    return JSON.stringify(negociacaoIn) == JSON.stringify(negociacao);
                                });
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível importar as negociações');
                        });
                    }
                }]);

                return NegociacoesService;
            }());

            _export('NegociacoesService', NegociacoesService);
        }
    };
});
//# sourceMappingURL=NegociacoesService.js.map