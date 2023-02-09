import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenses, subTotal } from '../redux/actions';

class Expenses extends Component{

    deleteExpense = (event) => {
        event.preventDefault();
        const { dispatch, allExpenses } = this.props;
        const delValue = allExpenses.filter((e) => e.id === (+event.target.id))
        dispatch(subTotal(delValue[0].value))
        const newExpenses = allExpenses.filter((e) => e.id !== (+event.target.id))
        console.log(newExpenses)
        dispatch(updateExpenses(newExpenses))
    }

    editExpense = (event) => {
        event.preventDefault();
        const { allExpenses, dispatch } = this.props;
        const descriptionToInput = (event.target.parentElement.parentElement.querySelectorAll('td')[1]);
        const tagToInput = (event.target.parentElement.parentElement.querySelectorAll('td')[5]);
        const element = allExpenses.find((e) => e.id === (+event.target.id));
        const idOfElement = allExpenses.indexOf(element);
        descriptionToInput.toggleAttribute('contenteditable');
        tagToInput.toggleAttribute('contenteditable');
        if (event.target.innerText === 'Salvar') {
            allExpenses[idOfElement].description = descriptionToInput.innerText;
            allExpenses[idOfElement].tag = tagToInput.innerText;
            console.log(allExpenses)
            dispatch(updateExpenses(allExpenses));
            return event.target.innerText = 'Edit';
        }
        event.target.innerText = 'Salvar';
    }

    render() {
        const { allExpenses } = this.props;
        return (
            <table>
                <caption>Despesas</caption>
                <tbody>
                <tr>
                    <th scope="col">Valor em Reais</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Método de Pagamento</th>
                    <th scope="col">Moeda Utilizada</th>
                    <th scope="col">Câmbio da Conversão</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Editar/Excluir</th>
                </tr>
                { allExpenses.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{parseFloat(transaction.value).toFixed(2)}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.method}</td>
                        <td>{transaction.currency}</td>
                        <td>{parseFloat(transaction.exchangeRate.ask).toFixed(2)}</td>
                        <td>{transaction.tag}</td>
                        <td>
                            <button
                                id={transaction.id}
                                data-testid="edit-btn"
                                onClick={this.editExpense}
                            >
                                Edit
                            </button>
                        </td>
                        <td>
                            <button
                                id={transaction.id}
                                data-testid="delete-btn"
                                onClick={this.deleteExpense}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    allExpenses: state.wallet.allExpenses
});

export default connect(mapStateToProps)(Expenses);