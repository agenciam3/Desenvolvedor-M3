import { Component } from 'react';
import './mobileOrder.css'

class Options extends Component {
    order(e){        
        this.props.produtos.setOrder(e.target.innerHTML)
        this.props.mobile.closeOrder()
    }
    render() {
        return (
            <div id="options" className={ this.props.close ? 'hidden' : null}>
                <span onClick={this.order.bind(this)}>Mais recentes</span>
                <span onClick={this.order.bind(this)}>Menor preço</span>
                <span onClick={this.order.bind(this)}>Maior preço</span>
            </div>
        )
    }
}
class MobileOrder extends Component {
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

    _openMobileOrder(valor){        
        const novoEstado={
            close: valor
        }
        this.setState(novoEstado)
    }
    componentDidMount(){
        this.props.mobile.inscrever(this._openMobileOrder.bind(this));  
    }
    closeOrder(){
        this.props.mobile.closeOrder()
    }
    render() { 
        console.log(this.state.close)
        return (
            <div id='mobileOrder' className={ this.state.close ? 'hidden' : null}>
                <div className="title">
                    <span className="h2">ORDENAR</span>
                    <span id='closeOrder' onClick={this.closeOrder.bind(this)}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="25.2899" y2="-0.5" transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 1.23547)" stroke="black"/>
                        </svg>
                        <svg id='closeR' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 18.852L17.5547 1.00001" stroke="black"/>
                        </svg>
                    </span>
                </div>
                <div className="options">
                    <Options produtos={this.props.produtos} close={false} mobile={this.props.mobile} />
                </div>
            </div>
        );
    }
}


 
export default MobileOrder;