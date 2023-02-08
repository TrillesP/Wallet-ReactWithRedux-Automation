import React from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={ Login }/>
        <Route exact path='/wallet' component={ Wallet }/>
      </Switch>
    );
  }
  
}

export default App;
