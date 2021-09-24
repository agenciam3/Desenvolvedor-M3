import styles from "../styles/Menu.module.css"

import ColorMenu from "./colorMenu"
import PriceMenu from "./priceMenu"

function Menu(){
    return(
        <div className = {styles.container}>
            <h4>Cores</h4>

            <ColorMenu/>

            <h4>Tamanhos</h4>
            <div className = {styles.menu_tamanhos}>
                <ul className = {styles.check_list}>

                </ul>
            </div>

            <h4>Faixa de Preço</h4>
            
            <PriceMenu/>


        </div>
    )
}

export default Menu