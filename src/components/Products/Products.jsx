import React, { Component } from 'react';
import imgProduct from '../../assets/img/img_2.png'
import "./Products.css"
class Products extends Component {
    render() { 
        return (
            <section id="products">
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
                <div className="product">
                    <img src={imgProduct} alt=""/>
                    <span className="product-title">
                    <span>CAMISETA MESCLA</span>
                    </span>
                    <span className="product-price">
                    <span>R$ 28,00</span>
                    </span>
                    <span className="product-parcel">
                    <span>até 3x de R$9,33</span>
                    </span>
                    <button id=""> 
                    COMPRAR
                    </button>
                </div>
            </section>
        );
    }
}
export default Products;