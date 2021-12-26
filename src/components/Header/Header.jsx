import { Component } from "react";
import "./Header.css"
import logoM3 from "./logo-m3.png"
import bag from "./bag.png"

class Header extends Component{
    constructor(){
        super();
        this.state={
            cart: {'unidades': 0}
        }
    }
    componentDidMount(){
        this.props.cart.inscrever(this._attCart.bind(this));        
    }
    componentWillUnmount(){        
        this.props.cart.desinscrever(this._attCart.bind(this));
    }
    _attCart(){
        this.setState({
            cart: {'unidades': this.props.cart.get()}
        })
    }
    render(){
        return(
            <header>
                <a href="/">
                    <img className="logo-m3" src={logoM3} alt=""/>
                </a>
                <div>
                    <img src={bag} alt=""/>
                    <span id="bag-counter" className={ this.state.cart.unidades!==0 ? null : 'hidden'}>
                        <p>{this.state.cart.unidades}</p>
                    </span>
                </div>
            </header>
        )
    }
}


export default Header;