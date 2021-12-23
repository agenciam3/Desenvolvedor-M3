import { Component } from 'react';
import './Colors.css'
import ColorsOptions from './ColorsOptions'
import HiddenColorsOptions from './HiddenColorsOptions'

class Colors extends Component {

    constructor(){
        super()
        this.colors=['amarelo', 'azul','branco','cinza','laranja']
        this.colorsOcult=['Violeta']

        this.state={
            ocult: true
        }
    }
    moreColors(){
        const novoEstado={
            ocult: false
        }
        this.setState(novoEstado)
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
            <div>
                <h2>CORES</h2>
                <div id="colors">
                    {this.colors.map((color) => {
                        return (
                            <ColorsOptions color={color}/>
                        )
                        })
                    }
                    {this.colorsOcult.map((colorOcult) => {
                        return (
                            <HiddenColorsOptions color={colorOcult} ocult={this.state.ocult}/>
                        )
                        })
                    }
                    <div id="verTodos" className={this.state.ocult ? null : 'hidden'} onClick={this.moreColors.bind(this)}>
                        <span>
                        Ver todas as cores
                        </span>
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L4.5 6L8 1.00519" stroke="#666666" strokeLinecap="round"/>
                        </svg>              
                    </div>
                </div>
            </div>
            );
    }
}
 
export default Colors;