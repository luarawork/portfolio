# Luara Oliveira — Portfólio

Site de portfólio pessoal de **Luara Oliveira**, na convergência entre análise,
design e gestão. Construído à mão em HTML, CSS e JavaScript — sem frameworks e
sem build step. O próprio código é parte do portfólio: legível, documentado e
acessível por princípio.

🔗 **Produção:** https://luaraoliveira.com

---

## Sumário

- [Stack](#stack)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Decisões de arquitetura](#decisões-de-arquitetura)
  - [Tema compartilhado por tokens](#tema-compartilhado-por-tokens)
  - [Internacionalização (PT / EN / ES)](#internacionalização-pt--en--es)
  - [Acessibilidade](#acessibilidade)
  - [Progressive enhancement](#progressive-enhancement)
- [Como rodar localmente](#como-rodar-localmente)
- [Convenções de código](#convenções-de-código)

---

## Stack

| Camada       | Tecnologia                                              |
| ------------ | ------------------------------------------------------- |
| Marcação     | HTML5 semântico                                         |
| Estilo       | CSS puro com custom properties (sem pré-processador)    |
| Comportamento| JavaScript vanilla (ES2015+), sem dependências          |
| Tipografia   | Google Fonts — Playfair Display, DM Sans, DM Mono       |
| Build        | Nenhum. Arquivos estáticos servidos diretamente.        |

Sem `node_modules`, sem bundler, sem transpilação. Qualquer servidor de
arquivos estáticos roda o site.

---

## Estrutura de arquivos

```
.
├── index.html                  # Landing (PT — idioma padrão)
├── em-construcao.html          # Página do repositório (placeholder do GitHub)
├── en/                         # Versão em inglês (mesma estrutura)
│   ├── index.html
│   ├── em-construcao.html
│   └── cases/
├── es/                         # Versão em espanhol (mesma estrutura)
│   ├── index.html
│   ├── em-construcao.html
│   └── cases/
├── cases/                      # Páginas de case (PT)
│   ├── jornada-integrada.html  # Service Design · SaaS
│   ├── watcher.html            # UX/UI · Mobile
│   ├── itsm-servicenow.html    # Service Design · ITSM
│   └── acessabr.html           # UX/UI · Acessibilidade (tema claro)
├── assets/
│   ├── css/
│   │   ├── base.css            # Esqueleto compartilhado + tokens (tema navy)
│   │   ├── landing.css         # Componentes exclusivos da landing
│   │   └── case.css            # Estrutura compartilhada das páginas de case
│   ├── js/
│   │   └── site.js             # Comportamento progressivo da landing
│   ├── favicon.svg
│   └── og-image.png            # Imagem de compartilhamento (Open Graph)
├── sitemap.xml                 # Inclui hreflang recíproco das 3 línguas
└── robots.txt
```

---

## Decisões de arquitetura

### Tema compartilhado por tokens

Todas as páginas herdam **um único esqueleto** (`base.css`): navegação, rodapé,
ritmo de espaçamento, tipografia, tags, selos e estados de foco. As cores são
expostas como custom properties em `:root`.

Cada página de case mantém sua **cor-assinatura** própria sobrescrevendo apenas
os tokens de cor num bloco `<style>` no `<head>` — sem duplicar layout nem
componentes. É por isso que o AcessaBR consegue ser um tema **claro** rodando no
mesmo esqueleto dos temas escuros.

```css
/* Exemplo: cabeçalho de um case sobrescreve só as cores */
:root {
  --bg-base: #0d1f1a;
  --accent-primary: #c9a961;
  --text-primary: #f4f1e8;
  /* ...layout, tipografia e componentes vêm de base.css */
}
```

### Internacionalização (PT / EN / ES)

- PT é o idioma padrão na raiz (`/`); EN em `/en/`; ES em `/es/`.
- Estrutura, IDs e classes são **idênticos** entre as três versões — só o
  conteúdo textual muda.
- Cada página declara `hreflang` recíproco (`pt-BR`, `en`, `es`, `x-default`)
  no `<head>`, e o `sitemap.xml` repete essas relações.
- O seletor de idioma marca o ativo com `aria-current="true"`.

### Acessibilidade

A acessibilidade é tratada como requisito, não como ajuste posterior:

- **Contraste** — todos os pares texto/fundo validados em WCAG 2.1 AA; os
  valores das razões estão anotados ao lado de cada token em `base.css`.
- **Foco visível** — `:focus-visible` com anel de alto contraste em todos os
  interativos.
- **Semântica** — um único `<h1>` por página, headings sem pular níveis,
  `<nav>`/`<main>`/`<section aria-labelledby>`, skip-link para o conteúdo.
- **Alvos de toque** — mínimo de 44×44px em links e botões.
- **Movimento** — `prefers-reduced-motion: reduce` desliga todas as animações.
- **Ícones** — decorativos com `aria-hidden`; acionáveis com `aria-label`.

### Progressive enhancement

A página é **100% funcional sem JavaScript**. O `site.js` apenas adiciona
camadas opcionais (animação de entrada, scroll spy, ofuscação leve do e-mail) e
degrada com segurança onde a API `IntersectionObserver` não existe. O estado
visível é sempre o padrão — nenhum conteúdo depende de JS para aparecer.

Nenhum dado é gravado em `localStorage` ou `sessionStorage`.

---

## Como rodar localmente

Por serem arquivos estáticos, basta servir a pasta raiz. Exemplos:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx, sem instalar nada)
npx serve .
```

Depois abra `http://localhost:8000`.

> Abrir o `index.html` direto via `file://` também funciona, mas servir por
> HTTP reproduz fielmente o comportamento de produção (incluindo caminhos
> relativos entre as versões de idioma).

---

## Convenções de código

- **CSS** — organizado em seções numeradas e comentadas; nomes de classe em
  padrão BEM-like (`.bloco__elemento--modificador`); zero `!important` fora do
  bloco de override de movimento reduzido.
- **JS** — uma função pura e documentada (JSDoc) por responsabilidade,
  orquestradas por um `init()`; sem variáveis globais (tudo num IIFE em
  `'use strict'`).
- **HTML** — canônico e validável: todo elemento não-void é fechado
  explicitamente, atributos entre aspas duplas.

---

© 2026 Luara Oliveira · Desenhado, codificado e publicado por mim.
