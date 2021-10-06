import React from 'react';
import { MainContainer, ColorContainer, SizeContainer, PriceContainer, TitleContainer, TitleTextContainer, TitleButtonContainer, ContentContainer }from './styles';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';
import PriceFilter from './PriceFilter'
import { isMobile } from "react-device-detect";
import { GoPlus } from 'react-icons/go';
import { BiMinus } from 'react-icons/bi';
const Filter = ({ colorIsOpen, setColorIsOpen, sizeIsOpen, setSizeIsOpen, priceIsOpen, setPriceIsOpen }) => {


    const handleClickColor = (e) => {
        setColorIsOpen(!colorIsOpen);
    }
    const handleClickSize = () => {
        setSizeIsOpen(!sizeIsOpen);
        
    }
    const handleClickPrice = (e) => {
        setPriceIsOpen(!priceIsOpen);
        
    }


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
        <MainContainer>
            { !colorIsOpen ?
                <ColorContainer>
                    <TitleContainer  onClick={handleClickColor}>
                        <TitleTextContainer>
                            <h2>CORES</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><GoPlus size={25}/></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                </ColorContainer>  
            : 
                <ColorContainer>
                    <TitleContainer onClick={handleClickColor}>
                        <TitleTextContainer>
                            <h2>CORES</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><GoPlus size={25}/></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                    <ContentContainer>
                        <ColorFilter />
                    </ContentContainer>           
                </ColorContainer>
            }

            { !sizeIsOpen ?
                <SizeContainer>
                    <TitleContainer  onClick={handleClickSize}>
                        <TitleTextContainer>
                            <h2>TAMANHOS</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><GoPlus size={25} /></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                </SizeContainer>
            :
                <SizeContainer>
                    <TitleContainer  onClick={handleClickSize}>
                        <TitleTextContainer>
                            <h2>TAMANHOS</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><BiMinus size={30} /></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                    <ContentContainer>
                        <SizeFilter />
                    </ContentContainer>
                </SizeContainer> 
            }
                    
                
            { priceIsOpen ?
                <PriceContainer>
                    <TitleContainer  onClick={handleClickPrice}>
                        <TitleTextContainer>
                            <h2>FAIXA DE PREÇO</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><BiMinus size={30} /></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                    <ContentContainer>
                        <PriceFilter />
                    </ContentContainer>
                </PriceContainer>
            :
                <PriceContainer>
                    <TitleContainer  onClick={handleClickPrice}>
                        <TitleTextContainer>
                            <h2>FAIXA DE PREÇO</h2>
                        </TitleTextContainer>
                        <TitleButtonContainer>
                            <button><GoPlus size={25} /></button>
                        </TitleButtonContainer>
                    </TitleContainer>
                </PriceContainer>
            }
        </MainContainer>
    );
    return (
        <>
        {isMobile ? mobileLayout : desktopLayout}
        </>
    );
}
 
export default Filter;