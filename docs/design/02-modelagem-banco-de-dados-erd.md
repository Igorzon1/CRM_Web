# Modelagem de Banco de Dados (ERD - Entity Relationship Diagram)

Este documento centraliza as informações sobre as tabelas e relacionamentos do banco de dados (PostgreSQL).

## Entidades Principais e Relacionamentos

### 1. `tb_user` (Usuários / Vendedores)
Usuários do sistema que fazem login.
- `id` (UUID, PK)
- `name` (Varchar)
- `email` (Varchar, Unique)
- `password` (Varchar)
- `created_at` (Timestamp)

### 2. `tb_customer` (Clientes)
Empresas ou pessoas que estão sendo prospectadas.
- `id` (UUID, PK)
- `name` (Varchar)
- `document` (Varchar - CPF/CNPJ)
- `type` (Enum - PF ou PJ)
- `created_at` (Timestamp)

### 3. `tb_opportunity` (Oportunidades de Venda)
Uma negociação associada a um cliente.
- `id` (UUID, PK)
- `title` (Varchar)
- `amount` (Decimal - Valor da venda)
- `status` (Enum - LEAD, NEGOTIATION, WON, LOST)
- `customer_id` (UUID, FK -> `tb_customer(id)`)
- `owner_id` (UUID, FK -> `tb_user(id)`) - Vendedor responsável
- `created_at` (Timestamp)

### 4. `tb_interaction` (Histórico de Interações)
Notas, ligações ou emails registrados na oportunidade.
- `id` (UUID, PK)
- `type` (Enum - CALL, EMAIL, NOTE, MEETING)
- `description` (Text)
- `opportunity_id` (UUID, FK -> `tb_opportunity(id)`)
- `created_at` (Timestamp)

---
*Dica: Quando iniciar o código, você pode criar um diagrama visual dessas tabelas usando o dbdiagram.io e anexar uma imagem aqui para impressionar os recrutadores.*
