
# MB Labs Events

MB Labs Events é uma aplicação back-end com o objetivo de permitir a empresas gerir eventos e permitir que os usuários busquem eventos e comprem ingressos para os mesmos.

## Documentação

 - [Acesse](https://documenter.getpostman.com/view/23488574/2s8YszMpQs)
 
 
## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:cassiusbessa/mbevents.git
```

Entre no diretório do projeto

```bash
  cd mbevents
```

Suba o DockerCompose

```bash
  docker-compose up -d --build
```

Projeto pronto para uso

```bash
  Aguarde alguns segundos para o servidor rodar. O projeto estará pronto para uso.
```  

## Funcionalidades

- A aplicação será dividida em dois tipos de usuários: usuários comuns (usuários), que poderão pesquisar pelos eventos e  usuários organizadores (organizador), responsáveis pela criação do evento, tendo acesso as rotas públicas.
- Organizadores deverão ser cadastrados informando nome, email e senha.

#### Usuários

- Usuários poderão ter acessos a todos os eventos públicos e filtrá-los pelo gênero, atrações, local, preço e organizador.
- Usuários poderão confirmar presença, adquirindo um ingresso.

#### Organizadores
- Organizadores irão criar os eventos com todas as informações necessárias para a realização do mesmo (consultar entidades).
- Todo evento criado deve ter um organizador.
- Organizadores podem editar e excluir um evento criado pelo mesmo.


## Entidades

#### Producers

| Campo         |  Descrição                                          |
| :----------   | :----------------------------------                 |
| id            | **Default**. Identificador gerado no ato do cadastro |
|  email         | **Obrigatório**. Usada para logar na api           |
| password         | **Obrigatório**. Usada para logar na api         |
| username      | **Obrigatório**. Identificador exibido ao público   |


#### Events

| Campo         |  Descrição                                          |
| :----------   | :----------------------------------                 |
| id            | **Default**. Identificador gerado no ato do cadastro |
| producer            | **Default**. Identificador do produtor         |
| title         | **Obrigatório**. Título do evento                   |
| genre         | Conjunto que define o gênero do evento              |
| attractions   | **Obrigatório**. Conjunto que definirá o que terá e em que data            |
| tickets       | **Obrigatório**. Cojunto contendo tipos de ingresso, preços e data de venda   |
| address       | **Obrigatório**. Endereço Público                   |
| image         |  Imagem principal                                   |
| private       | **Obrigatório**. Evento privado? Por padrão **sim**   |
| description  | Livre descrição   |


#### Attractions 

| Campo         |  Descrição                                          |
| :----------   | :----------------------------------                 |
| title          | **Obrigatório**. Título da atração                 |
| startDate     | **Obrigatório**. Data de Início da atração                     |
| endDate       | **Obrigatório**. Data de fim da atração                       |
| description   |  Livre descrição                                    |
| image         |  Imagem da atração                                  |
| local         | Especificação interna do local, caso seja necessário|


#### Tickets 

| Campo         |  Descrição                                          |
| :----------   | :----------------------------------                 |
| title          | **Obrigatório**. Título do ingressos               |
| startDate     | **Obrigatório**. Data de Início das vendas          |
| endDate       | **Obrigatório**. Data de fim das vendas             |
| quantity      | **Obrigatório**. Quantidade total de ingressos      |
| solds         | **Default**. Inicialmente 0. Quantidade de vendas   |
| description   |  Livre descrição                                    |
| price         |  **Obrigatório** Preço do ingresso                                  |


#### Address 

| Campo         |  Descrição                                          |
| :----------   | :----------------------------------                 |
| title         | Título do local do evento                           |
| cep           | **Obrigatório**. CEP do endereço do evento          |
| state         | **Obrigatório**. Estado do endereço da venda        |
| city          | **Obrigatório**. Data de fim das vendas             |
| street        | **Obrigatório**. Quantidade total de ingressos      |
| number        | **Default**. Inicialmente 0. Quantidade de vendas   |
| complement    |  Livre descrição                                    |






## Stacks utilizadas

**Back-end:** Typescript, Node, Express, Mongo/Mongoose, Zod, Jwt e Bcrypt

