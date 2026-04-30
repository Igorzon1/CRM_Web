# 3. Estratégia de Repositório: Monorepo

- **Status:** Aceito
- **Data:** 2026-04-30
- **Autores:** Igor

## Contexto e Problema
Precisamos definir como o código-fonte do backend (Spring Boot) e do frontend (React) será armazenado e versionado. Em um cenário corporativo, a escolha de repositório afeta pipelines de CI/CD, visibilidade e gestão de dependências. Para um projeto de portfólio, a facilidade de avaliação pelos recrutadores também deve ser considerada.

## Opções Consideradas
1. **Multirepo (Repositórios Separados):** Um repositório para o frontend e outro para o backend. Comum em arquiteturas de microsserviços.
2. **Monorepo (Repositório Único):** Ambos os projetos coexistindo na mesma raiz de repositório (`/frontend` e `/backend`).

## Decisão
Foi escolhida a estratégia de **Monorepo**.

**Justificativa:** 
Para um projeto de portfólio, manter tudo em um único repositório facilita incrivelmente a vida do recrutador ou avaliador, pois ele precisa clonar apenas um link para ter o sistema inteiro. Além disso, permite a criação de um único `docker-compose.yml` na raiz do projeto, que sobe o banco de dados, o backend e o frontend simultaneamente. Com ferramentas como GitHub Actions, podemos configurar pipelines separados para as pastas frontend e backend no mesmo repositório, demonstrando bom conhecimento de CI/CD em monorepos.

## Consequências
### Positivas
- Única fonte de verdade para o projeto todo.
- Onboarding super simples para avaliadores (`git clone` único).
- Versionamento sincronizado de features (um commit ou PR pode conter alterações no front e no back ao mesmo tempo).

### Negativas
- O repositório pode ficar pesado com o passar do tempo.
- Requer cuidado extra na configuração de pipelines de CI/CD para não rodar testes do backend quando apenas o frontend for alterado.
