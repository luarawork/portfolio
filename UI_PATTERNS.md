# UI Patterns — Portfólio Luara Oliveira

Referência rápida do design system e da arquitetura de conteúdo deste projeto.
Para decisões arquiteturais e racional completo, ver [README.md](README.md).

---

## Stack tecnológico

| Camada        | Tecnologia                                                    |
| ------------- | -------------------------------------------------------------- |
| Marcação      | HTML5 semântico, sem framework                                 |
| Estilo        | CSS puro com custom properties (`:root`), sem pré-processador   |
| Comportamento | JavaScript vanilla (ES2015+), zero dependências, sem build step |
| Tipografia    | Google Fonts — Playfair Display, DM Serif Display, DM Sans, DM Mono |
| Build/deploy  | Nenhum. Arquivos estáticos servidos diretamente (Netlify)       |

Não há `package.json`, `node_modules`, bundler ou transpilação. Qualquer
servidor de arquivos estáticos roda o site (`python3 -m http.server`,
`npx serve .`, etc.).

---

## Paleta de cores

Definida em custom properties no `:root` de [assets/css/base.css](assets/css/base.css)
(tema "navy", padrão da landing e usado como base por todos os cases).
Contraste validado em WCAG 2.1 AA (texto ≥ 4.5:1, UI ≥ 3:1).

| Token                 | Valor                        | Uso                                   |
| --------------------- | ----------------------------- | -------------------------------------- |
| `--bg-base`           | `#0d1a2e`                     | Fundo da página                        |
| `--bg-card`           | `#1a2f4a`                     | Fundo de cards e boxes                 |
| `--bg-hover`          | `#1f3a58`                     | Hover de cards/botões                  |
| `--accent-primary`    | `#a8c4d4` (9.5:1 sobre bg)    | Links, ícones, títulos em destaque     |
| `--accent-bright`     | `#c8dde8`                     | Hover de accent, estado ativo          |
| `--accent-secondary`  | `#5a8fa8` (4.9:1 sobre bg)    | Eyebrows, labels, bordas de destaque    |
| `--text-primary`      | `#e8f0f5` (15:1)              | Títulos, texto principal               |
| `--text-body`         | `#7a9db5` (6.1:1)             | Parágrafos                             |
| `--text-meta`         | `#88a0b3` (6.4:1)             | Texto secundário/metadados             |
| `--line-soft`         | `rgba(168,196,212,.12)`       | Bordas padrão                          |
| `--line-hair`         | `rgba(168,196,212,.06)`       | Bordas muito sutis (divisores)         |
| `--tint-accent`       | `rgba(168,196,212,.06)`       | Fundo translúcido em hover             |
| `--tint-strong`       | `rgba(168,196,212,.12)`       | Fundo translúcido para selos ativos    |
| `--nav-bg`            | `rgba(13,26,46,.82)`          | Fundo do nav (com `backdrop-filter`)   |

**Cor-assinatura por case** — cada página em `cases/` sobrescreve apenas os
tokens de cor num `<style>` inline no `<head>`, mantendo o mesmo esqueleto
(`case.css`/`base.css`). Cores atuais:

| Case                | `--sig` (usado nos cards da home) |
| ------------------- | ---------------------------------- |
| Jornada Integrada   | `#c9a961` (dourado)                |
| Watcher             | `#F5D407` (amarelo)                 |
| ITSM ServiceNow     | `#4db8a8` (verde-água)              |
| AcessaBR            | `#D97757` (terracota) — único tema **claro**, mesmo esqueleto |

---

## Tipografia

Fontes carregadas via Google Fonts no `<head>` de cada página:
`DM+Serif+Display`, `Playfair+Display` (ital/wght 400,600,700), `DM+Sans`
(300,400,500), `DM+Mono` (400,500).

| Token     | Família                                              | Uso                                   |
| --------- | ------------------------------------------------------ | -------------------------------------- |
| `--serif` | `Playfair Display`, Georgia, serif                     | Títulos (`h1`, `h2`, `.section__title`, `.case-title`) |
| `--sans`  | `DM Sans`, system-ui, sans-serif                       | Corpo de texto (peso padrão 300)       |
| `--mono`  | `DM Mono`, ui-monospace, monospace                     | Eyebrows, tags, nav, labels, botões (uppercase, letter-spacing) |
| —         | `DM Serif Display` (itálico)                           | Wordmark dos cards de case (`.case-card__wordmark`) |

