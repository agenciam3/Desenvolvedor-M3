import APP_ROUTES from "./app/app-routes.js"
import { AppView } from "./app/app-view.js";
import { Router } from "./app/router.js";
import { HeaderComponent } from "./app/component/header/header.component.js";
import { FooterComponent } from "./app/component/footer/footer.component.js";

const configRouter = async () => {
    const view = new AppView();
    try {
        const router = new Router(APP_ROUTES, view.changeContent, '/404');
        await router.navigate(location.pathname);
    } catch (e) {
        view.changeContent(e.message);
    }
}

const initializeComponents = () => {
    new HeaderComponent().Init();
    new FooterComponent().Init();
}

const onLoad = async () => {
    configRouter();
    initializeComponents();
};


window.addEventListener('load', onLoad);