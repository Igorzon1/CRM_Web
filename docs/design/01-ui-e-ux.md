# Documentação de Design (UI e UX)

## 1. Identidade Visual
Como este é um projeto voltado para portfólio corporativo (B2B), o design deve transmitir seriedade, limpeza e confiança. Evitaremos paletas "brincalhonas" em excesso.

- **Cores Primárias:** Tons de Azul (ex: `#1E3A8A` / Tailwind `blue-900`) para botões principais e cabeçalhos. Azul transmite confiança e profissionalismo no mundo corporativo.
- **Cores Neutras:** Branco e Cinza claro para fundos, mantendo o contraste alto.
- **Status (Cores Semânticas):**
  - Sucesso/Ganho: Verde (`#10B981` / Tailwind `emerald-500`)
  - Alerta/Negociação: Amarelo/Laranja (`#F59E0B` / Tailwind `amber-500`)
  - Erro/Perdido: Vermelho (`#EF4444` / Tailwind `red-500`)

## 2. Tipografia
- Fonte limpa e sem serifa.
- Sugestão: **Inter** ou **Roboto** (Google Fonts).

## 3. Biblioteca de Componentes UI
Para garantir um desenvolvimento ágil no frontend em React, sem perder tempo reinventando a roda com CSS puro, utilizaremos:
- **Tailwind CSS:** Para espaçamentos e layouts rápidos.
- **shadcn/ui** ou **MUI (Material UI):** Para componentes complexos pré-prontos (Modais, Tabelas, Selects, Inputs com validação visual).

## 4. Referências de Layout
- **Dashboard:** Layout com Side-menu (Menu lateral fixo à esquerda), Header superior com o Perfil do Usuário e área central de conteúdo.
- **Pipeline:** Visual idêntico ao Trello, com colunas representando os estágios de venda (Lead > Qualificação > Negociação > Fechado). Cards podem ser arrastados (Drag and Drop - Diferencial técnico no frontend).
