import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Routes from './routes'


function App() {
  return (
    <div className="App">

      <div className="divHeader">
        <Header />
      </div>

      <div className="divMain">
        <Routes />
      </div>

      <div className="divFooter">
        <Footer />
      </div>

    </div>
  );
}

export default App;
