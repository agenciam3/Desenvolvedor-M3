import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SizeFilterProvider } from './providers/SizeFilterContext';
import { ColorFilterProvider } from './providers/ColorFilterContext';
import { PriceFilterProvider } from './providers/PriceFilterContext';
import { BagCounterProvider } from './providers/BagCounterContext';
import { CardsOrdersProvider } from './providers/CardsOrdersContext';

ReactDOM.render(
  <React.StrictMode>
    <BagCounterProvider>
    <ColorFilterProvider>
    <SizeFilterProvider>
    <PriceFilterProvider>
    <CardsOrdersProvider>
      <App />
    </CardsOrdersProvider>
    </PriceFilterProvider>
    </SizeFilterProvider>
    </ColorFilterProvider>
    </BagCounterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

