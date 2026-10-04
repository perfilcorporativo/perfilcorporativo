# Mini ERP de Estoque e Vendas

Projeto pessoal simples desenvolvido para praticar organização de processos, regras de negócio e fluxo de informações em um sistema de gestão.

## Objetivo

Simular uma operação básica de ERP com quatro módulos:

- **Clientes:** cadastro e consulta de clientes.
- **Produtos:** cadastro de produtos, preço e estoque inicial.
- **Vendas:** registro de venda vinculando cliente, produto e quantidade.
- **Estoque:** atualização automática da quantidade após cada venda e indicação de estoque baixo.

## Regras implementadas

- Uma venda só pode ser registrada se houver cliente e produto selecionados.
- A quantidade vendida não pode ser maior que o estoque disponível.
- Ao registrar uma venda, o estoque do produto é reduzido automaticamente.
- O sistema sinaliza produtos com estoque baixo ou sem estoque.
- Os dados ficam salvos no navegador por meio de `localStorage`.

## Tecnologias

- HTML
- CSS
- JavaScript
- localStorage do navegador

O projeto foi mantido propositalmente simples e sem frameworks para priorizar o entendimento do fluxo de negócio e das regras do sistema.

## Como executar

1. Baixe os arquivos desta pasta.
2. Abra o arquivo `index.html` em um navegador.
3. Cadastre clientes e produtos ou use os dados de exemplo.
4. Registre uma venda e observe a atualização do estoque.

## O que este projeto demonstra

- Organização de informações em módulos.
- Entendimento de um fluxo básico de venda.
- Aplicação de regras simples de negócio.
- Relação entre cadastro, operação e atualização de estoque.
- Foco na experiência do usuário em um sistema administrativo.

## Autor

Fernando Junior Batistela de Sousa  
Tecnologia em Análise e Desenvolvimento de Sistemas — UNIFADRA/FUNDEC