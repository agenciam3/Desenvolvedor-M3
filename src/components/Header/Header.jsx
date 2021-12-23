import { Component } from "react";
import "./Header.css"
import logoM3 from "./logo-m3.png"
import bag from "./bag.png"

class Header extends Component{

    render(){
        return(
            <header>
                <img className="logo-m3" src={logoM3} alt=""/>
                <div>
                    <img src={bag} alt=""/>
                    <span id="bag-counter">
                        <p>0</p>
                    </span>
                </div>
            </header>
        )
    }
}


export default Header;