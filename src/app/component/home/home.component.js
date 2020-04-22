import { HomeView } from "./home.view.js";
import { HomeService } from "./home.service.js";
import { HomeController } from "./home.controller.js"
import { CartService } from "../../shared/services/cart.service.js";

const homeView = new HomeView();
const homeService = new HomeService();
const carrinhoService = CartService.getInstance();
const homeController = new HomeController(homeView, homeService, carrinhoService);

homeController.Init();