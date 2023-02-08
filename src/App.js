import React from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <Routes>
        <Route exact path='/' component={ Login }/>
        <Route exact path='/wallet' component={ Wallet }/>
      </Routes>
    );
  }
  
}

export default connect()(App);
