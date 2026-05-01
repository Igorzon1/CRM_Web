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
- **Frontend Core:** Roteamento com `react-router-dom` (`App.jsx`).
- **Design System:** Estilos globais e tokens de CSS implementando Glassmorphism e fonte Inter no `index.css`.
- **UI:** Tela Premium de Autenticação responsiva (`Login.jsx`) e *placeholder* de Dashboard.
- **Integração Full-Stack (Sprint 5):** 
  - Backend: Configuração de CORS para permitir React (`SecurityConfig`). Correção na tratativa de `UsernameNotFoundException` no `AuthorizationService`.
  - Frontend: Context API para gerenciamento de sessão (`AuthContext.jsx`), Cliente Axios com injeção automática de Token JWT (`api.js`), Rotas Protegidas (`PrivateRoute`) e integração total do Login e Registro com o Spring Boot.
  - UI: Adicionado botão de 'mostrar/ocultar' senha com ícones Lucide.

### Modificado
- Definição da Stack Base: Java com Maven e React com JavaScript.
- Remoção da pasta obsoleta de planejamento em favor da nova estrutura em `docs/`.
