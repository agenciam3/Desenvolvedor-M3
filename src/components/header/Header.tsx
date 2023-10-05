import React from "react";
import { useSearchContext } from "../../context/SearchContext";
import "../../sass/header.scss";

function Header() {
  const { bagCount } = useSearchContext();

  return (
    <header>  
      <div className="header-menu">
        <a href="https://m3ecommerce.com/">
          <img src="../imgs/logo-m3.png" alt="logo" />
        </a>
        <div className="bag">
          <img src="../imgs/bag-icon.png" alt="logo" />
          <div className="bolinha">
            <p id="compras">{bagCount}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;