import React from 'react';
import { MainContainer, ColorContainer, SizeContainer, PriceContainer }from './styles';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';
import PriceFilter from './PriceFilter'
import { isMobile } from "react-device-detect";
import { HomeContainer } from '../styles';
const Filter = () => {
    console.log(isMobile);

    const desktopLayout = (
        <MainContainer>
            <h1 className="title">Blusas</h1>
            <ColorContainer>
                <h2 className="subtitle">CORES</h2>
                <ColorFilter />            
            </ColorContainer>
            <SizeContainer>
                <h2 className="subtitle">TAMANHOS</h2>
                <SizeFilter />
            </SizeContainer>
            <PriceContainer>
                <h2 className="subtitle">FAIXA DE PREÇO</h2>
                <PriceFilter />
            </PriceContainer>
        </MainContainer>
    );
    const mobileLayout = (
        <></>
    );
    return (
        <>
        {isMobile ? mobileLayout : desktopLayout}
        </>
    );
}
 
export default Filter;