import React from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Login }/>
          <Route exact path='/wallet' component={ Wallet }/>
        </Switch>
      </BrowserRouter>
    );
  }
  
}

export default App;
