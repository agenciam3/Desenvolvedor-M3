import React, { useState } from 'react';
import { ShelfContainer, CardContainer, LoadButton } from './styles';
import { products } from '../../../Products';
import Card from './Card';
import { SizeFilterContext, useSizeFilter } from '../../../providers/SizeFilterContext';
import { ColorFilterContext, useColorFilter } from '../../../providers/ColorFilterContext';
import { PriceFilterContext, usePriceFilter } from '../../../providers/PriceFilterContext';
import { CardsOrdersContext, useCardsOrders } from '../../../providers/CardsOrdersContext';

const Shelf = () => {
    const { sizes } = useSizeFilter(SizeFilterContext);
    const { colors } = useColorFilter(ColorFilterContext);
    const { prices } = usePriceFilter(PriceFilterContext);
    const {cardsOrder} = useCardsOrders(CardsOrdersContext);

    const pricesReference = [[0, 50],[51, 150],[151, 300],[301, 500],[1, 1000000]];
    
    const productsInJs = JSON.parse(products);

    const [isOpen, setIsOpen] = useState(false);
    

    function isTheRightPrice(value){
        var returnController = 0;
        parseInt(value);
        parseInt(prices); 
        prices.map( (price) => {
            if(value>=pricesReference[price][0]&&value<=pricesReference[price][1])
                returnController = 1;
        })
        return returnController;
    }

    const handleClickButton = () => {
        setIsOpen(!isOpen);
    }
    var loopController = 0;
    if(cardsOrder==="orderId"){
        productsInJs.sort((a,b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });
    }
    else if(cardsOrder==="orderIncreasingPrice"){
        productsInJs.sort((a,b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
        });
    }
    else{
        productsInJs.sort((a,b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
        });
    }

    return(
        <>
            {isOpen ?
                <ShelfContainer>
                    <CardContainer>
                        {productsInJs.map( (productInJs) => {
                            if((sizes.indexOf(productInJs.size)!==-1)&&(colors.indexOf(productInJs.color)!==-1)&&(isTheRightPrice(productInJs.price)===1)){
                                return (
                                    <Card className="card" key={productInJs.id} productId={productInJs.id} productName={productInJs.name} productColor={productInJs.color} productSize={productInJs.size} productPrice={productInJs.price} productInstallments={productInJs.installments} />
                                );
                            }
                            return(<></>);
                            
                        })}
                    </CardContainer>
                    <LoadButton onClick={handleClickButton}>CARREGAR MENOS</LoadButton>
                </ShelfContainer>
            : 
                <>
                <ShelfContainer>
                    <CardContainer>
                        {productsInJs.map( (productInJs) => {
                            if(loopController<6){
                                if((sizes.indexOf(productInJs.size)!==-1)&&(colors.indexOf(productInJs.color)!==-1)&&(isTheRightPrice(productInJs.price)===1)){
                                    loopController++
                                    return (
                                        <Card className="card" key={productInJs.id} productId={productInJs.id} productName={productInJs.name} productColor={productInJs.color} productSize={productInJs.size} productPrice={productInJs.price} productInstallments={productInJs.installments} />
                                    );
                                    
                                }
                            }
                            return(<></>);
                        })}
                    </CardContainer>
                    <LoadButton onClick={handleClickButton}>CARREGAR MAIS</LoadButton>
                </ShelfContainer>
                </>
            }
        </>
    );
    
}
 
export default Shelf;
