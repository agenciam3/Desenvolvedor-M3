import React from 'react';
import './CheckBoxCores.css';

export default function CheckBoxCores() {
  return (
    <>
      <div className="container">
        <lu className="checkBox">
          <li className='amarelo'>
            <input type="checkbox" name="amarelo" value="Amarelo" />
            <label> Amarelo </label>
          </li>
          <li>
            <input type="checkbox" name="azul" value="Azul" />
            <label> Azul </label>
          </li>
          <li>
            <input type="checkbox" name="branco" value="Branco" />
            <label> Branco </label>
          </li>
          <li>
            <input type="checkbox" name="cinza" value="Cinza" />
            <label> Cinza </label>
          </li>
          <li>
            <input type="checkbox" name="laranja" value="Laranja" />
            <label> Laranja </label>
          </li>
          <div className="ver-todas">
            <p>Vector</p>
            <p>Ver todas as cores</p>
          </div>
        </lu>
      </div>
    </>
  )
}