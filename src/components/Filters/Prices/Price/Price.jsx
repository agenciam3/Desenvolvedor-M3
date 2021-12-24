import { Component } from 'react';
import './Price.css'

class MarkedSquare extends Component{
    render(){
        return(
            <span className={this.props.marked ? 'square-print' : null}></span>
        )
    }
}

class Price extends Component {
    render() { 
        return (
            <div className="prices-options">
                <div id={this.props.id} className="square" onClick={this.props.marker.bind(this)}>
                    <MarkedSquare marked={this.props.marked} />
                </div>
                <div>{this.props.text}</div>
            </div>
        )
    }
}
 
export default Price;
