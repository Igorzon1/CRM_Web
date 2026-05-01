# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]
### Adicionado
- Estrutura inicial de documentação Enterprise (ADRs, GitHub templates, Changelog).
- Documentação de Produto (PRD, Requisitos e Histórias de Usuário).
- Documentação de Design (UI/UX e ERD).
- Entidade de Usuário (`User` e `UserRepository`).
- Tratamento de Erros Global seguindo RFC 7807 (`GlobalExceptionHandler`).
- Segurança via JWT e Spring Security 6 (`SecurityConfig`, `TokenService`, `SecurityFilter`).
- Endpoints de autenticação (`/api/auth/register` e `/api/auth/login`).
- Configuração de testes de integração com Testcontainers (`IntegrationTestBase`).
- **Gestão de Clientes:** `Customer`, `CustomerType`, `CustomerRepository`.
- **Regras de Clientes:** Validações de duplicação, DTOs (`CustomerRequest`, `CustomerResponse`), `CustomerService`.
- **API Protegida:** `CustomerController` com suporte a listagem, filtro e criação de clientes.

### Modificado
- Definição da Stack Base: Java com Maven e React com JavaScript.
- Remoção da pasta obsoleta de planejamento em favor da nova estrutura em `docs/`.
