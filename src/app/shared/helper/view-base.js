
export class ViewBase {

    constructor() {
    }

    async render(selector, template_url, style_url) {
        const req_html = await fetch(template_url);
        const content = await req_html.text();
        const target = document.querySelector(selector);

        this.___loadHtml(target, content);
        this.___loadCss(style_url, selector);
    }

    ___loadHtml(target, content) {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
        target.appendChild(document.createRange().createContextualFragment(content));
    }
    
    ___loadCss(style_url, css_id) {
        if (!document.getElementById(css_id)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = css_id;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = style_url;
            link.media = 'all';
            head.appendChild(link);
        }
    }
}