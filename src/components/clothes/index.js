import React from 'react';
import Clothing from './clothing';

import  './style.css';



const Clothes = () => {
    return (
        <div className="rows">
            <Clothing   name="CAMISETA MESCLA"
                        price="R$ 28,00"
                        img_url="imagens/img_2.png"
                        installment="até 3x R$9,33"
            />
            <Clothing   name="SAIA EM COURO"
                        price="R$ 398,00"
                        img_url="imagens/img_3.png"
                        installment="até 5x R$30,00"
            />
            <Clothing   name="CARDIGAN TIGRE"
                        price="R$ 398,00"
                        img_url="imagens/img_4.png"
                        installment="até 5x R$40"
            />
            <Clothing   name="CARDIGAN OFF WHITE"
                        price="R$ 99,90"
                        img_url="imagens/img_5.png"
                        installment="até 3x R$70"
            />
            <Clothing   name="BODY LEOPARDO"
                        price="R$ 129,90"
                        img_url="imagens/img_6.png"
                        installment="até 3x R$9,33"
            />
            <Clothing   name="CASACO PELOS"
                        price="R$ 398,00"
                        img_url="imagens/img_7.png"
                        installment="até 5x R$40"
            />
            <Clothing   name="CROPPED STRIPES"
                        price="R$ 120,00"
                        img_url="imagens/img_8.png"
                        installment="até 3x R$9,33"
            />
            <Clothing   name="CAMISA TRANSPARENTE"
                        price="R$ 398,00"
                        img_url="imagens/img_9.png"
                        installment="até 3x R$9,33"
            />
            <Clothing   name="POCHETE CLUTCH"
                        price="R$ 99,00"
                        img_url="imagens/img_10.png"
                        installment="até 3x R$9,33"
            />

            <button >
                CARREGAR MAIS
            </button>
        </div>
    )
}

export default Clothes;