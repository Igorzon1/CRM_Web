# Requisitos Funcionais e Não-Funcionais

## Requisitos Funcionais (RF)
*O que o sistema faz.*

- **RF01:** O sistema deve permitir o cadastro, edição, visualização e exclusão (Soft Delete) de Clientes (Pessoa Física e Jurídica).
- **RF02:** O sistema deve permitir a associação de múltiplos Contatos a um único Cliente.
- **RF03:** O sistema deve ter um Funil de Vendas, onde oportunidades podem ser movidas entre estágios (ex: Lead, Negociação, Ganho, Perdido).
- **RF04:** O sistema deve permitir o registro de notas e histórico de interações (ligações, reuniões, e-mails) na linha do tempo da Oportunidade ou Cliente.
- **RF05:** O sistema deve possuir Autenticação Segura, garantindo que apenas usuários logados acessem a plataforma.
- **RF06:** Ao concluir uma oportunidade com status "Ganho", o sistema deve disparar um evento assíncrono para enviar um e-mail de "Boas-vindas" ao cliente.

## Requisitos Não-Funcionais (RNF)
*Como o sistema se comporta (Qualidade, Performance, Arquitetura).*

- **RNF01 (Tecnologia Base):** O backend será desenvolvido em Java 17+ utilizando Spring Boot 3.x e gerenciamento de dependências via **Maven**.
- **RNF02 (Tecnologia Base):** O frontend será desenvolvido em **React com JavaScript** (sem TypeScript), consumindo a API via JSON.
- **RNF03 (Arquitetura):** O sistema deve seguir o padrão de arquitetura Package-by-Feature (Modular).
- **RNF04 (Testabilidade):** Todas as rotas de API devem ter testes de integração implementados com JUnit 5 e Testcontainers.
- **RNF05 (Persistência):** O banco de dados relacional oficial do projeto será o PostgreSQL.
- **RNF06 (Documentação de API):** As rotas do sistema deverão ser expostas e documentadas automaticamente usando Swagger/OpenAPI.
- **RNF07 (Tratamento de Erros):** Todos os erros retornados pela API devem seguir a padronização RFC 7807 (Problem Details).
