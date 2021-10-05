import React from 'react';
import img2 from '../../../layout/imagens/img_2.png';
import img3 from '../../../layout/imagens/img_3.png';
import img4 from '../../../layout/imagens/img_4.png';
import img5 from '../../../layout/imagens/img_5.png';
import img6 from '../../../layout/imagens/img_6.png';
import img7 from '../../../layout/imagens/img_7.png';
import img8 from '../../../layout/imagens/img_8.png';
import img9 from '../../../layout/imagens/img_9.png';
import img10 from '../../../layout/imagens/img_10.png';
import { BagCounterContext, useBagCounter } from '../../../providers/BagCounterContext';

const Card =  ({
    productId,
    productName,
    productColor,
    productSize,
    productPrice,
    productInstallments
})=> {
    var currentImg;

    const { counter, setCounter } = useBagCounter(BagCounterContext);
    
    const handleClick = () => {
        localStorage.setItem('counter', JSON.stringify(counter+1));
        setCounter(counter+1);
        console.log(counter);
    };
    switch (productId) {
        case 1:
          currentImg = img2
            break;
        case 2:
            currentImg = img3
            break;
        case 3:
            currentImg = img4
            break;
        case 4:
            currentImg = img5
            break;
        case 5:
            currentImg = img6
            break;
        case 6:
            currentImg = img7
            break;
        case 7:
            currentImg = img8
            break;
        case 8:
            currentImg = img9
            break;
        case 9:
            currentImg = img10
            break;
      }
    return (
        <div>
            <img src={currentImg} />
            <h2>{productName}</h2>
            <h2>R$ {productPrice.toFixed(2)}</h2>
            <p>até {productInstallments}x de R${(productPrice/productInstallments).toFixed(2)}</p>
            <button onClick={handleClick}>COMPRAR</button>
        </div>
    );
};
export default Card;