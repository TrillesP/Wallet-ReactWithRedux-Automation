import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component{
    render() {
        const { globalEmail, totalValue } = this.props;
        return (
            <div>
                <h2 data-testid="email-header">
                    { globalEmail }
                </h2>
                <p data-testid="total-header">
                    { totalValue }
                </p>
                <p data-testid="currency-header">BRL</p>
            </div> 
        );
    }
}

const mapStateToProps = (state) => ({
    globalEmail: state.users.globalEmail,
    totalValue: state.wallet.totalValue
});

export default connect(mapStateToProps)(Header);