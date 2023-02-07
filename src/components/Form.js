import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component{






    render() {
        return (
            <div>
                <input data-testid="value-input" />
                <input data-testid="description-input" />
                <select data-testid="currency-input">
                    {}
                </select>
                <select data-testid="method-input">
                    <option value="money">Money</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="credit">Cartão de Crédito</option>
                    <option value="pix" selected>PIX</option>
                </select>
                <select data-testid="tag-input">
                    <option value="food" selected>Alimentação</option>
                    <option value="entertainment">Lazer</option>
                    <option value="health">Saúde</option>
                    <option value="work">Trabalho</option>
                    <option value="transport">Transporte</option>
                    <option value="other">Outros</option>
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    globalEmail: state.users.globalEmail
});

export default connect(mapStateToProps)(Form);