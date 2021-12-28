import { Component } from 'react';
import Filtros from './Filtros/Filtros';
import './mobileFilter.css'

class MobileFilter extends Component {
    constructor(){
        super();      
        this.state={
          close: true
        }
    }
    closeOptions(){
        const novoEstado={
            close: true
        }
        this.setState(novoEstado)
    }

    _openMobileFilter(valor){        
        const novoEstado={
            close: valor
        }
        this.setState(novoEstado)
    }
    componentDidMount(){
        this.props.mobile.inscrever(this._openMobileFilter.bind(this));  
    }
    closeFilter(){
        this.props.mobile.closeFilter()
    }
    render(){         
        return (
            <div id='mobileFilter' className={ this.state.close ? 'hidden' : null}>
                <div className="title">
                    <span className="h2">FILTRAR</span>
                    <span id='closeFilter' onClick={this.closeFilter.bind(this)}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="25.2899" y2="-0.5" transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 1.23547)" stroke="black"/>
                        </svg>
                        <svg id='closeR' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 18.852L17.5547 1.00001" stroke="black"/>
                        </svg>
                    </span>
                </div>                
                <Filtros filtro={this.props.filtro} close={this.closeFilter.bind(this)}/>                           
            </div>
        );
    }
}


 
export default MobileFilter;