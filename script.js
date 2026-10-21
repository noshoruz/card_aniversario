(function () {
  "use strict";

  const giftBtn = document.getElementById("giftBtn");
  const giftMenu = document.getElementById("giftMenu");
  const giftClose = document.getElementById("giftClose");

  /* ---------- Abrir / cerrar menú ---------- */
  function openMenu() {
    giftMenu.classList.add("is-open");
    giftMenu.setAttribute("aria-hidden", "false");
    giftBtn.setAttribute("aria-expanded", "true");
    giftBtn.classList.add("is-hidden");
    // Foco accesible en el botón de cerrar
    setTimeout(() => giftClose && giftClose.focus(), 120);
  }

  function closeMenu() {
    giftMenu.classList.remove("is-open");
    giftMenu.setAttribute("aria-hidden", "true");
    giftBtn.setAttribute("aria-expanded", "false");
    giftBtn.classList.remove("is-hidden");
    giftBtn.focus();
  }

  if (giftBtn) giftBtn.addEventListener("click", openMenu);
  if (giftClose) giftClose.addEventListener("click", closeMenu);

  // Cerrar al hacer clic fuera del panel
  if (giftMenu) {
    giftMenu.addEventListener("click", (e) => {
      if (e.target === giftMenu) closeMenu();
    });
  }

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && giftMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  /* ---------- Manejo de placeholders ---------- */
  // Mientras no haya URL real, evita que salten al principio de la página.
  document.querySelectorAll(".stay[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        link.classList.add("is-bump");
        setTimeout(() => link.classList.remove("is-bump"), 400);
      }
    });
  });

  /* ---------- Corazones flotantes decorativos ---------- */
  const heartsLayer = document.querySelector(".hearts");
  const HEART_CHARS = ["❤", "♥", "💙", "💚", "🩵"];

  function spawnHeart() {
    if (!heartsLayer) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 0.7 + Math.random() * 1.2 + "rem";
    const duration = 8 + Math.random() * 6; // 8–14s
    heart.style.animationDuration = duration + "s";
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  // Respeta reducción de movimiento
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    for (let i = 0; i < 4; i++) {
      setTimeout(spawnHeart, i * 700);
    }
    setInterval(spawnHeart, 1800);
  }
})();