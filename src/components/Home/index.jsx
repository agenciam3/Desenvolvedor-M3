import React from 'react';
import { HomeContainer, TitleContainer, MobileButtonsContainer, MobileButton } from './styles';
import  Filter  from './Filter';
import Shelf from './Shelf';
import Dropdown from './Shelf/Dropdown';
import { isMobile } from 'react-device-detect';
const Home = () => {
    
    const desktopLayout = (
        <HomeContainer>
            <Filter />
            <Dropdown />
            <Shelf />
        </HomeContainer>
    );

    const mobileLayout = (
        <HomeContainer>
            <TitleContainer>
                <h1>Blusas</h1>
            </TitleContainer>
            <MobileButtonsContainer>
                <MobileButton><p>Filtrar</p></MobileButton>
                <MobileButton><p>Ordenar</p></MobileButton>
            </MobileButtonsContainer>
            <Shelf />
        </HomeContainer>
    );
    return ( 
        <>
            {isMobile ? mobileLayout : desktopLayout}
        </>
     );
}
 
export default Home;