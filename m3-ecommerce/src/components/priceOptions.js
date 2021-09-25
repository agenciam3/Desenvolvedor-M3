import styles from '../styles/CheckBox.module.css'

function PriceOptions(){
    return (
        <div className = {styles.menu_price}>
            <ul className = {styles.check_list}>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="price1"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>de R$0 até R$50</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="price2"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>de R$51 até R$150</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="price3"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>de R$151 até R$300</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="price4"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>de R$301 até R$500</span>
                </label>
                <label className = {styles.check_item}>
                    <input className = {styles.check_item_input} type="checkbox" name="price5"/>
                    <span className = {styles.check_item_box}></span>
                    <span className = {styles.check_item_label}>a partir de R$ 01</span>
                </label>
            </ul>
        </div>
    )
}

export default PriceOptions