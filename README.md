
# MB Labs Events

MB Labs Events é uma aplicação back-end com o objetivo de gerir eventos permitindo que os usuários busquem eventos e comprem ingressos para os mesmos.




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

#### Organizadores

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
| title         | **Obrigatório**. Título do evento                   |
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
| description   |  Livre descrição                                    |
| price         |  Imagem da atração                                  |

## Stacks utilizadas

**Back-end:** Typescript, Node, Express, Mongo/Mongoose, Zod, Jwt e Bcrypt

