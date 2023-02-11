import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './render/renderWithRedux';
import { APIfetchData } from './APIfetchData/APIfetchData';
import App from '../App';

describe('Página de despesas', () => {
    beforeEach( () => {
        jest.spyOn(global, 'fetch').mockResolvedValue(
            { json: jest.fn().mockResolvedValue(APIfetchData) },
          );
    });

    afterEach(() => jest.clearAllMocks());

    test('Testando se a requisição da API é feita corretamente', () => {
        renderWithRedux(<App />, {initialEntries: ['/wallet']});
        expect(screen.getByTestId('total-header')).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('Testando adição de despesas na wallet com diferentes moedas e soma de valores', async () => {
        renderWithRedux(<App />, {initialEntries: ['/wallet']});
        
        await screen.findByText('USD');
        expect(screen.getByTestId('currency-input')).toHaveTextContent('USD');

        expect(screen.getByTestId('total-header')).toHaveTextContent('0.00');
        userEvent.type(screen.getByTestId('value-input'), '10');
        userEvent.type(screen.getByTestId('description-input'), 'abacaxi');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'CAD');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));

        expect(screen.getByTestId('total-header')).not.toHaveTextContent('0.00');

        userEvent.type(screen.getByTestId('value-input'), '500');
        userEvent.type(screen.getByTestId('description-input'), 'banana');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'JPY');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'PIX');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));
    });

    test('Testando se, ao adicionar uma despesa, os inputs voltam aos valores default', async () => {
        renderWithRedux(<App />, {initialEntries: ['/wallet']});

        await screen.findByText('USD');
        
        userEvent.type(screen.getByTestId('value-input'), '10');
        userEvent.type(screen.getByTestId('description-input'), 'abacaxi');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'CAD');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));

        expect(screen.getByTestId('value-input')).toHaveTextContent('');
        expect(screen.getByTestId('description-input')).toHaveTextContent('');
        expect(screen.getByTestId('currency-input')).toHaveTextContent('USD');
        expect(screen.getByTestId('method-input')).toHaveTextContent('PIX');
        expect(screen.getByTestId('tag-input')).toHaveTextContent('Lazer');
    });

    test('Testando botão de editar despesa e se o valor editado é guardado corretamente', async () => {
        renderWithRedux(<App />, {initialEntries: ['/wallet']});

        await screen.findByText('USD');
        
        userEvent.type(screen.getByTestId('value-input'), '10');
        userEvent.type(screen.getByTestId('description-input'), 'abacaxi');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'CAD');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));

        expect(screen.getByTestId('total-header')).not.toHaveTextContent('0.00');

        userEvent.type(screen.getByTestId('value-input'), '500');
        userEvent.type(screen.getByTestId('description-input'), 'banana');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'JPY');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'PIX');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));

        expect(screen.queryAllByTestId('edit-btn')).toHaveLength(2);
        userEvent.click(screen.getAllByTestId('edit-btn')[1]);
        expect(screen.queryAllByTestId('edit-btn')[1].innerText).toBe('Salvar');
        expect(screen.queryAllByRole('cell')[9]).toHaveTextContent('banana');
        userEvent.dblClick(screen.queryAllByRole('cell')[9]);
        userEvent.type(screen.queryAllByRole('cell')[9], '{backspace}abacate');
        userEvent.click(screen.getAllByTestId('edit-btn')[1]);
        expect(screen.queryAllByTestId('edit-btn')[1].innerText).toBe('Edit');
        expect(screen.queryAllByRole('cell')[9]).toHaveTextContent('abacate');
    });

    test('Testando botão de excluir despesa e seu funcionamento completo', async () => {
        renderWithRedux(<App />, {initialEntries: ['/wallet']});

        await screen.findByText('USD');
        
        userEvent.type(screen.getByTestId('value-input'), '10');
        userEvent.type(screen.getByTestId('description-input'), 'abacaxi');
        userEvent.selectOptions(screen.getByTestId('currency-input'), 'CAD');
        userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
        userEvent.selectOptions(screen.getByTestId('tag-input'), 'Alimentação');
        userEvent.click(screen.getByTestId('add-btn'));

        expect(screen.queryAllByRole('cell')).toHaveLength(8);
        expect(screen.getByTestId('total-header')).not.toHaveTextContent('0.00');

        userEvent.click(screen.getByTestId('delete-btn'));
        expect(screen.queryByRole('cell')).toBeNull();
        expect(screen.getByTestId('total-header')).toHaveTextContent('0.00');
    });

});