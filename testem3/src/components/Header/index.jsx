import './styles.css'
import Logo from '../../imagens/logo-m3.png';
import { useState } from 'react';

const Header = ({ cart, setCart }) => {
    const [showCart, setShowCart] = useState(false)

    const handleDeleteItem = (product) => {
        let newArr = cart.filter((p) => product !== p)
        setCart(newArr)
    }

    return (
        <header className="header">
            <img className="logo" src={Logo} alt="logo" />
            <div>
                <img src="https://img.icons8.com/ios-filled/40/000000/shopping-bag.png" alt="icon-cart" className="bag-logo" onClick={() => setShowCart(oldBool => !oldBool)} />
                {cart.length !== 0 ? <span className="cart-length">{cart.length}</span> : <></>}
            </div>
            <div onClick={() => setShowCart(oldBool => !oldBool)}
                className={`modal-overlay ${showCart && "modal-overlay-opened"}`}>
            </div>



            <div className={`modal-cart ${showCart && "active"}`}>
                <table className="cart-table">
                    <tr>
                        <th className="table-th">Prévia</th>
                        <th className="table-th">Nome</th>
                        <th className="table-th">Tamanho</th>
                        <th className="table-th">Preço</th>
                        <th>&nbsp;</th>
                    </tr>
                    {cart.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className="table-td"><img alt="table-icon" src={item.img} className="img-table-product" /></td>
                                <td className="table-td">{item.name}</td>
                                <td className="table-td">{item.size}</td>
                                <td className="table-td">R${item.price}</td>
                                <td className="table-td"><button onClick={() => handleDeleteItem(item)} className="btn-delete">Excluir</button> </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </header >
    )
}

export default Header;