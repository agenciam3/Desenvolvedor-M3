import { Component } from "react";
import Filters from "../Filters";
import Order from "../Order";
import Products from "../Products";
import "./Main.css"



class Main extends Component{

    render(){
        return(
            <main>
                <h1 className="title">
                    Blusas
                </h1>
                <Order/>
                <Filters/>
                <Products/>
            </main>
        )
    }
}

export default Main;