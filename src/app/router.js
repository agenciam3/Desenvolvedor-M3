export class Router {

    constructor(routes, changeContentCb, path404) {
        this.routes = routes;
        this.changeContent = changeContentCb;
        this.route404 = routes.find(r => r.regex_route.test(path404));
        if (!this.route404) {
            throw new Error('Rota 404 não encontrada.');
        }
    }

    async navigate(url) {
        let route = this.routes.find(r => r.regex_route.test(url));

        if (!route) {
            route = this.rota404;
        }

        if (route.html) {
            try {
                const req = await fetch(route.html);
                const content = await req.text();
                if (req.ok) {
                    this.changeContent.call(this, content);
                } else {
                    throw new Error(content);
                }
            } catch (e) {
                this.changeContent.call(this, e.message);
            }
        }

        if (route.js) {
            try {
                await import(route.js);
            } catch (e) {
                console.error(e);
                this.changeContent.call(this, e.message);
                
            }
        }
    }
}