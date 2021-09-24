import styles from '../styles/Navbar.module.css'

import Logo from "../images/logo-m3.png"
import CartLogo from "../images/cart.png"

function NavBar(){

    return(
        <header className = {styles.navbar}>
            <div className = {styles.navbar_left}>
                <img src = {Logo} className = {styles.logo}></img>
            </div>
            
            <div className = {styles.navbar_center}>
                
            </div >

            <div className = {styles.navbar_right}>
                <img src = {CartLogo} className = "cart_logo"></img>
            </div>
            
        </header>
    )

}


export default NavBar;