# Avaliar Fácil — Sistema de avaliações

Site de apresentação do Avaliar Fácil, sistema para avaliações digitais em escolas pela rede local, sem depender de internet.

## Como visualizar

Abra o arquivo `index.html` no navegador. Não é necessário instalar dependências ou executar um build. Mantenha as pastas do projeto juntas para carregar os estilos, scripts e vídeos corretamente.

## Estrutura

- `index.html`: conteúdo e seções da página.
- `css/estilos.css`: identidade visual e layout responsivo.
- `js/navigation.js`: navegação e menu mobile.
- `js/motion.js`: animações, respeitando a preferência por movimento reduzido.
- `js/news.js`: carregamento dos vídeos das reportagens ao clicar.
- `assets/`: vídeos e imagens.

## Pendências

- Confirmar e-mail e telefone de contato para atualizar;
- Fazer a migração dos vídeos das reportagens para o Vimeo.
- Adicionar transcrições acessíveis das reportagens quando disponíveis.

## Publição na hospedagem

Envie `index.html` e as pastas `css/`, `js/` e `assets/` para a pasta pública do domínio na Hestia, mantendo essa estrutura. Envie os arquivos de apoio antes do HTML.

Depois de publicar, confira o site com `Ctrl + F5` ou em uma janela privativa. Se houver cache adicional na hospedagem ou CDN, limpe-o também.
