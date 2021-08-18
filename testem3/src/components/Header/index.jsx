import './styles.css'
import Logo from '../../imagens/logo-m3.png';

const Header = ({ cart }) => {
    return (
        <header className="header">
            <img className="logo" src={Logo} />
            <div>
                <img src="https://img.icons8.com/ios-filled/40/000000/shopping-bag.png" className="bag-logo" />
                {cart.length != 0 ? <span className="cart-length">{cart.length}</span> : <></>}
            </div>
        </header>
    )
}

export default Header;