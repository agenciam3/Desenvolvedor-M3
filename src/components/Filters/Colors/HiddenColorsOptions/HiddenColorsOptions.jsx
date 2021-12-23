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
    constructor(){   
        super()     
        this.state={
            marked: false
        }
    }
    marker(e){
        if (this.state.marked!==true){
            const novoEstado={
                marked: true
            }
            this.setState(novoEstado)
        }else{
            const novoEstado={
                marked: false
            }
            this.setState(novoEstado)
        }
        
    }
    render() { 
        return (
            <div className={this.props.ocult ? 'color-options ocult' : 'color-options'} onClick={this.marker.bind(this)}>
                <div className="square">
                    <MarkedSquare marked={this.state.marked} />
                </div>
                <div>{this.props.color}</div>
            </div>
            )
    }
}

export default HiddenColorsOptions;
