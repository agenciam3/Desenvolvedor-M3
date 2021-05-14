import React from 'react';



const Header = () => {
    return (
        <div>
            <a href="http://localhost:3000/"><img src="imagens/logo-m3.png" href="http://localhost:3000/" className="logo" alt=""/></a>
            <hr/>

            <div className="row">
                <div className= "column left">
                    <h2 className="blusa">Blusas</h2>
                </div>
                <div className= "column left" class="dropdown">
                    <button class="dropbtn">Ordenar por:</button>
                    <div class="dropdown-content">
                        <a href="http://localhost:3000/mostrecent">Mais recentes</a>
                        <a href="http://localhost:3000/lowestprice">Menor preço</a>
                        <a href="http://localhost:3000/biggestprice">Maior preço</a>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header;