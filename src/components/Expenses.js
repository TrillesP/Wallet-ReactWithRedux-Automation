import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpenses, subTotal } from '../redux/actions';

class Expenses extends Component{

    deleteExpense = (event) => {
        event.preventDefault();
        const { dispatch, allExpenses } = this.props;
        const delValue = allExpenses.filter((e) => e.id === (+event.target.id))
        dispatch(subTotal(delValue[0].value))
        const newExpenses = allExpenses.filter((e) => e.id !== (+event.target.id))
        dispatch(delExpenses(newExpenses))
    }

    render() {
        const { allExpenses } = this.props;
        console.log(allExpenses)
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