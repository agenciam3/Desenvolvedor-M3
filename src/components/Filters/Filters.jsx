import { Component } from 'react';
import Colors from './Colors';
import "./Filters.css"
import Prices from './Prices';
import Sizes from './Sizes';

class Filters extends Component {
    render() { 
        return (
            <section id="filter">
                <Colors filtro={this.props.filtro}/>
                <Sizes filtro={this.props.filtro}/>
                <Prices filtro={this.props.filtro}/>
            </section>
        )
    }
}

export default Filters;