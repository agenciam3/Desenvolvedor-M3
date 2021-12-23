import { Component } from 'react';
import Colors from './Colors';
import "./Filters.css"
import Sizes from './Sizes';

class Filters extends Component {
    render() { 
        return (
            <section id="filter">
                <Colors/>
               <Sizes/>
                <div id="prices">
                <h2>FAIXA DE PREÇO</h2>
                <div className="prices-options">
                    <div className="square"></div>
                    <div>de R$0 até R$50</div>
                </div>
                <div className="prices-options">
                    <div className="square"></div>
                    <div>de R$51 até R$150</div>
                </div>
                <div className="prices-options">
                    <div className="square"></div>
                    <div>de R$151 até R$300</div>
                </div>
                <div className="prices-options">
                    <div className="square"></div>
                    <div>de R$301 até R$500</div>
                </div>
                <div className="prices-options">
                    <div className="square"></div>
                    <div>a partir de R$500</div>
                </div>
                </div>
            </section>
        )
    }
}

export default Filters;