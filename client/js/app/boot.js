'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
      document.querySelector('#importar').onclick = negociacaoController.import.bind(negociacaoController);
      document.querySelector('#apagar').onclick = negociacaoController.empty.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map