# 4. Infraestrutura Local e Gerenciamento de Dependências com Docker

- **Status:** Aceito
- **Data:** 2026-04-30
- **Autores:** Igor

## Contexto e Problema
A aplicação utilizará o banco de dados PostgreSQL e, no futuro, pode precisar de RabbitMQ (mensageria) e Redis (cache). Instalar todos esses serviços diretamente na máquina de desenvolvimento (bare-metal) cria atrito, dependência de sistema operacional (problema "na minha máquina funciona") e dificulta a portabilidade.

## Opções Consideradas
1. **Instalação Local (Bare-metal):** Instalar PostgreSQL, Redis, etc., diretamente no Windows/Linux.
2. **Conteinerização com Docker (Docker Compose):** Utilizar contêineres para abstrair todos os serviços de infraestrutura.

## Decisão
Optamos por utilizar **Docker e Docker Compose** como padrão absoluto para gerenciar a infraestrutura local do projeto.

**Justificativa:** 
O uso de contêineres é o padrão de fato da indústria. Ter um arquivo `docker-compose.yml` na raiz do projeto demonstra conhecimento de DevOps e infraestrutura ágil. Um recrutador ou colega desenvolvedor poderá iniciar todo o ecossistema do banco de dados (e afins) com um único comando `docker-compose up -d`, sem precisar instalar serviços manualmente. Isso também facilita a integração com **Testcontainers** no ecossistema Spring Boot, permitindo testes de integração contra bancos reais (subidos em contêineres dinâmicos), provando altíssima maturidade em testes de software.

## Consequências
### Positivas
- Elimina o problema de "na minha máquina funciona".
- Simplifica radicalmente o onboarding do projeto.
- Habilita o uso de Testcontainers para testes de integração altamente confiáveis.
- Adiciona um selo forte de habilidades de DevOps/Infraestrutura ao portfólio.

### Negativas
- Necessidade de instalar e manter o Docker Desktop/Engine rodando na máquina de desenvolvimento (consumo de memória extra).
