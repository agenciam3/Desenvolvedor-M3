import React from 'react';
import LogoM3 from "../../layout/imagens/logo-m3.png";
import{ HeaderContainer, HeaderLoginRow, HeaderBagRow } from "./styles"

//Components
import Logo from "./Logo";
import Bag from "./Bag";

const Header = () => {
    return (
        <HeaderContainer>
                <HeaderLoginRow>
                    <Logo logoSource={LogoM3} />
                </HeaderLoginRow>
                <HeaderBagRow>
                    <Bag />
                </HeaderBagRow>
        </HeaderContainer>
    )
}
 
export default Header;