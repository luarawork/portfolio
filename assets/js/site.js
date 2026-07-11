/**
 * ============================================================================
 * Luara Oliveira — Portfólio
 * site.js · Comportamento progressivo da landing page
 * ----------------------------------------------------------------------------
 * JavaScript vanilla, sem dependências e sem build step. O site é totalmente
 * funcional sem este arquivo (progressive enhancement): o JS apenas adiciona
 * camadas opcionais sobre uma página que já funciona em HTML + CSS.
 *
 * Responsabilidades (uma função pura por bloco):
 *   1. enableJsHook()        — sinaliza ao CSS que o JS está ativo (.js)
 *   2. assembleEmail()       — monta o e-mail em runtime (anti-spam leve)
 *   3. setupRevealOnScroll() — anima a entrada das seções ao rolar
 *   4. setupScrollSpy()      — destaca no nav a seção visível
 *
 * Princípios:
 *   • Nenhum dado é gravado em localStorage/sessionStorage.
 *   • prefers-reduced-motion é respeitado (animações desligadas).
 *   • Tudo degrada com segurança onde IntersectionObserver não existe.
 * ============================================================================
 */

(() => {
  'use strict';

  /**
   * Preferências do ambiente, lidas uma única vez na inicialização.
   * @typedef  {Object} Environment
   * @property {boolean} reduceMotion - usuário pediu menos movimento
   * @property {boolean} supportsIO   - IntersectionObserver disponível
   */

  /** @type {Environment} */
  const env = {
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    supportsIO: 'IntersectionObserver' in window,
  };

  // --- 1. Hook de CSS -------------------------------------------------------

  /**
   * Marca o documento como "JS ativo", permitindo que o CSS aplique estilos
   * que só fazem sentido com script (ex.: estado inicial das animações de
   * entrada). Sem isto, o conteúdo permanece visível por padrão.
   * @returns {void}
   */
  const enableJsHook = () => {
    document.documentElement.classList.add('js');
  };

  // --- 2. E-mail anti-spam --------------------------------------------------

  /**
   * Monta o endereço de e-mail em runtime para dificultar a coleta por bots,
   * mantendo o link funcional e acessível. Atende a dois tipos de alvo:
   *   • [data-email="href"] → recebe apenas o href mailto:
   *   • [data-email="text"] → recebe href mailto: e o texto visível
   * @returns {void}
   */
  const assembleEmail = () => {
    const user = 'luara.working';
    const domain = 'gmail.com';
    const address = `${user}@${domain}`;

    document.querySelectorAll('[data-email]').forEach((el) => {
      el.setAttribute('href', `mailto:${address}`);
      if (el.dataset.email === 'text') el.textContent = address;
    });
  };

  // --- 3. Reveal on-scroll --------------------------------------------------

  /**
   * Anima a entrada dos elementos .reveal conforme entram na viewport.
   *
   * A animação é puramente um enriquecimento: o estado-base do elemento já é
   * visível (ver landing.css). Por isso o pior caso possível — JS ausente,
   * movimento reduzido, ou pipelines de captura/PDF que congelam animações —
   * ainda exibe todo o conteúdo. Dois mecanismos de segurança garantem isso:
   *   • Failsafe imediato: revela o que já está próximo da viewport no load.
   *   • Failsafe temporal: revela tudo após 1,6s, independente de scroll.
   *
   * @returns {void}
   */
  const setupRevealOnScroll = () => {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    if (reveals.length === 0) return;

    const revealAll = () => reveals.forEach((el) => el.classList.add('is-visible'));

    // Caminho degradado: sem observer ou com movimento reduzido, mostra tudo.
    if (env.reduceMotion || !env.supportsIO) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // anima só uma vez
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    reveals.forEach((el) => observer.observe(el));

    // Failsafe 1 — revela imediatamente o que já está visível no carregamento.
    const viewportHeight = window.innerHeight || 800;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight * 1.1) {
        el.classList.add('is-visible');
      }
    });

    // Failsafe 2 — nada permanece oculto após um curto intervalo.
    window.setTimeout(revealAll, 1600);
  };

  // --- 4. Scroll spy (seção ativa no nav) -----------------------------------

  /**
   * Mantém aria-current="true" no link do nav correspondente à seção visível,
   * dando ao usuário (e a leitores de tela) uma referência de onde está na
   * página. Cada link aponta para uma seção via [data-sec="<id-da-seção>"].
   *
   * Sem efeito em páginas sem links [data-sec] (ex.: páginas de case), ou
   * onde IntersectionObserver não existe — degrada silenciosamente.
   *
   * @returns {void}
   */
  const setupScrollSpy = () => {
    const navLinks = Array.from(document.querySelectorAll('.nav__link[data-sec]'));
    if (navLinks.length === 0 || !env.supportsIO) return;

    // Índice id-da-seção → link, para lookup O(1) ao observar.
    const linkBySection = new Map(
      navLinks.map((link) => [link.dataset.sec, link])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => link.removeAttribute('aria-current'));
          linkBySection.get(entry.target.id)?.setAttribute('aria-current', 'true');
        });
      },
      // Faixa de ativação no terço superior da viewport — a seção "vira ativa"
      // um pouco antes de chegar ao topo, o que parece mais natural ao rolar.
      { threshold: 0.001, rootMargin: '-20% 0px -55% 0px' }
    );

    document.querySelectorAll('main section[id]').forEach((section) => {
      observer.observe(section);
    });
  };

  // --- Inicialização --------------------------------------------------------

  /**
   * Ponto de entrada. O script é carregado ao final do <body>, então o DOM
   * já está disponível e não é preciso aguardar DOMContentLoaded.
   * @returns {void}
   */
  const init = () => {
    enableJsHook();
    assembleEmail();
    setupRevealOnScroll();
    setupScrollSpy();
  };

  init();
})();
