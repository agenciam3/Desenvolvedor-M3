import { Component } from "react";
import Filters from "../Filters";
import MobileOrder from "../Mobile/Order/mobileOrder";
import MobileFilter from "../Mobile/Filter/mobileFilter";
import Order from "../Order";
import Products from "../Products";
import "./Main.css"
import DadosMobileOrder from '../../dados/DadosMobileOrder'
import DadosMobileFilter from '../../dados/DadosMobileFilter'
import Footer from '../Footer'

class Main extends Component{
    constructor(props){
        super(props)
        this.mobileOrder= new DadosMobileOrder();
        this.mobileFilter= new DadosMobileFilter();
    }
    render(){        
        return(            
            <main>
                <MobileOrder produtos={this.props.produtos} mobile={this.mobileOrder}/>
                <MobileFilter mobile={this.mobileFilter} filtro={this.props.produtos}/>
                <h1 className="title">
                    Blusas
                </h1>
                <div className="mobile">
                    <div onClick={this.mobileFilter.openFilter.bind(this.mobileFilter)}><span>Filtrar</span></div>
                    <div onClick={this.mobileOrder.openOrder.bind(this.mobileOrder)}><span>Ordenar</span></div>
                </div>                
                <Order produtos={this.props.produtos}/>
                <Filters filtro={this.props.produtos}/>
                <Products cart={this.props.cart} produtos={this.props.produtos}/>                    
            </main>                    
        )
    }
}

export default Main;