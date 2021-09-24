import styles from '../styles/ProductsMenu.module.css'

import Menu from "./menu";
import ProductsList from './productsList';

function ProductsMenu(){
    return (
        <div className = {styles.container}>
            <Menu/>
            <ProductsList/>
        </div>
    )
}

export default ProductsMenu