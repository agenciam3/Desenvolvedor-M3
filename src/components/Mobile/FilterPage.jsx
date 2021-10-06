import React, { useState } from 'react';
import { MobilePagesContext, useMobilePages } from '../../providers/MobilePagesContext';
import Filter from '../Home/Filter';
import { Page, HeaderContainer, HeaderTitle, CloseButtonContainer, FinalButtonsContainer, ApplyButton, ClearButton } from './styles';
import { RiCloseFill } from 'react-icons/ri';
import { ColorFilterContext, useColorFilter } from '../../providers/ColorFilterContext';
import { PriceFilterContext, usePriceFilter } from '../../providers/PriceFilterContext';
import { SizeFilterContext, useSizeFilter } from '../../providers/SizeFilterContext';
const FilterPage= () => {
    const { mobilePages,  setMobilePages } = useMobilePages(MobilePagesContext);

    const { setColors} = useColorFilter(ColorFilterContext);
    const { setPrices } = usePriceFilter(PriceFilterContext);
    const { setSizes } = useSizeFilter(SizeFilterContext);

    const saveInitialColors = ["Amarelo","Azul","Branco","Cinza","Laranja","Verde","Vermelho","Preto","Rosa","Vinho"];
    const saveInitialPrices = ["0","1","2","3","4"];
    const saveInitialSizes = ["P","M","G","GG","U","36","38","40","42","44","46"];

    const [colorIsOpen, setColorIsOpen] = useState(false);
    const [sizeIsOpen, setSizeIsOpen] = useState(false);
    const [priceIsOpen, setPriceIsOpen] = useState(false);

    const handleClose = () => {
        setMobilePages([0,0]);
    }

    const handleClear = () => {
        setColors(saveInitialColors);
        setSizes(saveInitialSizes);
        setPrices(saveInitialPrices);
        handleClose();
    }

    return (
        <Page state={mobilePages[0]}>
            <HeaderContainer>
                <HeaderTitle>
                    <p>FILTRAR</p>
                </HeaderTitle>
                <CloseButtonContainer>
                    <button onClick={handleClose}><RiCloseFill size={30}/></button>
                </CloseButtonContainer>
            </HeaderContainer>
            <Filter colorIsOpen={colorIsOpen}  setColorIsOpen={setColorIsOpen} sizeIsOpen={sizeIsOpen} setSizeIsOpen={setSizeIsOpen} priceIsOpen={priceIsOpen} setPriceIsOpen={setPriceIsOpen}/>
            <FinalButtonsContainer colorIsOpen={colorIsOpen} sizeIsOpen={sizeIsOpen} priceIsOpen={priceIsOpen}>
                <ApplyButton onClick={handleClose}>APLICAR</ApplyButton>
                <ClearButton onClick={handleClear}>LIMPAR</ClearButton>
            </FinalButtonsContainer>
        </Page>
    );
}
 
export default FilterPage