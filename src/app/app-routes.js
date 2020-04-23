import { Route } from './route.js'
import environment from '../environment.js'
const root = environment.app;

const routes = [
    new Route(/^\/?$/, `${root}/component/home/home.component.html`, `./component/home/home.component.js`),
    new Route(/^\/404\/?$/, `${root}/404.html`)
];

export default routes;