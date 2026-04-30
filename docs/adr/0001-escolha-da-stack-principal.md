# 1. Escolha da Stack Tecnológica Principal

- **Status:** Proposto
- **Data:** 2026-04-30
- **Autores:** Igor

## Contexto e Problema
Precisamos definir as tecnologias base para a construção do novo sistema de CRM. A escolha deve focar em criar um projeto que se destaque para recrutadores, com alta empregabilidade no mercado corporativo, permitindo escalabilidade, fácil manutenção e aplicação de práticas como Clean Architecture.

## Opções Consideradas
- Java 17 + Spring Boot (ainda não defini a versão, mas pode ser a mais usada para mercado)
- Para o front quero react

## Decisão
Estou escolhendo usar o **Java 17 + Spring Boot** e **React**. pois são os mais requisitados no mercado. Além disso ainda careço de experiência e habilidades para criar sistema realmente robustos e profissionais. 

**Justificativa:** 
O ecossistema Java/Spring é padrão absoluto no mundo corporativo Enterprise (bancos, seguradoras, grandes varejos). O uso do Java 17 demonstra atualização tecnológica (Records, Virtual Threads, Pattern Matching) e o Spring Boot traz integrações modernas e melhor performance com suporte nativo (GraalVM).

Para banco de dados, escolhemos o **PostgreSQL**, sendo o SGBD open-source relacional mais confiável e robusto do mercado, frequentemente exigido em vagas para Pleno e Sênior.

## Consequências
### Positivas
- Alta valorização do currículo para vagas corporativas.
- Ecossistema maduro, com excelente suporte para testes de integração (Testcontainers) e segurança (Spring Security).
- Forte tipagem e orientação a objetos facilitam a implementação de Clean Architecture.

### Negativas
- Curva de aprendizado inicial maior em relação a frameworks como Express.js.
- Verbosidade (parcialmente mitigada pelo uso de Records e boas práticas).
