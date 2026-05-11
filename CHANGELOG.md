# Changelog

## [Unreleased]
### Added
- **Frontend**: Nova aba/modal de "Histórico de Interações" (`DealDetailsModal.jsx`) permitindo adicionar notas de acompanhamento nas oportunidades.
- **Backend**: Criação da entidade `Note` e endpoints dedicados (`POST` e `GET /api/deals/{id}/notes`) para registrar o histórico na linha do tempo das vendas.
- **Frontend**: Nova página de Funil de Vendas (Kanban Board) implementada usando `@hello-pangea/dnd` para arrastar e soltar (Drag and Drop).
- **Frontend**: Modal dinâmico `DealModal.jsx` para criação rápida de novos negócios, integrando clientes existentes.
- **Frontend**: `Dashboard.jsx` (Visão Geral) agora consome os dados reais da API, calculando clientes totais, valor de negócios em andamento e taxa de conversão.
- **Backend**: Implementação da regra de negócio (RF08) no `DealService.java` que impede o cadastro de múltiplos negócios ativos para um mesmo cliente.

### Fixed
- **Backend**: Configuração do CORS no Spring Security atualizada para permitir o método `PATCH` e `DELETE`.
- **Frontend**: Correção no botão de exclusão de negócios no Kanban (conflito de captura de clique com o recurso de arrastar e soltar).
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
- **Gestão Completa de Clientes (Sprint 7):**
  - Backend: Implementação do CRUD completo com métodos `@PutMapping` e `@DeleteMapping` no `CustomerController`.
  - Frontend: Adição das opções de Edição e Exclusão (Hover effect) na tabela de clientes.
  - UI: Refatoração do `CustomerModal.jsx` para suportar tanto criação quanto edição inteligente.
- **Isolamento de Dados e Perfil / Multi-tenancy (Sprint 8):**
  - Banco de Dados: Adicionada Chave Estrangeira `user_id` na entidade `Customer` para garantir que negócios/clientes pertençam a um usuário.
  - Regra de Negócio (Bugfix): Removida trava de unicidade global de CNPJ/Email. Diferentes empresas agora podem cadastrar o mesmo CNPJ.
  - Frontend: Contexto de Autenticação (`AuthContext`) aprimorado para decodificar e armazenar os dados do usuário. Cabeçalho agora exibe dinamicamente o Nome e E-mail do usuário autenticado.
  - Layout Base: Criado o `DashboardLayout.jsx` com menu lateral persistente (SPA) e cabeçalho dinâmico.
  - Clientes: Tela principal `Customers.jsx` com listagem de clientes e Empty State elegante.
  - Modal: Componente `CustomerModal.jsx` para criação rápida de clientes (PJ/PF) direto da tela de listagem.
  - Serviço de Integração: Configuração de requisições GET e POST no arquivo `customerService.js`.

### Modificado
- Definição da Stack Base: Java com Maven e React com JavaScript.
- Remoção da pasta obsoleta de planejamento em favor da nova estrutura em `docs/`.
