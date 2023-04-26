# Microsserviço A

Microsserviço responsável por gerenciar informações pessoais de forma segura.

## Segurança
Este microsserviço é desenvolvido com foco em segurança, devido à natureza sensível dos dados gerenciados. Para garantir a proteção desses dados, implementamos medidas de segurança, incluindo a utilização do JSON Web Token (JWT) para autenticação e autorização de rotas privadas e o Bcrypt para criptografar senhas. Além disso, adotamos uma camada adicional de segurança, criptografando os dados salvos no banco de dados com o módulo Crypto.

Vale destacar que o token gerado pelo login possui tempo de expiração de 1 hora, visando manter a segurança dos dados e minimizar potenciais brechas de segurança.

## Tecnologias utilizadas

- Node.js
- Express
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Dotenv
- Crypto

## Instalação

Após clonar o repositório, execute o comando `npm install` para instalar as dependências:

## Executando o projeto

Para iniciar o projeto, execute o comando `npm start`

## Endpoints

### Rotas públicas

#### Usuário

- `GET /usuario`: Retorna todos os usuários cadastrados.
- `GET /usuario/:id`: Retorna um usuário específico pelo ID.
- `POST /usuario`: Cadastra um novo usuário.
- `DELETE /usuario/:id`: Deleta um usuário existente pelo ID.
- `POST /usuario/login`: Faz login e retorna um token JWT válido por 1 hora.

### Rotas privadas

É necessário utilizar o token JWT gerado pelo login para acessar as rotas privadas abaixo.

#### Dados pessoais

- `GET /dadosPessoa`: Retorna todos os dados pessoais cadastrados pelo usuário logado.
- `GET /dadosPessoa/:id`: Retorna um dado pessoal específico pelo ID, desde que pertença ao usuário logado.
- `POST /dadosPessoa`: Cadastra um novo dado pessoal para o usuário logado.
- `PATCH /dadosPessoa/:id`: Atualiza um dado pessoal existente pelo ID, desde que pertença ao usuário logado.
- `DELETE /dadosPessoa/:id`: Deleta um dado pessoal existente pelo ID, desde que pertença ao usuário logado.

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE para obter detalhes.
