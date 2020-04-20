import { HomeView } from "./home.view.js";
import { HomeService } from "./home.service.js";
import { HomeController } from "./home.controller.js"

console.log('Home works!');

const homeView = new HomeView();
const homeService = new HomeService();
const homeController = new HomeController(homeView, homeService);

homeController.Init();