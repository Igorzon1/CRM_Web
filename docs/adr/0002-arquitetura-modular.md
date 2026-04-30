# 2. Arquitetura Modular Baseada em Funcionalidades (Feature-driven)

- **Status:** Aceito
- **Data:** 2026-04-30
- **Autores:** Igor

## Contexto e Problema
Para se destacar no mercado, o CRM precisa ir além de um "CRUD básico". É necessário que o sistema possua funções essenciais claras, seja escalável, fácil de manter e permita o trabalho de múltiplos times (simulando um ambiente corporativo real). Além disso, a aplicação precisa ser adaptável a diferentes interfaces no futuro.

## Opções Consideradas
1. **Monolito Clássico (Layer-driven - Controller/Service/Repository):** Separação por camadas técnicas. Pode gerar acoplamento de domínio em projetos maiores.
2. **Arquitetura Modular (Feature-driven / Package by Feature):** Separação por módulos funcionais (ex: Módulo de Clientes, Módulo de Vendas, Módulo de Relatórios). 
3. **Microsserviços:** Distribuição total. (Excessivo para o escopo inicial, traria complexidade de infraestrutura desnecessária no momento).

## Decisão
Optamos por adotar a **Arquitetura Modular (Package by Feature)** dentro de um Monolito inicialmente (Modular Monolith), inspirando-se também nos princípios da **Clean Architecture**.

**Justificativa:** 
Empacotar por funcionalidade (ex: `com.crm.sales`, `com.crm.customers`) garante que o código relacionado a um domínio específico permaneça junto, facilitando a manutenção e futuras extrações para microsserviços, se necessário. Isso prova aos recrutadores que existe uma preocupação real com Domain-Driven Design (DDD) e escalabilidade, demonstrando habilidades arquiteturais avançadas.

## Consequências
### Positivas
- Código mais coeso e de fácil navegação (foco no domínio).
- Facilita o trabalho em equipe (desenvolvedores podem atuar em módulos distintos sem grandes conflitos).
- Excelentes credenciais para portfólio, demonstrando design de software avançado.
- Prepara o sistema para ser multi-tenant de forma mais organizada.

### Negativas
- Curva de aprendizado inicial para definir os limites de cada módulo (Bounded Contexts).
- Risco de referências circulares entre módulos se o design não for rigoroso.
- Maior tempo de planejamento arquitetural em comparação a um modelo MVC clássico.
