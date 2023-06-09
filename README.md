# Wheels On Sale - API

### A API foi desenvolvida com o intuito de gerenciar um portal de venda de automóveis, disponibilizando mecanismos visuais para que o usuário consiga de forma simples e clara efetivar sua busca, venda ou compra desejada.

Documentação

# Rota para documentação: 

Configuração - Siga os passos abaixo para configurar o ambiente de desenvolvimento e começar a usar a API:

## **Tecnologias e bibliotecas**:
* Node
* Express
* TypeScript
* TypeORM
* bcryptjs
* dotenv
* cors
* express-async-errors
* jsonwebtoken
* pg
* ts-node/ts-node-dev
* zod

###

## Instalação

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

```bash
# caso use npm
npm run i

# caso use yarn
yarn
```

## Conectar ao banco de dados

Instalada as dependências, crie e se conecte a um banco de dados através do env.

```.env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
SECRET_KEY=<example>
```

Enfim rode as migrações.

```bash
# caso use npm
npm run typeorm migration:run -d src/data-source.ts

# caso use yarn
yarn typeorm migration:run -d src/data-source.ts
```

## Rodar o servidor

Feita a conexão com o banco de dados, inicie o servidor utilizando o comando abaixo.

```bash
# caso use npm
npm run dev

# caso use yarn
yarn dev
```

## Integrantes:

### *Estevão Alves dos Santos* ##
* LinkedIn: https://www.linkedin.com/in/stevalves/
* Github: https://github.com/stevalves/
* E-mail: ealves1710@hotmail.com
* Portifólio: https://my-portfolio-virid-sigma-80.vercel.app/

### *Gustavo Lima* ##
* LinkedIn: https://www.linkedin.com/in/gucaastro1/
* Github: https://github.com/gcaastro1
* E-mail: gcaastro1@gmail.com
* Portifólio: https://my-portfolio-jade-tau.vercel.app/

### *Jeander Isac dos Santos* ##
* LinkedIn: https://www.linkedin.com/in/isacsantoss/
* Github: https://github.com/JeanderI
* Email: jeandersantos0310@gmail.com
* Portifólio: https://portfolio-jisac.vercel.app

### *Junielson Santos Diniz* ##
* LinkedIn: https://www.linkedin.com/in/junielson-diniz/
* Github: https://github.com/JSDiniz
* E-mail: juniosantos_@hotmail.com

### *Leandro Vasconcelos Alves* ##
* LinkedIn: https://www.linkedin.com/in/leandro-alves85/
* Github: https://github.com/alves-leandro
* E-mail: l.alves85@live.com
* Portifólio: https://leandro-portifolio.vercel.app/
