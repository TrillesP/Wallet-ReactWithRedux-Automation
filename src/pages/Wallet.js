import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import Expenses from '../components/Expenses';

class Wallet extends Component{
    render() {
        return (
            <div>
                <Header />
                <Form />
                <Expenses />
            </div>
        );
    }
}

export default connect()(Wallet);