import { Component } from 'react';
import './Sizes.css'

class Sizes extends Component {
    choice(){
        const clsName="select"
    }
    render() { 
        return (
            <div id="sizes">
                <h2>TAMANHOS</h2>
                <div className="linha">
                    <div className="sizes-options">
                    <div className="option">
                        P
                    </div>
                    </div>
                    <div className="sizes-options ">
                    <div className="option">
                        M
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        G
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        GG
                    </div>
                    </div>
                </div>
                <div className="linha">
                    <div className="sizes-options">
                    <div className="option">
                        U
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        36
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        38
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        40
                    </div>
                    </div>
                </div>
                <div className="linha">
                    <div className="sizes-options">
                    <div className="option">
                        36
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        38
                    </div>
                    </div>
                    <div className="sizes-options">
                    <div className="option">
                        40
                    </div>
                    </div>            
                </div>
            </div>
            );
    }
}
 
export default Sizes;