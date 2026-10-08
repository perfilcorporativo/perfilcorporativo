# Portfólio de Fernando Batistela — versão de uma tela

Site pessoal sem rolagem vertical. O visitante escolhe um projeto e a prévia, as tecnologias e o link mudam **na mesma tela**.

## Como funciona

- Desktop: lista de projetos na coluna esquerda, painel de visualização à direita, botões de anterior/próximo e setas de teclado.
- Celular: seletor horizontal de projetos, prévia e texto dentro da altura da tela, sem precisar deslizar a página para baixo.
- As capturas de HelpDesk Lite, CEP Explorer e Mini ERP são imagens reais dos projetos, preservadas integralmente com object-fit: contain.
- Clicar na captura abre a imagem completa em outra aba.
- FaceScoreAI: visualização técnica sem fotografias nem rostos reais.
- Xadrez: resumo técnico de TCC realizado em equipe.
- Não há fontes de imagem inventadas, métricas fictícias nem bibliotecas JS externas.

## Arquivos

- index.html: conteúdo e navegação semântica;
- styles.css: visual responsivo e posicionamento de uma tela;
- main.js: seleção de projeto, teclado e deslize lateral no celular;
- assets/*-real.webp: capturas de projetos executados localmente.

## Verificação local

Na pasta, execute `python -m http.server 4189` e abra `http://localhost:4189`.

A nova versão foi testada em Playwright no Brave, em desktop, tablet e celular. O arquivo qa_screen.py e as capturas screen-*.png são artefatos internos da auditoria local e não devem ir para a publicação.

## Antes de reverter

Foi preservada uma cópia da versão editorial anterior em C:\Users\i\Documents\portfolio-fernando\backup-before-one-screen.