class MensagemView extends View {

    template(model){

        return model.texto ? `<p class="alert alert-info" style="margin: 4px">${model.texto}</p>` : `` ;
    }

}