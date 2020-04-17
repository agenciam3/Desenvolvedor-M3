export class AppView {
    _target = '#content';

    changeContent = content => {
        let element = document.querySelector(this._target);
        if (!element) {
            throw new Error('Falha ao encontrar elemento: ' + this._target);
        }

        //Remove todos os elementos atuais
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        element.appendChild(document.createRange().createContextualFragment(content));
    }
}