import styles from '../styles/Header.module.css'
import { useState } from 'react';


function Header(){
    const [open,setOpen] = useState(false)

    return(
        <header className = {styles.menu}>
            <h1>Blusas</h1>
            <div className={styles.dropdown}>
                <button className={styles.dropdown_button} onClick = {() => setOpen(open => !open)}>
                    <h1>Organizar Por: </h1>
                </button>

                {open &&
                    <ul className = {styles.dropdown_list}>
                        <label className={styles.check_item} onClick = {()=>{setOpen(false)}}>Mais recentes
                            <input type="radio" name = "radio"/>
                        </label>

                        <label className={styles.check_item} onClick = {()=>{setOpen(false)}}>Menor Preço
                            <input type="radio" name = "radio"/>
                        </label>

                        <label className={styles.check_item} onClick = {()=>{setOpen(false)}}>Maior Preço
                            <input type="radio" name = "radio"/>
                        </label>
                    </ul>
                }
            </div>
        </header>
    )

}

export default Header