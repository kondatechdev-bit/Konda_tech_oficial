# Konda Tech - Website Oficial Corporativo

Este repositório contém a reconstrução do site oficial da **Konda Tech**, desenvolvido exclusivamente com tecnologias nativas da Web (HTML5, CSS3, JavaScript ES6+), sem qualquer dependência de frameworks ou bibliotecas externas.

## 🚀 Arquitetura e Tecnologias

- **HTML5 Semântico**: Estruturação acessível com uso rigoroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` e atributos ARIA.
- **CSS3 Modular & Design Tokens**:
  - `variables.css`: Sistema de design, cores primárias, secundárias, gradientes e suporte a Dark/Light Mode.
  - `layout.css`, `navbar.css`, `hero.css`, `buttons.css`, `cards.css`, `forms.css`, `footer.css`, `animations.css`, `responsive.css`.
  - Uso de `clamp()`, Flexbox, CSS Grid e animações `@keyframes`.
- **JavaScript ES6+ Módulos Nativos**:
  - `theme.js`: Alternância de tema Dark/Light salvo no LocalStorage.
  - `navbar.js` & `sidebar.js`: Menu fixo e Drawer de navegação mobile com suporte ao teclado (ESC).
  - `animations.js`: Revelação ao rolar com `IntersectionObserver` e efeito de onda nos botões.
  - `scroll.js`: Botão "Voltar ao Topo" e rolagens suaves.
  - `counter.js`: Contadores numéricos animados de estatísticas.
  - `slider.js`: Carrossel com navegação manual e touch swipe.
  - `faq.js`: Sanfona/Accordion de FAQ interativo.
  - `contact.js`: Validação de formulários e simulação de envio.
  - `utils.js`: Notificações de Toast e filtro local de produtos/artigos.

## 📄 Estrutura de Páginas

- `index.html`: Página Principal / Home
- `about.html`: Sobre Nós, Quem Somos, Missão, Visão e Valores
- `products.html`: Catálogo de Produtos e Tabela Comparativa Enterprise
- `technologies.html`: Detalhamento do Atlas Engine, Atlas Craft e Benchmarks
- `opensource.html`: Repositórios GitHub e Projetos da Comunidade
- `roadmap.html`: Visão Estratégica e Lançamentos 2026/2027
- `blog.html`: Artigos e Insights de Engenharia
- `contact.html`: Formulário de Atendimento e Suporte Enterprise
- `careers.html`: Cultura, Benefícios e Vagas Abertas
- `privacy.html`: Política de Privacidade LGPD / GDPR
- `terms.html`: Termos de Uso do Serviço
- `404.html`: Página de Erro 404 Personalizada

---
© 2026 Konda Tech. Todos os direitos reservados.
