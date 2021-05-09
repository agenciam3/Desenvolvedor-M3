import React from 'react';
import './App.css';
import Header from './components/header';
import ColorFilter from './components/colorFilter';
import SizeFilter from './components/sizeFilter';
import PriceFilter from './components/priceFilter';
import Footer from './components/footer';
import Clothes from './components/clothes';


function App() {
  return (
    <div className="App">

      <div className="divHeader">
       <Header />
      </div>

      <div className="row">
        <div className="column left">
          <div className="divFilter">
            <div className="divColorFilter">
            <ColorFilter/>
            </div>

            <div className="divSizeFilter">
            <SizeFilter/>
            </div>

            <div className="divPriceFilter">
            <PriceFilter/>
            </div>
          </div>
        </div>
        
        <div className="column right">
          <div className="divMain">
            <Clothes/>
          </div>
        </div>
        
      </div>

      <div className="divFooter">
       <Footer/>
      </div>

    </div>
  );
}

export default App;
