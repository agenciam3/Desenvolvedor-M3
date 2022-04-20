import React from 'react';
import './ListaDeProdutos.css';
import Button from '../Button/Button';
import Foto1 from 'img/img_1.png'
import Foto2 from 'img/img_2.png'
import Foto3 from 'img/img_3.png'

export default function LisdaDeProdutos() {
  return (
    <>
      <div className="container">
        <ul className='lista-de-produtos'>
          <li className='produto-1'>
            <img className='modelo-1' src={Foto1} alt="camiseta-mesclada" />
            <p className='nome-do-produto'>CAMISETA MESCLADA</p>
            <p className='preco'>R$ 28,00</p>
            <p className='parcelamento'>até 3x de R$9,33</p>
            <Button />
          </li>
          <li className='produto-2'>
            <img className='modelo-2' src={Foto2} alt="saia-de-couro" />
            <p className='nome-do-produto'>SAIA EM COURO</p>
            <p className='preco'>R$ 398,00</p>
            <p className='parcelamento'>até 10x de R$39,80</p>
            <Button />
          </li>
          <li className='produto-3'>
            <img className='modelo-3' src={Foto3} alt="cardigan-tigre" />
            <p className='nome-do-produto'>CARDIGAN TIGRE</p>
            <p className='preco'>R$ 398,00</p>
            <p className='parcelamento'>até 10x de R$39,80</p>
            <Button />
          </li>
        </ul>
      </div>
    </>
  )
}