import React from 'react';
import  './style.css';

const SharedImg = (props) => {
    return (
        <img className="shared-img" src={props.img_url} alt=""></img>
    )
}

export default SharedImg;