import { Component } from "react";
import Options from "./Options";
import "./Order.css"


class Order extends Component{
    constructor(){
        super();
      
        this.state={
          close: true
        }
    }
    openOptions(){ 
        if (this.state.close!==true){
            const novoEstado={
                close: true
            }
            this.setState(novoEstado)
        }else{
            const novoEstado={
                close: false
            }
            this.setState(novoEstado)
        }
    }
    closeOptions(){
        const novoEstado={
            close: true
        }
        this.setState(novoEstado)
    }
    render(){
        return(    
            <div id="d-order-options">
                <div onClick={this.openOptions.bind(this)} id="order">
                    <span id="order-span">Ordernar por:</span>
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 10L13 1.00935" stroke="#666666" strokeLinecap="round"/>
                    </svg>          
                </div>
                <Options close={this.state.close} closeOptions={this.closeOptions.bind(this)}/>
            </div>        
        )
    }
}

export default Order;