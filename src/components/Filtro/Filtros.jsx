import React from 'react';
import './ListaDeProdutos.css';
import CheckBox from '../CheckBox/CheckBoxCores';

export default function Filtros() {
  return (
    <>
      <div className="container">
        <div className="filtro-de-cores">
          <h2>Cores</h2>
          <lu className="color-field">
            <CheckBox />
          </lu>
        </div>
        <div className="filtro-de-tamanho"></div>
        <div className="filtro-de-preco"></div>
      </div>
    </>
  )
}