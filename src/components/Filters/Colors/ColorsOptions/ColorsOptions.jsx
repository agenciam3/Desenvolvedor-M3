import { Component } from 'react';
import './ColorsOptions.css'

class MarkedSquare extends Component{
    render(){
        return(
            <span className={this.props.marked ? 'square-print' : null}></span>
        )
    }
}

class ColorsOptions extends Component {
    static choice = [false, false, false, false, false];

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
            this.props.filterColor(e.target.id)
        }else{
            const novoEstado={
                marked: false
            }
            this.setState(novoEstado)
        }  
    }
    render() { 
        return (
            
            <div className="color-options">

                <div id={this.props.color} className="square" onClick={this.marker.bind(this)}>
                    <MarkedSquare marked={this.state.marked} />
                </div>
                <div>{this.props.color}</div>
            </div>
            )
    }
}

 
export default ColorsOptions;