Escalas notáveis (usando `clamp()` para responsividade fluida):
- `.hero__title`: `clamp(48px, 8vw, 84px)`, peso 600
- `.section__title`: `clamp(26px, 3.6vw, 36px)`, peso 600
- `.hero__lead` / `.case-hero__lead`: itálico, `clamp(19–20px, 2.5vw, 26–27px)`
- Corpo (`.prose p`, `.about__body p`): 16–16.5px, `line-height: 1.7–1.8`

---

## Padrões de componentes recorrentes

Todos definidos em [assets/css/base.css](assets/css/base.css) (esqueleto
compartilhado) e especializados em [assets/css/landing.css](assets/css/landing.css)
(só home) ou [assets/css/case.css](assets/css/case.css) (só páginas de case).

- **Nav fixo** (`.nav`) — marca + links de seção (scroll spy via JS) + ícones
  sociais + seletor de idioma. Colapsa para duas linhas abaixo de 560px.
- **Botão de retorno flutuante** (`.case-fab`) — usado em páginas de case e na
  página "em construção"; vira estático em mobile.
- **Eyebrow** (`.eyebrow`) — label mono uppercase acima de cada título de seção.
- **Selo** (`.selo`) — natureza do case: `.selo--real` (cliente real) vs
  `.selo--conceito` (projeto conceitual). Sempre separado das tags.
- **Tags** (`.tag`) — disciplinas/skills tratadas, mono, borda sutil.
- **Botões/CTAs** (`.btn`, `.btn--fill`) — mínimo 44×44px de alvo de toque.
- **Case card** (`.case-card`) — usado na grid de cases da home; capa 16:10
  com cor-assinatura (`--sig`) via `color-mix()`, wordmark tipográfico,
  selo, título, descrição, métrica opcional, tags, CTA "Ver case →".
- **Skill card** (`.skill-card`) — grid de competências; variante
  `.skill-card--accent` com borda superior de destaque.
- **Principle box** (`.principle-box`) — box de citação/princípio de trabalho
  na seção Sobre.
- **Componentes de case** (`case.css`): `.case-hero`, `.case-meta` (grid de
  4 colunas: Papel/Time/Métodos/Resultado), `.pull` (pull-quote), `.highlight`,
  `.card`, `.pillar` (item numerado), `.metric`, `.steps` (fluxo numerado),
  `.case-table`, `.img-slot` (placeholder de imagem 16:10), `.case-closing`
  (encerramento com citação), `.case-next` (navegação entre cases).
- **Reveal on-scroll** (`.reveal` + `site.js`) — anima apenas `transform`
  (nunca `opacity`), então o conteúdo é sempre visível mesmo sem JS ou com
  `prefers-reduced-motion: reduce`.

---

## Estrutura de pastas

```
.
├── index.html                  # Landing (PT — idioma padrão, raiz)
├── en/                         # Versão em inglês — mesma estrutura e IDs
│   ├── index.html
│   └── cases/
├── es/                         # Versão em espanhol — mesma estrutura e IDs
│   ├── index.html
│   └── cases/
├── cases/                      # Páginas de case (PT)
│   ├── jornada-integrada.html
│   ├── watcher.html
│   ├── itsm-servicenow.html
│   └── acessabr.html
├── assets/
│   ├── css/
│   │   ├── base.css            # Esqueleto + tokens (tema navy)
│   │   ├── landing.css         # Componentes exclusivos da home
│   │   └── case.css            # Estrutura compartilhada dos cases
│   ├── js/site.js              # Comportamento progressivo da landing
│   ├── favicon.svg
│   └── og-image.png
├── screenshots/                # Capturas de referência (não usadas em produção)
├── uploads/                    # Rascunhos/versões antigas de cases e imagens-fonte
├── sitemap.xml                 # hreflang recíproco das 3 línguas
└── robots.txt
```

Cada versão de idioma (`/`, `/en/`, `/es/`) replica a **mesma estrutura, IDs e
classes** — só o texto muda. Isso é o que permite reaproveitar 100% do CSS/JS
entre idiomas.

