import { Route } from './route.js'

const root = 'http://localhost:3000/app';

const routes = [
    // new Route(/^\/?$/, `${root}/component/teste/teste-component.html`, `./component/teste/teste-component.js`),
    new Route(/^\/?$/, `${root}/component/home/home.component.html`, `./component/home/home.component.js`),
    new Route(/^\/404\/?$/, `${root}/404.html`)
];

export default routes;