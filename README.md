# Projeto de Carteira de Gastos com Conversão

Projeto inicializado com create-react-app, utilizando React com Redux em Javascript.

Na primeira página deve ser feito um login fictício com e-mail e senha (que deve ter pelo menos seis dígitos).

Na segunda pode ser preenchido um formulário para adicionar despesas a uma carteira de gastos, uma por uma, com possibilidade de edição e exclusão.

## Objetivo

O objetivo aqui é demonstrar aprendizados em React e Redux, utilizando também chamadas de API, e meu entendimento sobre as conexões entre funções no código, além de demonstrar conhecimento de testes automatizados suficientes, tanto utilizando a RTL quanto Cypress, para abranger o código completo.

## Características presentes

- Função de renderização customizada para fazer o render funcionar com Redux e Rotas.

- Dois reducers combinados por uma função e utilizados na criação do Store.

- Diversas funções de actions conectadas com os reducers citados para preencher o estado global da aplicação.

- Mock feito nos testes para simular chamada da API, com awaits para sua resposta.

- Duas páginas, uma principal de simulação de Login e outra (Wallet) com um formulário para preencher, editar e remover despesas.

- style.css com um CSS básico para embelezar minimamente o app.

## Scripts

Na pasta do projeto você pode rodar os seguintes comandos:

### `npm start` - leia a observação abaixo

Roda o app e abre a página [http://localhost:3000](http://localhost:3000) no seu browser.

Obs: Antes de iniciar o app é necessário a prévia instalação de algumas bibliotecas com o comando `npm install`

### `npm test`

Roda os testes feitos com a React Testing Library no modo interactive watch.

### `npm run test:coverage`

Roda os testes com a RTL e mostra a cobertura do código.

### `npx cypress open` - só funciona com o app em execução simultânea (`npm start` tendo sido executado)

Roda os testes feitos em Cypress que, assim como os usando RTL, também cobrem 100% do código.
