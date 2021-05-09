import React from 'react';
import GrayImg from '../../shared/gray-img'


const Clothing = (props) => {
    return (
        <div className="columns">
            <GrayImg img_url={props.img_url}/>
            <h4>{props.name}</h4>
            <p>{props.price}</p>
            <p>{props.installment}</p>
        </div>
    )
}

export default Clothing;