import React from "react";
import { FaShoppingBag } from 'react-icons/fa';
import { BagCounterContext, useBagCounter } from "../../../providers/BagCounterContext";
import { BagContainer, BagCounter} from "./styles";

const Bag = () => {
    const { counter } = useBagCounter(BagCounterContext);
    return (
            <BagContainer>
                <FaShoppingBag size={30} className="icon"></FaShoppingBag> 
                <BagCounter>{counter}</BagCounter>
            </BagContainer>
    );
};
 
export default Bag;