import { AppView } from "./app-view.js";
import { Router } from "./router.js";
import APP_ROUTES from "./app-routes.js"

const onLoad = async () => {
    const view = new AppView();
    try {
        const router = new Router(APP_ROUTES, view.changeContent, '/404');
        await router.navigate(location.pathname);
    } catch (e) {
        view.changeContent(e.message);
    }
};

window.addEventListener('load', onLoad);