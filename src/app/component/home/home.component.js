import { HomeView } from "./home.view.js";
import { HomeService } from "./home.service.js";
import { HomeController } from "./home.controller.js"
import { CartService } from "../../shared/services/cart.service.js";

const homeController = new HomeController(
    new HomeView(),
    new HomeService(),
    CartService.getInstance()
);

homeController.Init();