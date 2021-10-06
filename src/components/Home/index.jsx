import React from 'react';
import { HomeContainer, TitleContainer, MobileButtonsContainer, MobileFilterButton, MobileOrderButton } from './styles';
import  Filter  from './Filter';
import Shelf from './Shelf';
import Dropdown from './Shelf/Dropdown';
import { isMobile } from 'react-device-detect';
import { MobilePagesContext, useMobilePages } from '../../providers/MobilePagesContext';
const Home = () => {
    
    const { mobilePages , setMobilePages } = useMobilePages(MobilePagesContext);

    const desktopLayout = (
        <HomeContainer>
            <Filter />
            <Dropdown />
            <Shelf />
        </HomeContainer>
    );

    const handleClick = (e) => {
        console.log(e.target.value);
        if(e.target.value==="filter")
            setMobilePages([1,0]);
        
        else
            setMobilePages([0,1]);

        console.log(mobilePages);
    }

    const mobileLayout = (
        <HomeContainer>
            <TitleContainer>
                <h1>Blusas</h1>
            </TitleContainer>
            <MobileButtonsContainer>
                <MobileFilterButton value="filter" onClick={handleClick}>Filtrar</MobileFilterButton>
                <MobileOrderButton value="order" onClick={handleClick}><p>Ordenar</p></MobileOrderButton>
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