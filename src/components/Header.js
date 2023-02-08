import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component{
    render() {
        const { globalEmail, totalValue } = this.props;
        return (
            <div>
                <h1>Controle de gastos de:</h1>
                <h3 data-testid="email-header">
                    { globalEmail }
                </h3>
                <p data-testid="total-header">
                    { parseFloat(totalValue).toFixed(2) }
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