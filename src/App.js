
import { Component } from 'react';
import './assets/App.css';

import Header from "./components/Header"
import Main from './components/Main';

import api from './services/api'

import Cart from './dados/Cart'
import Produtos from './dados/Produtos';

class App extends Component{
  
  constructor(){
    super();    
    this.cart = new Cart();
    this.produtos = new Produtos();
  }

  render(){
    return (
      <div className='container'>
        <Header 
          cart={this.cart}           
        />  
        <Main           
          cart={this.cart}        
          produtos={this.produtos}      
        />
      </div>
    )
  }
}

export default App;
