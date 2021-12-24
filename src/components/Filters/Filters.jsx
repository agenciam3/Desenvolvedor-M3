import { Component } from 'react';
import Colors from './Colors';
import "./Filters.css"
import Prices from './Prices';
import Sizes from './Sizes';

class Filters extends Component {
    render() { 
        return (
            <section id="filter">
                <Colors/>
                <Sizes/>
                <Prices/>
            </section>
        )
    }
}

export default Filters;