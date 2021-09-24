import styles from '../styles/ColorMenu.module.css'
import stylesCheck from '../styles/CheckBox.module.css'

function ColorMenu(){
    return (
        <div className = {styles.menu_color}>
            <ul className = {stylesCheck.check_list}>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="Amarelo"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>Amarelo</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="Azul"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>Azul</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="Branco"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>Branco</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="Cinza"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>Cinza</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="Laranja"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>Laranja</span>
                </label>
            </ul>
        </div>
    )
}

export default ColorMenu