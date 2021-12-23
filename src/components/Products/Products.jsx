import React, { Component } from 'react';
import imgProduct from '../../assets/img/img_2.png'
import "./Products.css"



class Products extends Component {
    constructor(props){
        super(props)
    }
    render() {             
        return (            
            <section id="products">                
                {this.props.pr.map((objeto) => {
                    console.log(objeto)
                    return (
                        <Product objeto={objeto} addCart={this.props.addCart.bind(this)} />          
                    )})
                }  
                                      
            </section>
        );
    }
}
export default Products;

class Product extends Component {
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
                <button id="" onClick={this.props.addCart}> 
                COMPRAR
                </button>
            </div> 
            );
    }
}
 
