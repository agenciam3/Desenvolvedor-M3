import { Component } from "react";
import "./Header.css"
import logoM3 from "./logo-m3.png"
import bag from "./bag.png"

class Header extends Component{

    render(){
        return(
            <header>
                <a href="/">
                    <img className="logo-m3" src={logoM3} alt=""/>
                </a>
                <div>
                    <img src={bag} alt=""/>
                    <span id="bag-counter" className={ this.props.cart ? null : 'hidden'}>
                        <p>{this.props.unidade}</p>
                    </span>
                </div>
            </header>
        )
    }
}


export default Header;