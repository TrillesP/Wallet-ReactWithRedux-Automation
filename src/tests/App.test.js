import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRedux } from './render/renderWithRedux';

test('first test', () => {
  renderWithRedux(<App />);
  const emailElement = screen.getByTestId('email-input');
  const passwordElement = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-btn');
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
  userEvent.type(emailElement, 'tril@bkop.com');
  userEvent.type(passwordElement, 'abacaxi');
  expect(button).toBeEnabled();
  userEvent.click(button);
  expect(screen.getByTestId('email-header')).toBeInTheDocument();
});
