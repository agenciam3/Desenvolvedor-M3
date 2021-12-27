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
                <Order filtro={this.props.produtos}/>
                <Filters filtro={this.props.produtos}/>
                <Products cart={this.props.cart} produtos={this.props.produtos}/>                
            </main>
            
        
        )
    }
}

export default Main;