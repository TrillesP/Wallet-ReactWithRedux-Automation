import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class Form extends Component{
    state = {
        valueInput: '',
        descriptionInput: '',
        currencyInput: 'USD',
        methodInput: 'PIX',
        tagInput: 'Lazer'
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchAPI());
    }

    handleSubmit = (event) => {
        // event.preventDefault();
        // const { dispatch } = this.props;
        // const { valueInput } = this.state;
        // valueInput
        // dispatch(addTotal(email));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { valueInput } = this.state;
        const { APIcoins } = this.props;
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
                    defaultValue=""
                    name="currencyInput"
                    data-testid="currency-input"
                    onBlur={this.handleChange}
                >
                    { APIcoins.map((coin, index) => (
                        <option key={index}>{coin}</option>
                    ))}
                </select>
                <select 
                    label="Forma de pagamento: "
                    defaultValue="PIX"
                    name="methodInput"
                    data-testid="method-input"
                    onBlur={this.handleChange}
                >
                    <option>Money</option>
                    <option>Cartão de Débito</option>
                    <option>Cartão de Crédito</option>
                    <option>PIX</option>
                </select>
                <select
                    label="Tipo de despesa: "
                    defaultValue="Lazer"
                    name="tagInput"
                    data-testid="tag-input"
                    onBlur={this.handleChange}
                >
                    <option>Alimentação</option>
                    <option>Lazer</option>
                    <option>Saúde</option>
                    <option>Trabalho</option>
                    <option>Transporte</option>
                    <option>Outros</option>
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
    APIcoins: state.wallet.APIcoins
});

export default connect(mapStateToProps)(Form);