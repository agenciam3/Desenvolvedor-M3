
import { Component } from 'react';
import './assets/App.css';

import Header from "./components/Header"
import Main from './components/Main';

import api from './services/api'

class App extends Component{
  
  constructor(){
    super();    
    this.state={
      cart: false,
      unidade: 0,
      product_list: []
    }
  }

  async componentDidMount(){
    const response =  await api.get('')
    const novoEstado={
      cart: this.state.cart,
      unidade: this.state.unidade,
      product_list: response.data
    }
    this.setState(novoEstado)
    console.log(this.state.product_list)
  }
  async getProducts(){
    const response =  await api.get('')

    const novoEstado={
      cart: this.state.cart,
      unidade: this.state.unidade,
      product_list: response.data
    }
    this.setState(novoEstado)
    console.log(this.state.product_list)
  }
  async filterColor(teste){
    // const list=[]
    // this.state.product_list.forEach(element => {
    //   if(element.color===teste){
    //     list.push(teste)
    //   }
    // });
    // const novoEstado={
    //   cart: this.state.cart,
    //    unidade: this.state.unidade,
    //    product_list: list
    // }
    // this.setState(novoEstado)          
    console.log('teste')
  }

  addCart(){
    const count=this.state.unidade+1
    const novoEvento={
      cart: true,
      unidade: count
    }
    this.setState(novoEvento)
  }

  


  
  render(){
    return (
      <div className='container'>
        <Header 
          cart={this.state.cart} 
          unidade={this.state.unidade}
        />  
        <Main 
          getProducts={this.getProducts.bind(this)} 
          addCart={this.addCart.bind(this)} 
          product_list={this.state.product_list}
          filterColor={this.filterColor.bind(this)}
        />
      </div>
    )
  }
}

export default App;
