import { Component } from 'react';
import './Sizes.css'

class Sizes extends Component {
    static choices = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false
    }
    constructor(){
        super()
        this.state={
            choice: Sizes.choices
        }

    }
    marker(e){
        if (this.state.choice[parseInt(e.target.id)]!==true){
            Sizes.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            Sizes.choices[e.target.id]=true
            this.props.filtro.setSize(e.target.id);
            const novoEstado={
                choice: Sizes.choices 
            }
            this.setState(novoEstado)
            this.forceUpdate()
        }else{
            Sizes.choices = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false}
            const novoEstado={
                choice: Sizes.choices 
            }
            this.setState(novoEstado)
            this.props.filtro.resetFiltro()
        }  
    }
    render() { 
        return (
            <div id="sizes">
                <h2>TAMANHOS</h2>
                <div className="linha">
                    <div id={1} onClick={this.marker.bind(this)} className={this.state.choice[1] ? "sizes-options select": "sizes-options"}>
                        <div id='1' className="option">
                            P
                        </div>
                    </div>
                    <div id={2} onClick={this.marker.bind(this)} className={this.state.choice[2] ? "sizes-options select" : "sizes-options" }>
                        <div id='2' className="option">
                            M
                        </div>
                    </div>
                    <div id={3} onClick={this.marker.bind(this)} className={this.state.choice[3] ? "sizes-options select" : "sizes-options" }>
                        <div id='3' className="option">
                            G
                        </div>
                    </div>
                    <div id={4} onClick={this.marker.bind(this)} className={this.state.choice[4] ? "sizes-options select" : "sizes-options" }>
                        <div id='4' className="option">
                            GG
                        </div>
                    </div>
                </div>
                <div className="linha">
                <div id={5} onClick={this.marker.bind(this)} className={this.state.choice[5] ? "sizes-options select" : "sizes-options" }>
                        <div id='5' className="option">
                            U
                        </div>
                </div>
                <div id={6} onClick={this.marker.bind(this)} className={this.state.choice[6] ? "sizes-options select" : "sizes-options" }>
                        <div id='6' className="option">
                            36
                        </div>
                    </div>
                    <div id={7} onClick={this.marker.bind(this)} className={this.state.choice[7] ? "sizes-options select" : "sizes-options" }>
                        <div id='7' className="option">
                            38
                        </div>
                    </div>
                    <div id={8} onClick={this.marker.bind(this)} className={this.state.choice[8] ? "sizes-options select" : "sizes-options" }>
                        <div id='8' className="option">
                            40
                        </div>
                    </div>
                </div>
                <div className="linha">
                <div id={9} onClick={this.marker.bind(this)} className={this.state.choice[9] ? "sizes-options select" : "sizes-options" }>
                        <div id='9' className="option">
                            36
                        </div>
                    </div>
                    <div id={10} onClick={this.marker.bind(this)} className={this.state.choice[10] ? "sizes-options select" : "sizes-options" }>
                        <div id='10' className="option">
                            38
                        </div>
                    </div>
                    <div id={11} onClick={this.marker.bind(this)} className={this.state.choice[11] ? "sizes-options select" : "sizes-options" }>
                        <div id='11' className="option">
                            40
                        </div>
                    </div>            
                </div>
            </div>
            );
    }
}
 
export default Sizes;