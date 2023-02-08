import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, addTotal, addExpenses } from '../redux/actions';

class Form extends Component{
    state = {
        valueInput: '',
        descriptionInput: '',
        currencyInput: 'USD',
        methodInput: 'PIX',
        tagInput: 'Lazer',
        indexDespesa: 0,
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchAPI());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch, APIinfo } = this.props;
        const { indexDespesa, valueInput, descriptionInput, currencyInput, methodInput, tagInput } = this.state;
        const chosenCoin = APIinfo.find((e) => e.code === currencyInput)
        const cambio = valueInput*(+chosenCoin.ask)
        const despesa = {
            id: indexDespesa,
            value: valueInput,
            description: descriptionInput,
            currency: currencyInput,
            method: methodInput,
            tag: tagInput,
            exchangeRate: chosenCoin
        }
        dispatch(addExpenses(despesa));
        dispatch(addTotal(cambio));
        this.setState({
            indexDespesa: (indexDespesa+1)
        })
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
                    defaultValue="USD"
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
    APIcoins: state.wallet.APIcoins,
    APIinfo: state.wallet.APIinfo
});

export default connect(mapStateToProps)(Form);