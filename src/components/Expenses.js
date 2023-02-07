import React, { Component } from 'react';
import { connect } from 'react-redux';

class Expenses extends Component{






    render() {
        const { globalEmail } = this.props;
        return (



            
        );
    }

}

const mapStateToProps = (state) => ({
    globalEmail: state.users.globalEmail
});

export default connect(mapStateToProps)(Expenses);