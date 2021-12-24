import { Component } from 'react';
import './ColorsOptions.css'

class MarkedSquare extends Component{
    render(){
        return(
            <span className={this.props.marked ? 'square-print' : null}></span>
        )
    }
}
 export default MarkedSquare