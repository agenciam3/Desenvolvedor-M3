import { Component } from 'react';
import Price from './Price';
import './Prices.css'

class Prices extends Component {
    static choices={'50': false, '150':false,'300':false,'500':false,'>500':false}
    constructor(){
        super()
        this.state={
            choice: Prices.choices
        }
    }
    marker(e){        
        if (this.state.choice[parseInt(e.target.id)]!==true){
            Prices.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            Prices.choices[e.target.id]=true
            const novoEstado={
                choice: Prices.choices 
            }
            this.setState(novoEstado)
            this.forceUpdate()
        }else{
            Prices.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            const novoEstado={
                choice: Prices.choices 
            }
            this.setState(novoEstado)
        }  
    }
    render() { 
        return (
            <div id="prices">
                <h2>FAIXA DE PREÇO</h2>
                <Price marker={this.marker.bind(this)} marked={this.state.choice['50']} id='50' text='de R$0 até R$50'/>
                <Price marker={this.marker.bind(this)} marked={this.state.choice['150']} id='150' text='de R$51 até R$150'/>
                <Price marker={this.marker.bind(this)} marked={this.state.choice['300']} id='300' text='de R$151 até R$300'/>
                <Price marker={this.marker.bind(this)} marked={this.state.choice['500']} id='500' text='de R$301 até R$500'/>
                <Price marker={this.marker.bind(this)} marked={this.state.choice['>500']} id='>500' text='a partir de R$500'/>                
            </div>
        )
    }
}
 
export default Prices;