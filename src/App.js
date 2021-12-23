
import { Component } from 'react';
import './assets/App.css';

import Header from "./components/Header"
import Main from './components/Main';

class App extends Component{


  render(){
    return (
      <div className='container'>
        <Header/>  
        <Main/>
      </div>
    )
  }
}

export default App;
