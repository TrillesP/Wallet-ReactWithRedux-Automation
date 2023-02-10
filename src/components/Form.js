import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, addTotal, addExpenses } from '../redux/actions';

class Form extends Component{
    state = {
        keyIndex: 0,
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
        let { keyIndex } = this.state;
        const chosenCoin = APIinfo.find((e) => e.code === currencyInput)
        const cambio = valueInput*(+(chosenCoin.ask))
        const despesa = {
            id: indexDespesa,
            value: cambio,
            description: descriptionInput,
            currency: chosenCoin.name,
            method: methodInput,
            tag: tagInput,
            exchangeRate: chosenCoin
        }
        keyIndex++;
        dispatch(addExpenses(despesa));
        dispatch(addTotal(cambio));
        this.setState({
            keyIndex: keyIndex,
            valueInput: '',
            descriptionInput: '',
            currencyInput: 'USD',
            methodInput: 'PIX',
            tagInput: 'Lazer',
            indexDespesa: (indexDespesa+1)
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { valueInput, keyIndex } = this.state;
        const { APIcoins } = this.props;
        return (
            <form key={ keyIndex } onSubmit={this.handleSubmit}>
                <label htmlFor='valueInput'>Valor: </label>
                <input 
                    name="valueInput"
                    type="number"
                    placeholder="Digite um valor"
                    data-testid="value-input"
                    onChange={this.handleChange}
                />
                <label htmlFor='descriptionInput'>Descrição: </label>
                <input
                    name="descriptionInput"
                    type="text"
                    placeholder="Descrição da sua despesa"
                    data-testid="description-input"
                    onChange={this.handleChange}
                />
                <label htmlFor='currencyInput'>Conversão: </label>
                <select 
                    defaultValue="USD"
                    name="currencyInput"
                    data-testid="currency-input"
                    onBlur={this.handleChange}
                >
                    { APIcoins.map((coin, index) => (
                        <option key={index}>{coin}</option>
                    ))}
                </select>
                <label htmlFor='methodInput'>Forma de pagamento: </label>
                <select 
                    defaultValue="PIX"
                    name="methodInput"
                    data-testid="method-input"
                    onBlur={this.handleChange}
                >
                    <option>Dinheiro</option>
                    <option>Cartão de Débito</option>
                    <option>Cartão de Crédito</option>
                    <option>PIX</option>
                </select>
                <label htmlFor='tagInput'>Tipo de despesa: </label>
                <select
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
                    data-testid="add-btn"
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