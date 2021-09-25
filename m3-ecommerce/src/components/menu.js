import styles from "../styles/Menu.module.css"

import ColorOptions from "./colorOptions"
import PriceOptions from "./priceOptions"

function Menu(){
    return(
        <div className = {styles.container}>
            <h4>Cores</h4>

            <ColorOptions/>

            <h4>Tamanhos</h4>
            <div className = {styles.menu_tamanhos}>
                <ul className = {styles.check_list}>

                </ul>
            </div>

            <h4>Faixa de Preço</h4>
            
            <PriceOptions/>


        </div>
    )
}

export default Menu