# Portfólio · Luara Oliveira

**UX/UI Designer sênior, também atuando como Service Designer.**
Design de interface guiado por evidência — com pesquisa, service design, dados e código como extensões do mesmo trabalho.

**Ao vivo:** [luara.work](https://luara.work) &nbsp;·&nbsp; PT · [EN](https://luara.work/en/) · [ES](https://luara.work/es/)

---

## Sobre

Portfólio pessoal que reúne quatro cases — de trabalho real com cliente a projeto autoral open source — atravessando UX/UI, service design, pesquisa, dados e desenvolvimento.

O site foi concebido, desenhado, codificado e publicado pela própria autora, do design ao deploy. O código deste repositório é parte da demonstração: sem framework, sem build step, com acessibilidade e design system tratados como requisito, não como enfeite.

## Cases

| Case | Natureza | Resumo |
|------|----------|--------|
| [Jornada Integrada](https://luara.work/cases/jornada-integrada) | Cliente real | Redesenho sistêmico do onboarding de uma plataforma B2B de MDM, dissolvendo silos entre pré-venda, ativação e retenção. |
| [Watcher](https://luara.work/cases/watcher) | Projeto conceitual | App que reúne o que você assiste nas diferentes plataformas de streaming em um só lugar, com descoberta guiada por contexto. |
| [Jornada do Usuário em ITSM](https://luara.work/cases/itsm-servicenow) | Cliente real | Estruturação da jornada no ServiceNow, convertendo resistência em adoção estruturada e duradoura. |
| [Chuvarada](https://luara.work/cases/chuvarada) | Projeto autoral · Open Source | Mapa de risco hidrológico em tempo real para 28.483 bairros brasileiros, com score de 1 a 10 por bairro. |

## Características

- **Acessibilidade WCAG 2.1 AA** — contraste validado em todas as paletas, foco visível por teclado, suporte a `prefers-reduced-motion`, HTML semântico e navegação por teclado.
- **Trilíngue (PT / EN / ES)** com `hreflang` e estrutura espelhada entre idiomas.
- **Design system próprio** — tokens semânticos e uma cor-assinatura por case, sem depender de biblioteca de UI.
- **SEO** — dados estruturados `schema.org/Person` (JSON-LD), Open Graph e Twitter Card em todas as páginas.
- **Sem build step, sem framework** — HTML5, CSS puro e JavaScript vanilla.
- **Responsivo**, mobile-first.

## Stack

HTML5 semântico · CSS (custom properties, camadas) · JavaScript vanilla.
Tipografia via Google Fonts (Playfair Display, DM Sans, DM Mono).
Hospedagem: **Netlify**.

## Estrutura

```
portfolio/
├── index.html              # Home (PT — padrão)
├── en/                     # Versão em inglês (index + cases)
├── es/                     # Versão em espanhol (index + cases)
├── cases/
│   ├── jornada-integrada.html
│   ├── watcher.html
│   ├── itsm-servicenow.html
│   └── chuvarada.html
├── assets/
│   ├── css/                # base · landing · case
│   ├── js/                 # site.js
│   ├── chuvarada/          # capturas do produto
│   ├── favicon.svg
│   └── og-image.png
└── README.md
```

## Rodando localmente

Site estático, sem dependências. Basta servir a pasta:

```bash
# Python
python3 -m http.server 8000

# ou Node
npx serve
```

Depois, abra `http://localhost:8000`.

## Design system

Todos os componentes referenciam apenas **tokens semânticos** (`--accent`, `--surface`, `--ink`…), nunca cores fixas. A identidade da landing define os valores; **cada case sobrescreve sua cor-assinatura** (e o tema, quando necessário) sem tocar em nenhum componente. É o que mantém quatro identidades visuais distintas dentro de um sistema único.

## Contato

- Site — [luara.work](https://luara.work)
- LinkedIn — [in/luarawork](https://www.linkedin.com/in/luarawork/)
- GitHub — [luarawork](https://github.com/luarawork)
- Behance — [luarawork](https://www.behance.net/luarawork)
- Medium — [@luarawork](https://medium.com/@luarawork)
- E-mail — luara.working@gmail.com

## Licença

Conteúdo, textos, cases e imagens © 2026 Luara Oliveira. Todos os direitos reservados.

---

Desenhado, codificado e publicado por mim.
