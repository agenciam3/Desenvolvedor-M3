import React from 'react'
import Logo from '../img/logo-m3.png'
import Contador from '../img/image 3.png'

export default function Header() {
  return (
    <>
      <div className="container">
        <div className="header">
          <img src={Logo} alt="logo" />
          <div className='icon'>
            <div className='contador'>
              <p>1</p>
              <img src={Contador} alt="contador" />
            </div>
          </div>
        </div>
        <div className='linha-vertical'></div>
      </div>
    </>
  )
}