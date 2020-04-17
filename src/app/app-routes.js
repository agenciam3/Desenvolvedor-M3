import { Route } from './route.js'

const html = 'http://localhost';
const script = `.`; // Caminho relativo ao arquivo atual

const routes = [
    new Route(/^\/?$/, `${html}/component/teste/teste-component.html`, `${script}/component/teste/teste-component.js`),
    new Route(/^\/404\/?$/, `${html}/404.html`)
];

export default routes;