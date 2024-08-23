# Planner

Planner é um planejador de viagens onde é possível convidar amigos, registrar atividades e cadastrar links importantes para que sua viagem ocorra da maneira como foi imaginada.

## Tecnologias utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Vite**: Ferramenta de build rápida para projetos front-end.
- **Tailwind CSS**: Framework de CSS para estilização rápida e eficiente.
- **React Router**: Biblioteca para navegação em aplicações React.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **Playwright**: Ferramenta para testes automatizados de aplicações web.

## Instalação

### Backend

1. Clone o repositório da [API](https://github.com/rocketseat-education/nlw-journey-nodejs)

```sh
git clone https://github.com/rocketseat-education/nlw-journey-nodejs
cd nlw-journey-nodejs
```

2. Configure o arquivo `.env`:

- Abra o arquivo `.env.example` e copie seu conteúdo.
- Crie um novo arquivo `.env` e cole as informações copiadas.
- Substitua o valor de `WEB_BASE_URL` pela URL da aplicação web.

3. Instale as dependências e inicie a API:

```sh
npm install
npm run dev
```

### Frontend

1. Clone o repositório web e instale as dependências:

```sh
git clone https://github.com/matheusc1/planner
cd planner
npm install
```

2. Inicie a aplicação:
```sh
npm run dev
```

## Executando os testes

1. Instale as dependências e inicie o servidor.

2. Execute o Playwright para rodar os testes. Para visualizar os testes de forma mais interativa, use o parâmetro --ui:

```
npx playwright test --ui
```

No Playwright, clique no triângulo verde ao lado de `create-trip.spec.ts` para iniciar os testes.

Após a execução dos testes, copie o UUID da URL que será exibida no formato `**/trips/UUID`. O UUID é um código de 36 caracteres. Certifique-se de copiá-lo corretamente.

Cole o UUID na função `goToTripPage` no arquivo de teste `trip-details.spec.ts.`

Execute os testes do arquivo `trip-details.spec.ts`.

## Documentação da API

A documentação completa da API pode ser encontrada em: [plann.er](https://github.com/rocketseat-education/nlw-journey-nodejs)

## Créditos

Uma parte da aplicação foi desenvolvida durante o NLW Journey da [@Rocketseat](https://github.com/Rocketseat).