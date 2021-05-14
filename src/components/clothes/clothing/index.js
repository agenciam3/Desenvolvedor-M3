import React from 'react';
import SharedImg from '../../shared/shared-img'

const Clothing = (props) => {

    return (
        <div className="columns">
            <SharedImg img_url={props.img_url}/>
            <span>{props.name}</span>
            <span><strong>{`R$ ${props.price}`}</strong></span>
            <span>{props.installment}</span>
            <button className ="button">COMPRAR</button>
        </div>
    )
}

export default Clothing;