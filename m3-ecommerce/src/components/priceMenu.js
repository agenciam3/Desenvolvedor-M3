import styles from '../styles/ColorMenu.module.css'
import stylesCheck from '../styles/CheckBox.module.css'

function PriceMenu(){
    return (
        <div className = {styles.menu_price}>
            <ul className = {stylesCheck.check_list}>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="price1"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>de R$0 até R$50</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="price2"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>de R$51 até R$150</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="price3"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>de R$151 até R$300</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="price4"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>de R$301 até R$500</span>
                </label>
                <label className = {stylesCheck.check_item}>
                    <input className = {stylesCheck.check_item_input} type="checkbox" name="price5"/>
                    <span className = {stylesCheck.check_item_box}></span>
                    <span className = {stylesCheck.check_item_label}>a partir de R$ 01</span>
                </label>
            </ul>
        </div>
    )
}

export default PriceMenu