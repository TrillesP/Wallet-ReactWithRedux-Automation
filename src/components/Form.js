import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component{
    state = {
        valueInput: '',
        descriptionInput: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        const {  } = this.state;
        dispatch(addTotal(email));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { valueInput } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    label="Valor: "
                    name="valueInput"
                    type="number"
                    placeholder="Digite um valor"
                    data-testid="value-input"
                    onChange={this.handleChange}
                />
                <input
                    label="Descrição: "
                    name="descriptionInput"
                    type="text"
                    placeholder="Descrição da sua despesa"
                    data-testid="description-input"
                    onChange={this.handleChange}
                />
                <select 
                    label="Conversão: "
                    name="currencyInput"
                    data-testid="currency-input"
                    onBlur={this.handleChange}
                >
                    {}
                </select>
                <select 
                    label="Forma de pagamento: "
                    name="methodInput"
                    data-testid="method-input"
                    onBlur={this.handleChange}
                >
                    <option value="money">Money</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="credit">Cartão de Crédito</option>
                    <option value="pix" selected>PIX</option>
                </select>
                <select
                    label="Tipo de despesa: "
                    name="tagInput"
                    data-testid="tag-input"
                    onBlur={this.handleChange}
                >
                    <option value="food" selected>Alimentação</option>
                    <option value="entertainment">Lazer</option>
                    <option value="health">Saúde</option>
                    <option value="work">Trabalho</option>
                    <option value="transport">Transporte</option>
                    <option value="other">Outros</option>
                </select>
                <button
                    type="submit"
                    disabled={ (valueInput)? null : 'disabled'}
                    value="Submit"
                >
                    Adicionar Despesa
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    globalEmail: state.users.globalEmail
});

export default connect(mapStateToProps)(Form);