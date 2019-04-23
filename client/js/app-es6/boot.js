import { NegociacaoController } from "./controllers/NegociacaoController";

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
document.querySelector('#importar').onclick = negociacaoController.import.bind(negociacaoController);
document.querySelector('#apagar').onclick = negociacaoController.empty.bind(negociacaoController);