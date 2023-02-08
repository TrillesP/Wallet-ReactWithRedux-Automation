import React, { Component } from 'react';
import { connect } from 'react-redux';

class Expenses extends Component{






    render() {
        const { cambioG, infoCambio } = this.props;
        return (



            
        );
    }

}

const mapStateToProps = (state) => ({
    infoCambio: state.wallet.infoCambio,
    cambioG: state.wallet.cambioG
});

export default connect(mapStateToProps)(Expenses);