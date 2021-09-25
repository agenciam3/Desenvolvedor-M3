import styles from '../styles/CheckBox.module.css'

function ColorOptions(){
    return (
        <div className = {styles.menu_color}>
            <ul className = {styles.check_list}>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="Amarelo"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>Amarelo</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="Azul"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>Azul</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="Branco"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>Branco</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="Cinza"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>Cinza</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="Laranja"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>Laranja</span>
                </label>
            </ul>
        </div>
    )
}

export default ColorOptions