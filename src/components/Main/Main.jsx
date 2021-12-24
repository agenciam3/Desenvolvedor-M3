import { Component } from "react";
import Filters from "../Filters";
import Order from "../Order";
import Products from "../Products";
import "./Main.css"



class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            products_l: []
        }
    }
    att(){
        if (this.props.product_list.length>0)
        {            
            const novoEstado={
                products_l: this.props.product_list
            }
            this.setState(novoEstado)        
        }else{
            this.props.getProducts()
        }
    }
    componentDidMount(){
        this.att()
    }
    render(){        
        return(            
            <main>
                <h1 className="title">
                    Blusas
                </h1>
                <Order/>
                <Filters filterColor={this.props.filterColor.bind(this)}/>
                <Products addCart={this.props.addCart.bind(this)} pr={this.state.products_l}/>                
            </main>
            
        
        )
    }
}

export default Main;