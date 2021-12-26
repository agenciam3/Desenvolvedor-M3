import React, { Component } from 'react';
import imgProduct from '../../assets/img/img_2.png'
import "./Products.css"
import Produtos from '../../dados/Produtos';
import api from '../../services/api';


class Products extends Component {
    constructor(props){
        super(props)
        this.produtos=[]        
        this.state={
            produtos: this.produtos,            
        }
    }   
    async componentDidMount(){  
        const response =  await api.get('')
        this.produtos = response.data 
        this.setState({
            produtos: this.produtos,                
        })
        this.props.produtos.setProdutos(this.produtos)        
        this.props.produtos.inscrever(this._filtrar.bind(this));                                         
    }

    _filtrar(valor){        
        this.produtos=valor
         this.setState({
            produtos: this.produtos,                
        })
    }

    componentWillUnmount(){        
     
    }
    
    render() {             
        return (            
            <section id="products">                
                {this.state.produtos.map((objeto, index) => {                    
                    return (
                        <span key={index}>
                        <Product objeto={objeto} cart={this.props.cart} />   
                        </span>       
                    )})
                }  
                                      
            </section>
        );
    }
}
export default Products;

class Product extends Component {
    _addCart(){
        this.props.cart.add()        
    }
    render() { 
        return (
            <div className="product">
                <img src={imgProduct} alt=""/>
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
 
