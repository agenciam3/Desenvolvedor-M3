import React from 'react';
import LogoM3 from "../../layout/imagens/logo-m3.png";
import{ HeaderContainer } from "./styles"

//Components
import Logo from "./Logo";
import Bag from "./Bag";

const Header = () => {
    return (
        <HeaderContainer>
                <Logo logoSource={LogoM3} />
                <Bag />
        </HeaderContainer>
    )
}
 
export default Header;