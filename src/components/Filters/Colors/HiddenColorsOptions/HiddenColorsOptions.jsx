import { Component } from 'react';
import '../ColorsOptions/ColorsOptions.css'

class MarkedSquare extends Component{
    render(){
        return(
            <span className={this.props.marked ? 'square-print' : null}></span>
        )
    }
}

class HiddenColorsOptions extends Component {

    render() { 
        return (
            <div className={this.props.ocult ? 'color-options ocult' : 'color-options'} onClick={this.props.marker.bind(this)}>
                <div id={this.props.color} className="square">
                    <MarkedSquare marked={this.props.marked} />
                </div>
                <div>{this.props.color}</div>
            </div>
            )
    }
}

export default HiddenColorsOptions;
