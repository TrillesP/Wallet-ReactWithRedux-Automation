import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
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

    // test('Testando se, ao adicionar uma despesa, os inputs voltam aos valores default', () => {
    //     renderWithRedux(<App />, {initialEntries: ['/wallet']});
    // });

    // test('Testando botão de editar despesa e se o valor editado é guardado corretamente no estado global', () => {
    //     renderWithRedux(<App />, {initialEntries: ['/wallet']});
    // });

    // test('Testando botão de excluir despesa e se o estado global com todas as despesas é atualizado corretamente', () => {
    //     renderWithRedux(<App />, {initialEntries: ['/wallet']});
    // });

    // test('Testando exclusão de várias despesas e os valores alterando corretamente', () => {
    //     renderWithRedux(<App />, {initialEntries: ['/wallet']});
    // });

});