import React from "react";
import { LogoContainer, LogoImage } from './styles';
const Logo = ({ logoSource }) => {
  return (
    <LogoContainer>
      <LogoImage src={logoSource} alt="Logo"  />
    </LogoContainer>
  );
};

export default Logo;