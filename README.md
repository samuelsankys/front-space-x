# Fullstack Challenge 🏅 Space X API

Este é um desafio para desenvolver o frontend da API RestFul desenvolvido neste mesmo repositório.

### 🛠 Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [React.js](https://react.dev/)
- [Mui-Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/config/preview-options.html)
- [Docker](https://docs.docker.com/)
- [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Front End

#### Rodando localmente

- Instale as dependências com

```bash
  npm install
```

- Inicialize o servidor com

```bash
 npm run dev
```

para o modo de desenvolvimento.

#### Rodando com docker

```bash
docker build -t front-spacex .
```

```bash
docker run -p 5001:5001 front-spacex
```

### Features

- [x] Atender aos seguintes casos de uso:
  - Como usuário, devo ser capaz de visualizar um gráfico de pizza/setor sobre o lançamento dos foguetes;
  - Como usuário, devo ser capaz de visualizar os resultados de lançamentos (sucesso e falha);
  - Como usuário, devo ser capaz de visualizar um gráfico de colunas com o laçamento de foguetes por ano (atente-se para a coloração, ela deve ser semelhante ao que foi atribuído no gráfico de pizza/setor);
  - Como usuário, devo ser capaz de pesquisar pelo nome, missão e/ou resultado;
  - Como usuário, devo ser capaz de visualizar o vídeo no YouTube ao apertar no ícone;
  - Como usuário, devo ser capaz de mudar de página aparecendo os próximos 5 lançamentos.
- [x] Seguir o wireframe para mostrar os dados necessários, estilização ao seu critério conforme seus conhecimentos de usabilidade.
- [x] A filtragem dos dados deve ser feito usando debounce.
- [ ] Escrever Unit Tests e/ou E2E Test. Escolher a melhor abordagem e biblioteca;
- [x] Configurar Docker no Projeto.
- [x] Colocar na URL os parâmetros utilizados na busca, para compartilhar a URL.

#### Organização:

- Aplicação de padrões Clean Code.
- Funções desacopladas.
- Validação de chamadas assíncronas para evitar travamentos.
- Commits seguindo o padrão de [convensão](https://www.conventionalcommits.org/en/v1.0.0/).
- Fluxo de git utilizando boas práticas auxiliado pelo gitflow.
- Eslint.

## Processo de investigação

- Configuração e instalação de ferramentas comentadas acima.
- Criar pastas e organizar componente, cores, tamanhos e padrões.
- Criar header.
- Criar estrutura para os graficos, e depois da tabela.
- Contruir tabela e configurações.
- Vincular aos dados da API.
- Configurar detalhes de responsividade e ajustes de aparência.
- Testar manualmente os dados de busca e filtros.
- Definir debounce nos filtros.
- Criar e testar arquivo docker
- Configurar URL externa para manipulação de filtro.

> This is a challenge by [Coodesh](https://coodesh.com/)
