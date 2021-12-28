import React, { Component } from 'react';

import img2 from '../../assets/img/img_2.png'
import img3 from '../../assets/img/img_3.png'
import img4 from '../../assets/img/img_4.png'
import img5 from '../../assets/img/img_5.png'
import img6 from '../../assets/img/img_6.png'
import img7 from '../../assets/img/img_7.png'
import img8 from '../../assets/img/img_8.png'
import img9 from '../../assets/img/img_9.png'
import img10 from '../../assets/img/img_10.png'
import "./Products.css"
import Produtos from '../../dados/Produtos';
import api from '../../services/api';
import Footer from '../Footer';


class Products extends Component {
    constructor(props){        
        super(props)
        this.number=9
        this.produtos=[]              
        this.state={
            produtos: this.produtos,  
            number: this.number,                 
        }
    }   
    async componentDidMount(){  
        const response =  await api.get('')
        this.produtos = response.data 
        this.setState({
            produtos: this.produtos,   
            number: this.number                
        })
        this.props.produtos.setProdutos(this.produtos)        
        this.props.produtos.inscrever(this._filtrar.bind(this));                                         
    }

    _filtrar(valor){        
        this.produtos=valor
         this.setState({
            produtos: this.produtos, 
            number: this.number               
        })
    }

    componentWillUnmount(){        
        "/img/img_2.png"
    }
    loadMore(){        
        this.number=14
        this.setState({
            produtos: this.produtos,                
            number: this.number
        })
    }
    render() {             
        return (  
            <span>          
            <section id="products">                
                {this.state.produtos.map((objeto, index) => {                    
                    if(index<this.number){
                        return (
                            <span key={index}>
                            <Product objeto={objeto} cart={this.props.cart} />                         
                            </span>       
                        )}
                    }, this)
                    
                }  
            </section>
                <button onClick={this.loadMore.bind(this)} id='comprar' className={ this.number===9 ? null : 'hidden'}>CARREGAR MAIS</button>
                <Footer number={this.number}/>   
            </span>
                                      
            
        );
    }
}
export default Products;

class Product extends Component {
    static fotos=[img2,img3,img4,img5,img6,img7,img8,img9, img10]
    _addCart(){
        this.props.cart.add()        
    }
    render() { 
        return (
            <div className="product">
                <img src={Product.fotos[parseInt(this.props.objeto.id)-1]} alt=""/>
                <span className="product-title">
                <span>{this.props.objeto.name}</span>
                </span>
                <span className="product-price">
                <span>R$ {this.props.objeto.price.toFixed(2).replace('.', ",")}</span>
                </span>
                <span className="product-parcel">
                <span>até {this.props.objeto.parcelamento[0]}x de R${this.props.objeto.parcelamento[1].toFixed(2).replace('.', ",")}</span>
                </span>
                <button id="" onClick={this._addCart.bind(this)}> 
                COMPRAR
                </button>                                             
            </div> 
            );
    }
}
 
