import { Component, useEffect, useState } from 'react';
import './Footer.css'

class Footer extends Component {    

    render() {       
        console.log(this.props.number)  
        return (            
            <div className={ this.props.number===9 ? 'footer' : 'footer move'}>
                <span>
                    M3: Implantação de E-commerce VTEX                 
                </span>                
            </div>
        );
    }
}
 
export default Footer;