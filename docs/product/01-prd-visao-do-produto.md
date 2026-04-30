# Product Requirements Document (PRD): Visão do Produto CRM

## 1. O que é o projeto?
Um sistema web de CRM (Customer Relationship Management) moderno e modular, focado em gerenciar relacionamentos com clientes, leads e oportunidades de vendas. Ele foi projetado não apenas para entregar valor comercial, mas para demonstrar maturidade arquitetural e de engenharia de software em um nível Enterprise.

## 2. Objetivos e Sucesso
**Objetivo Principal:** Criar um projeto robusto que vá muito além de um "CRUD básico", com foco em chamar a atenção de Tech Leads e recrutadores, provando capacidade de atuar em projetos corporativos complexos.

**Métricas de Sucesso (Portfólio):**
- Código 100% coberto por testes de integração (Testcontainers).
- Documentação clara e estruturada (Design, ADRs e Requisitos).
- Implementação limpa de pelo menos um grande diferencial técnico (ex: Mensageria ou IA).

## 3. Público-Alvo (Personas)
- **Vendedor / SDR (Sales Development Representative):** Usuário que lida diariamente com prospecção. Precisa de um sistema rápido para atualizar o status das vendas (Kanban) e registrar o histórico de conversas.
- **Gerente de Vendas:** Focado no painel (Dashboard). Quer ver as métricas de conversão e o valor geral acumulado no pipeline.

## 4. Escopo do MVP (Minimum Viable Product)
Para não cairmos na armadilha do escopo infinito, o MVP focará no fluxo básico inegociável, assegurando a mais alta qualidade técnica:
1. Autenticação e Autorização (Login JWT).
2. Gestão de Clientes e Contatos.
3. Funil de Vendas (Board Kanbam).
4. Histórico de Interações (notas/atividades no cliente).

## 5. Diferenciais Técnicos (O "Uau" para o mercado)
Para este projeto, priorizaremos como grandes diferenciais técnicos as seguintes features (que serão detalhadas nas fases futuras):
- **Tratamento Global de Erros Avançado:** Padrão RFC 7807 (Problem Details for HTTP APIs).
- **Processamento Assíncrono:** Utilização de RabbitMQ para emissão de boas-vindas ao fechar uma venda.
- **Auditoria Transparente:** Implementação de Spring Data Envers para rastrear "quem" mudou "o quê".
- **Integração com IA (Feature Futura):** Integração com a API do Gemini/ChatGPT para sugerir resumos das últimas interações do cliente.
