import { Component } from 'react';
import './Filtros.css'
import Colors from '../../../Filters/Colors';
import Sizes from '../../../Filters/Sizes';
import Prices from '../../../Filters/Prices';
import MarkedSquare from '../../../Filters/Colors/ColorsOptions/ColorsOptions';
import Price from '../../../Filters/Prices/Price';

class Filtros extends Component {
    static open ={1: false, 2: false, 3: false}    
    constructor(){
        super()        
        this.state={     
            open: Filtros.open,
            choiceColor: Colors.choices,
            choiceSize: Sizes.choices,
            choicePrice: Prices.choices
        }
    }
    openOptions(e){                      
        if (this.state.open[parseInt(e.target.id)]===false){
            Filtros.open[parseInt(e.target.id)]=true            
            this.setState({
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            })
        }else{
            Filtros.open[parseInt(e.target.id)]=false            
            this.setState({
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices

            })
        }
    }
    markerColor(e){        
        if (this.state.choiceColor[e.target.id]===false && e.target.className==='square'){
            Colors.choices = {'amarelo': false, 'azul': false, 'branco': false,'cinza': false, 'laranja': false, 'verde': false, 'vermelho': false, 'preto': false, 'rosa': false, 'vinho': false};
            Colors.choices[e.target.id]=true
            this.props.filtro.setColor(e.target.id)            
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }
            this.setState(novoEstado)
        }else{            
            Colors.choices = {'amarelo': false, 'azul': false, 'branco': false,'cinza': false, 'laranja': false, 'verde': false, 'vermelho': false, 'preto': false, 'rosa': false, 'vinho': false};
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }
            this.setState(novoEstado)            
            this.props.filtro.setColor('')            
        }  
    }
    markerSize(e){        
        if (this.state.choiceSize[parseInt(e.target.id)]!==true){
            Sizes.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            Sizes.choices[e.target.id]=true
            this.props.filtro.setSize(e.target.id);                        
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }
            this.setState(novoEstado)            
        }else{
            Sizes.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }
            this.setState(novoEstado)
            this.props.filtro.setSize(0);                        
        }  
    }
    markerPrice(e){                      
        if (this.state.choicePrice[e.target.id]===false){
            Prices.choices = {'50': false, '150':false,'300':false,'500':false,'>500':false}
            Prices.choices[e.target.id]=true
            this.props.filtro.setPrice(e.target.id)            
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }
            this.setState(novoEstado)                        
        }else{              
            Prices.choices = {'50': false, '150':false,'300':false,'500':false,'>500':false}
            this.props.filtro.setPrice('')            
            const novoEstado={
                open: Filtros.open,
                choiceColor: Colors.choices,
                choiceSize: Sizes.choices,
                choicePrice: Prices.choices
            }                        
            this.setState(novoEstado)                        
        }  
    }
    aplicar(){
        this.props.filtro.filtrar()
        this.props.close()
    }
    limpar(){
        Colors.choices = {'amarelo': false, 'azul': false, 'branco': false,'cinza': false, 'laranja': false, 'verde': false, 'vermelho': false, 'preto': false, 'rosa': false, 'vinho': false};
        Sizes.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
        Prices.choices = {'50': false, '150':false,'300':false,'500':false,'>500':false}
        this.props.filtro.setColor('')    
        this.props.filtro.setSize('0')    
        this.props.filtro.setPrice('') 
        const novoEstado={
            open: Filtros.open,
            choiceColor: Colors.choices,
            choiceSize: Sizes.choices,
            choicePrice: Prices.choices
        }                        
        
        this.setState(novoEstado)   
    }
    render() {
        return (               
            <div id='mfilter'>
                <div id='1' className='mainTitle' onClick={this.openOptions.bind(this)}>
                    <span id='01'>CORES</span>
                    <svg className={this.state.open[1] ? 'rotate' : null} id='001' width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id='0001' d="M1 1L10 14L19 1.0135" stroke="#666666" strokeLinecap="round"/>
                    </svg>                    
                </div>
                <div id="cores" className={this.state.open[1] ? null : 'hidden'}>
                    <div id="colors">
                        <div className="color-options">
                            <div id='amarelo' className="square" onClick={this.markerColor.bind(this)}>
                                <MarkedSquare marked={this.state.choiceColor.amarelo}  />
                            </div>
                            <div>Amarelo</div>
                        </div>
                        <div className="color-options">
                        <div id='azul' className="square" onClick={this.markerColor.bind(this)}>
                            <MarkedSquare marked={this.state.choiceColor.azul}  />
                        </div>
                            <div>Azul</div>
                        </div>
                        <div className="color-options">
                                <div id='branco' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.branco}  />
                                </div>
                            <div>Branco</div>
                        </div>
                        <div className="color-options">
                                <div id='cinza' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.cinza}  />
                                </div>
                            <div>Cinza</div>
                        </div>
                        <div className="color-options">
                                <div id='laranja' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.laranja}  />
                                </div>
                            <div>Laranja</div>
                        </div>
                        <div className="color-options">
                                <div id='verde' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.verde}/>
                                </div>
                            <div>Verde</div>
                        </div>
                        <div className="color-options">
                                <div id='vermelho' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.vermelho}  />
                                </div>
                            <div>Vermelho</div>
                        </div>
                        <div className="color-options">
                                <div id='preto' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.preto}  />
                                </div>
                            <div>Preto</div>
                        </div>
                        <div className="color-options">
                                <div id='rosa' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.rosa}  />
                                </div>
                            <div>Rosa</div>
                        </div>
                        <div className="color-options">
                                <div id='vinho' className="square" onClick={this.markerColor.bind(this)}>
                                    <MarkedSquare marked={this.state.choiceColor.vinho}  />
                                </div>
                            <div>Vinho</div>
                        </div>
                    </div>                            
                </div>
                <div id='2' className='mainTitle' onClick={this.openOptions.bind(this)}>
                    <span id='02'>Tamanhos</span>
                    <svg className={this.state.open[2] ? 'rotate' : null} id='002' width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id='0002' d="M1 1L10 14L19 1.0135" stroke="#666666" strokeLinecap="round"/>
                    </svg>                    
                </div>
                <div id="tamanhos" className={this.state.open[2] ? null : 'hidden'}>
                <div className="linha">
                    <div id={1} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[1] ? "sizes-options select": "sizes-options"}>
                        <div id='1' className="option">
                            P
                        </div>
                    </div>
                    <div id={2} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[2] ? "sizes-options select" : "sizes-options" }>
                        <div id='2' className="option">
                            M
                        </div>
                    </div>
                    <div id={3} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[3] ? "sizes-options select" : "sizes-options" }>
                        <div id='3' className="option">
                            G
                        </div>
                    </div>
                    <div id={4} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[4] ? "sizes-options select" : "sizes-options" }>
                        <div id='4' className="option">
                            GG
                        </div>
                    </div>
                </div>
                <div className="linha">
                <div id={5} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[5] ? "sizes-options select" : "sizes-options" }>
                        <div id='5' className="option">
                            U
                        </div>
                </div>
                <div id={6} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[6] ? "sizes-options select" : "sizes-options" }>
                        <div id='6' className="option">
                            36
                        </div>
                    </div>
                    <div id={7} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[7] ? "sizes-options select" : "sizes-options" }>
                        <div id='7' className="option">
                            38
                        </div>
                    </div>
                    <div id={8} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[8] ? "sizes-options select" : "sizes-options" }>
                        <div id='8' className="option">
                            40
                        </div>
                    </div>
                </div>
                <div className="linha">
                <div id={9} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[9] ? "sizes-options select" : "sizes-options" }>
                        <div id='9' className="option">
                            36
                        </div>
                    </div>
                    <div id={10} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[10] ? "sizes-options select" : "sizes-options" }>
                        <div id='10' className="option">
                            38
                        </div>
                    </div>
                    <div id={11} onClick={this.markerSize.bind(this)} className={this.state.choiceSize[11] ? "sizes-options select" : "sizes-options" }>
                        <div id='11' className="option">
                            40
                        </div>
                    </div>            
                </div>
                </div>
                <div id='3' className='mainTitle' onClick={this.openOptions.bind(this)}>
                    <span id='03'>FAixa de Preço</span>
                    <svg className={this.state.open[3] ? 'rotate' : null} id='003' width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id='0003' d="M1 1L10 14L19 1.0135" stroke="#666666" strokeLinecap="round"/>
                    </svg>                    
                </div>
                <div id="precos" className={this.state.open[3] ? null : 'hidden'}>
                    <div id="prices">                
                        <Price marker={this.markerPrice.bind(this)} marked={this.state.choicePrice['50']} id='50' text='de R$0 até R$50'/>
                        <Price marker={this.markerPrice.bind(this)} marked={this.state.choicePrice['150']} id='150' text='de R$51 até R$150'/>
                        <Price marker={this.markerPrice.bind(this)} marked={this.state.choicePrice['300']} id='300' text='de R$151 até R$300'/>
                        <Price marker={this.markerPrice.bind(this)} marked={this.state.choicePrice['500']} id='500' text='de R$301 até R$500'/>
                        <Price marker={this.markerPrice.bind(this)} marked={this.state.choicePrice['>500']} id='>500' text='a partir de R$500'/>                
                    </div>
                </div>
                <div className="secButtons">
                    <span>
                    <button className='aplicar' onClick={this.aplicar.bind(this)}>
                        <span onClick={this.aplicar.bind(this)}>APLICAR</span>
                    </button>
                    <button onClick={this.limpar.bind(this)}>
                        <span>Limpar</span>
                    </button>
                    </span>
                </div>
            </div>
        )
    }
}

export default Filtros