---

## Como adicionar uma nova seção ou página

### Nova seção na landing
1. Adicione o `<section id="..." class="wrap section reveal" aria-labelledby="...-title">`
   dentro de `<main>` em `index.html` (e replique em `en/index.html` e
   `es/index.html` com o texto traduzido, mantendo o mesmo `id`).
2. Use `.eyebrow` + `.section__title` (com `<em>` opcional para destaque em
   itálico) como cabeçalho padrão.
3. Adicione o link correspondente em `.nav__sections` com `data-sec="<id>"`
   nas 3 versões de idioma — o scroll spy (`site.js`) já cobre qualquer
   `section[id]` dentro de `<main>` automaticamente.
4. Estilize componentes exclusivos dessa seção em `landing.css`; nunca
   duplique o que já existe em `base.css`.

### Novo case
1. Copie um `cases/*.html` existente como ponto de partida (ex.: `watcher.html`
   para tema escuro, `acessabr.html` para tema claro).
2. No `<head>`, sobrescreva **apenas os tokens de cor** num `<style>` inline
   (`--bg-base`, `--bg-card`, `--accent-primary`, etc.) para a nova
   cor-assinatura — não toque em layout ou tipografia.
3. Mantenha a estrutura: `.case-fab` → `.case-hero` (`__top`, `__title`,
   `__lead`, `__tags`) → `.case-meta` (4 colunas) → seções (`.case-section`)
   compostas por `.prose`, `.pull`, `.highlight`, `.pillar`, `.metric`,
   `.steps`, `.case-table`, `.img-slot` conforme o conteúdo → `.case-closing`
   → `.case-next`.
4. Adicione o card na grid de cases da home (`.case-card`, com `style="--sig:#hex"`)
   nas 3 versões de idioma.
5. Replique o arquivo em `en/cases/` e `es/cases/` com o texto traduzido.
6. Atualize `sitemap.xml` com as 3 URLs e os `hreflang` recíprocos.

### Nova página de nível superior
Herde `base.css`, inclua nav e footer padrão, e crie a versão espelhada em
`en/` e `es/`.

---

## Como alterar conteúdo de texto e imagens

- **Texto**: edite diretamente o HTML da página. Como PT/EN/ES compartilham
  IDs e classes, ao alterar um texto lembre de replicar a mudança de
  significado (não a mesma string) nas 3 versões (`index.html`, `en/index.html`,
  `es/index.html`, e equivalentes em `cases/`).
- **E-mail de contato**: não editar no HTML — é montado em runtime por
  `assembleEmail()` em [assets/js/site.js](assets/js/site.js) (anti-spam leve).
  Altere o `user`/`domain` ali para trocar o endereço.
- **Imagens**: hoje as capas dos cases (`.case-card__cover`) são puramente
  tipográficas (sem `<img>`), prontas para receber uma thumbnail — para
  adicionar uma, insira `<img>` dentro do elemento com `.case-card__cover`
  (ou `.img-slot` dentro de um case) preenchendo via `object-fit: cover`.
- **Retrato/imagens pessoais**: nenhuma página em produção usa `<img>` hoje
  (a home não tem foto de perfil). Fontes originais e rascunhos não usados
  em produção ficam em `uploads/` (não referenciadas pelo HTML final).
- **Metadados de SEO/Open Graph**: no `<head>` de cada página (`title`,
  `meta description`, `og:*`, `twitter:*`, `canonical`, `hreflang`).

---

## Convenções de código

- **CSS** — seções numeradas e comentadas; classes em padrão BEM-like
  (`.bloco__elemento--modificador`); zero `!important` fora do bloco de
  `prefers-reduced-motion`.
- **JS** — uma função pura e documentada (JSDoc) por responsabilidade,
  orquestradas por um único `init()`; tudo dentro de um IIFE `'use strict'`,
  sem variáveis globais.
- **HTML** — canônico e validável: elementos não-void sempre fechados,
  atributos entre aspas duplas.
- **Acessibilidade** — trate como requisito em qualquer adição: um único
  `<h1>` por página, heading levels sem pular, `:focus-visible` visível,
  alvos de toque ≥ 44×44px, `aria-hidden` em ícones decorativos,
  `prefers-reduced-motion` sempre respeitado.
