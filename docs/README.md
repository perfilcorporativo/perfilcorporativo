# Fernando Batistela — Portfólio de projetos

Versão editorial, desenvolvida a partir dos projetos reais presentes no perfil GitHub e na pasta de trabalho local.

## Design

A interface é um arquivo editorial de projetos: nome e trabalhos em primeiro plano, tipografia sóbria, poucos ornamentos e composições específicas para cada software.

A seção de projetos é horizontal no desktop: a rolagem vertical move a galeria enquanto ela permanece fixa na tela. Ao final, a página volta a descer. No celular, o usuário desliza os trabalhos lateralmente.

## Arquivos publicados

- index.html: interface acessível e conteúdo real.
- styles.css: componentes e sistema visual responsivo, sem dependências JavaScript de terceiros.
- main.js: menu mobile, navegação entre projetos, sincronização do scroll horizontal, suporte a teclado e movimento reduzido.
- assets/*.webp: capturas reais de CEP Explorer, HelpDesk Lite e Mini ERP.
- assets/mark.svg: marca vetorial.

## Projetos

- FaceScoreAI: projeto Android em evolução (Kotlin, Compose, MediaPipe e Room), representado por fluxo técnico, sem imagens de rostos.
- CEP Explorer: consulta ViaCEP com TypeScript, backend e SQLite.
- HelpDesk Lite: sistema de chamados com API REST e SQLite.
- IA para xadrez: TCC desenvolvido em equipe, Python + avaliação neural/Negamax.
- Mini ERP: protótipo local de cadastros, estoque e vendas.

## Privacidade e precisão

Não há rostos de pessoas nem fotografias biométricas. Para o FaceScoreAI, a visualização é um fluxo técnico simplificado e não uma captura fictícia. Os demais sistemas usam capturas verificáveis em execução, com dados de demonstração.

Nenhuma funcionalidade, métrica ou experiência profissional foi inventada.

## Desenvolvimento e testes

Na pasta, execute: python -m http.server 4185

Validação com Playwright/Brave: tamanhos de 320, 390, 768, 1440 e 1920 pixels; navegação horizontal com rodinha do mouse; saída do trecho fixo; setas; rolagem por toque; links internos; imagens e menus. Também é possível executar os scripts QA locais da área de trabalho.

## Fonte e histórico

Redesign desenvolvido em pasta independente e comparado visualmente à versão anterior. O backup do site original permanece em backup-before-editorial no computador do autor.