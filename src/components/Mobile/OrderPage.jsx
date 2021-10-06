import React from 'react';
import { Page, HeaderContainer, HeaderTitle, CloseButtonContainer, OrderContainer, OrderTitleContainer } from './styles';
import { RiCloseFill } from 'react-icons/ri';
import { MobilePagesContext, useMobilePages } from '../../providers/MobilePagesContext';
import { CardsOrdersContext, useCardsOrders } from '../../providers/CardsOrdersContext';

const OrderPage = () => {
    const { mobilePages, setMobilePages } = useMobilePages(MobilePagesContext);
    const { setCardsOrder } = useCardsOrders(CardsOrdersContext);

    const handleClose = () => {
        setMobilePages([0,0]);
    }

    const handleClickSelect = (e) => {
        const eTarget = e.target.value;
        console.log(e.target.value);
        if(eTarget==="orderId")
            setCardsOrder(eTarget);
        
        else if(eTarget==="orderDecreasingPrice")
            setCardsOrder(eTarget);
        
        else
            setCardsOrder(eTarget);

        handleClose();
    }
    return (
        <Page state={mobilePages[1]}>
            <HeaderContainer>
                <HeaderTitle>
                    <p>ORDENAR</p>
                </HeaderTitle>
                <CloseButtonContainer>
                    <button onClick={handleClose}><RiCloseFill size={30}/></button>
                </CloseButtonContainer>
            </HeaderContainer>
            <OrderContainer>
                <OrderTitleContainer  onClick={handleClickSelect} value="orderId">
                    Mais recentes
                </OrderTitleContainer>
                <OrderTitleContainer onClick={handleClickSelect}  value="orderDecreasingPrice" >
                    Menor Preço
                </OrderTitleContainer>
                <OrderTitleContainer  onClick={handleClickSelect} value="orderIncreasingPrice" >
                    Maior preço
                </OrderTitleContainer>
            </OrderContainer>
        </Page>
    );
}
 
export default OrderPage;