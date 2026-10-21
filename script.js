/**
 * 6° ANIVERSARIO DE POLOLEO · VALDIVIA & THE LEGEND OF ZELDA
 * Lógica interactiva: Selector de hospedajes, itinerario con filtros,
 * HUD de corazones, sintetizador Web Audio para Zelda SFX y Nana de Zelda,
 * y partículas mágicas de hadas.
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. DATOS DE HOSPEDAJES (Configurables cuando tengas los links/detalles)
     ========================================================================== */
  const STAYS_DATA = [
    {
      id: 1,
      title: "Refugio Nativo en Torobayo",
      subtitle: "Cabaña & Bosque Valdiviano",
      platform: "Airbnb · Próximamente link",
      badge: "Naturaleza & Tinaja",
      description:
        "Cabaña rodeada de bosque nativo y tranquilidad absoluta, ideal para desconectarse del ruido, escuchar la lluvia sureña y disfrutar de noches estrelladas en pareja con opción de tinaja caliente.",
      amenities: [
        "🌲 Entorno natural y silencioso en Torobayo",
        "🔥 Chimenea / Calefacción a leña acogedora",
        "🛁 Tinaja de relajación de agua caliente",
        "🍳 Cocina full equipada para cocinar juntos"
      ],
      url: "#"
    },
    {
      id: 2,
      title: "Loft Ribereño Valdiviano",
      subtitle: "Frente al Río Calle-Calle",
      platform: "Booking · Próximamente link",
      badge: "Vista Panorámica",
      description:
        "Despertar viendo los barcos y cisnes de cuello negro pasar lentamente por el río Calle-Calle. Ubicación privilegiada con ventanales piso a cielo, balcón privado y luz natural del sur.",
      amenities: [
        "🌅 Vista panorámica directa al río",
        "☕ Terraza para desayunos contemplando la corriente",
        "🚶 A pasos caminando de la costanera fluvial",
        "🛋️ Living de concepto abierto muy luminoso"
      ],
      url: "#"
    },
    {
      id: 3,
      title: "Departamento Chic en Isla Teja",
      subtitle: "Epicentro Gastronómico & Bohemio",
      platform: "Airbnb · Próximamente link",
      badge: "Ubicación Gourmet",
      description:
        "En el barrio más entretenido y seguro de Valdivia. Podremos salir caminando a almorzar o cenar en Bundor, Dominga Bistró o Rogusta sin preocuparnos de autos ni traslados.",
      amenities: [
        "🍻 Caminable a las mejores cervecerías y bistrós",
        "🛋️ Decoración moderna, cama king y calefacción central",
        "🔒 Estacionamiento privado y edificio con seguridad",
        "🌿 Entorno residencial hermoso arbolado"
      ],
      url: "#"
    },
    {
      id: 4,
      title: "Suite Romántica General Lagos",
      subtitle: "Casona Histórica Tradicional",
      platform: "Booking · Próximamente link",
      badge: "Encanto Tradicional",
      description:
        "Alojamiento con arquitectura de madera típica alemana-valdiviana en el barrio patrimonial de General Lagos. Un espacio íntimo, cálido y lleno de historia con jardín interior secreto.",
      amenities: [
        "✨ Maderas nobles valdivianas y techos altos",
        "🪴 Jardín interior de helechos y camelias",
        "☕ Máquina espresso y amenidades de cortesía",
        "🕯️ Ambiente romántico perfecto para aniversario"
      ],
      url: "#"
    }
  ];

  /* ==========================================================================
     2. DATOS DE LOS 6 CORAZONES (RECUERDOS DE CADA AÑO)
     ========================================================================== */
  const MEMORIES_DATA = {
    1: {
      badge: "AÑO 1 · EL COMIENZO DE LA LEYENDA",
      title: "Donde Empezó Todo",
      text: "El primer latido de nuestra historia. Aquel año en que nos conocimos y descubrimos que la complicidad, las risas espontáneas y las conversaciones infinitas eran solo el preludio de algo extraordinario.",
      stats: ["🌱 Primeras Citas", "✨ Magia Pura", "💖 Corazón Desbloqueado"]
    },
    2: {
      badge: "AÑO 2 · DESCUBRIRNOS Y CRECER",
      title: "Aventuras de Dos",
      text: "Nos convertimos en el refugio del otro. Compartimos escapadas, películas, planes locos y la certeza absoluta de que el mundo siempre es mejor y más divertido cuando estamos juntos.",
      stats: ["🗺️ Primeros Viajes", "☕ Tardes de Café", "🌿 Unión Inquebrantable"]
    },
    3: {
      badge: "AÑO 3 · SUPERANDO CADA TEMPLO",
      title: "Fuerza y Complicidad",
      text: "Como en las mejores aventuras, también hubo templos difíciles y días desafiantes. Pero cada uno de ellos lo superamos tomados de la mano, con más paciencia, ternura y lealtad.",
      stats: ["🛡️ Escudo y Espada", "🤝 Confianza Total", "💪 Más Fuertes Juntos"]
    },
    4: {
      badge: "AÑO 4 · INSEPARABLES",
      title: "Nuestro Propio Hogar Emocional",
      text: "Una etapa de risas cómplices que solo nosotros dos entendemos, de códigos secretos y de saber qué piensa el otro con tan solo una mirada. 4 años forjando un amor blindado.",
      stats: ["🔐 Códigos Secretos", "✨ Risas Incontrolables", "🥰 Amor Maduro"]
    },
    5: {
      badge: "AÑO 5 · MADUREZ Y SUEÑOS GRANDES",
      title: "Proyectando el Futuro",
      text: "5 años celebrando cada meta personal como un triunfo compartido. Apoyándonos en todo momento con admiración mutua y construyendo las bases de una vida llena de felicidad.",
      stats: ["⭐ Metas Compartidas", "🌟 Admiración Mutua", "🏡 Amor Sólido"]
    },
    6: {
      badge: "AÑO 6 · CELEBRACIÓN DE AMOR",
      title: "¡Nuestra Próxima Gran Misión: Valdivia!",
      text: "Cumplimos 6 años de pololeo y lo celebramos como corresponde: una semana entera navegando ríos, brindando con cervezas artesanales, probando la mejor gastronomía y descansando abrazados en el sur de Chile. ¡Eres mi persona favorita en todo el mundo!",
      stats: ["✨ 2.190+ Días Juntos", "🌿 Incontables Risas", "💖 100% Vida Llena"]
    }
  };

  /* ==========================================================================
     3. SINTETIZADOR WEB AUDIO API (SONIDOS DE HYRULE Y NANA DE ZELDA)
     ========================================================================== */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem("zelda_sound_enabled") !== "false"; // Activo por defecto

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Melodía clásica de Secreto Descubierto de Zelda (Ocarina of Time)
  function playSecretSfx() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { f: 783.99, d: 0.11 }, // G5
      { f: 739.99, d: 0.11 }, // F#5
      { f: 622.25, d: 0.11 }, // D#5
      { f: 440.0,  d: 0.11 }, // A4
      { f: 415.3,  d: 0.11 }, // G#4
      { f: 659.25, d: 0.11 }, // E5
      { f: 830.61, d: 0.11 }, // G#5
      { f: 1046.5, d: 0.45 }  // C6
    ];

    let time = Math.max(ctx.currentTime, 0.001);
    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(n.f, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.35, time + 0.02);
      gain.gain.linearRampToValueAtTime(0.001, time + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + n.d);

      time += n.d * 0.82;
    });
  }

  // Sonido de recoger un Corazón de Contenedor
  function playHeartSfx() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Sonido campana mágica de Navi
  function playNaviChime() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [1318.51, 1760.0].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.22);
    });
  }

  // Nana de Zelda (Zelda's Lullaby) sintetizada suavemente con vibrato
  let isPlayingLullaby = false;
  let lullabyTimeout = null;

  function playZeldasLullaby() {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (isPlayingLullaby) {
      stopZeldasLullaby();
      return;
    }

    isPlayingLullaby = true;
    updateLullabyBtn(true);
    showToast("🎶 Sonando: Nana de Zelda (Melodía de Nuestro Amor)");

    // Notas de la Nana de Zelda (B4, D5, A4, B4, D5, A4, B4, D5, A5, G5, D5, C5, B4, A4...)
    const melody = [
      { f: 493.88, d: 0.55 }, // B4
      { f: 587.33, d: 0.35 }, // D5
      { f: 440.00, d: 0.80 }, // A4
      { f: 493.88, d: 0.55 }, // B4
      { f: 587.33, d: 0.35 }, // D5
      { f: 440.00, d: 0.80 }, // A4
      { f: 493.88, d: 0.55 }, // B4
      { f: 587.33, d: 0.35 }, // D5
      { f: 880.00, d: 0.60 }, // A5
      { f: 783.99, d: 0.35 }, // G5
      { f: 587.33, d: 0.60 }, // D5
      { f: 523.25, d: 0.35 }, // C5
      { f: 493.88, d: 0.40 }, // B4
      { f: 440.00, d: 0.90 }  // A4
    ];

    let time = ctx.currentTime + 0.05;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, time);

      // Envolvente suave estilo caja de música de Ocarina
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.28, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + note.d);

      time += note.d * 0.95;
    });

    const totalDuration = (time - ctx.currentTime) * 1000;
    lullabyTimeout = setTimeout(() => {
      isPlayingLullaby = false;
      updateLullabyBtn(false);
    }, totalDuration);
  }

  function stopZeldasLullaby() {
    isPlayingLullaby = false;
    if (lullabyTimeout) clearTimeout(lullabyTimeout);
    updateLullabyBtn(false);
    showToast("Melodía pausada");
  }

  function updateLullabyBtn(playing) {
    const btn = document.getElementById("btnPlayTheme");
    const icon = document.getElementById("playerBtnIcon");
    if (btn && icon) {
      if (playing) {
        icon.textContent = "⏸ Pausar Melodía";
        btn.classList.add("is-playing");
      } else {
        icon.textContent = "▶ Tocar Melodía";
        btn.classList.remove("is-playing");
      }
    }
  }

  // Botón de alternancia de Sonido Global
  function initSoundToggle() {
    const btn = document.getElementById("soundToggleBtn");
    if (!btn) return;

    function renderState() {
      if (isSoundEnabled) {
        btn.classList.add("active");
        btn.innerHTML = `
          <svg class="btn-icon" aria-hidden="true"><use href="#i-sound-on"/></svg>
          <span class="btn-label">Audio ON</span>
        `;
        btn.setAttribute("title", "Audio de Hyrule Activado (Clic para silenciar)");
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `
          <svg class="btn-icon" aria-hidden="true"><use href="#i-sound-off"/></svg>
          <span class="btn-label">Silenciado</span>
        `;
        btn.setAttribute("title", "Audio de Hyrule Silenciado (Clic para activar)");
      }
    }

    renderState();

    btn.addEventListener("click", () => {
      isSoundEnabled = !isSoundEnabled;
      localStorage.setItem("zelda_sound_enabled", isSoundEnabled);
      renderState();
      getAudioContext();

      if (isSoundEnabled) {
        playSecretSfx();
        showToast("Sonidos mágicos de Hyrule activados 🎶");
      } else {
        if (isPlayingLullaby) stopZeldasLullaby();
        showToast("Sonidos silenciados 🔇");
      }
    });

    // Melodía desde botón del Hero y del reproductor
    const btnHeroLullaby = document.getElementById("btnPlayLullaby");
    const btnScrollLullaby = document.getElementById("btnPlayTheme");

    if (btnHeroLullaby) {
      btnHeroLullaby.addEventListener("click", () => {
        getAudioContext();
        playZeldasLullaby();
      });
    }

    if (btnScrollLullaby) {
      btnScrollLullaby.addEventListener("click", () => {
        getAudioContext();
        playZeldasLullaby();
      });
    }
  }

  /* ==========================================================================
     4. EFECTO 3D TILT EN LA TARJETA DEL HERO
     ========================================================================== */
  function initCardTilt() {
    const card = document.getElementById("card3d");
    if (!card) return;

    const frame = card.querySelector(".card-frame");
    if (!frame) return;

    frame.addEventListener("mousemove", (e) => {
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    frame.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });

    // Hada Navi compañera interactiva
    const fairy = document.getElementById("fairyNavi");
    const speech = document.getElementById("fairySpeech");
    const naviPhrases = [
      "¡Hey, Listen! Te amo con todo mi corazón 💚",
      "¡Prepara las maletas! Valdivia nos espera 🎒",
      "¡6 años de amor puro y aventuras! ✨",
      "¡Eres mi persona favorita en todo Hyrule! 👑",
      "¡Elige nuestro hospedaje favorito abajo! 🏡"
    ];

    if (fairy && speech) {
      fairy.addEventListener("click", () => {
        playNaviChime();
        const randomPhrase = naviPhrases[Math.floor(Math.random() * naviPhrases.length)];
        speech.textContent = randomPhrase;
        speech.classList.add("show");
        setTimeout(() => speech.classList.remove("show"), 3200);
      });
    }
  }

  /* ==========================================================================
     5. HUD DE CORAZONES: 6 AÑOS DE POLOLEO
     ========================================================================== */
  function initHeartsHud() {
    const heartButtons = document.querySelectorAll(".heart-item");
    const badge = document.getElementById("memoryBadge");
    const title = document.getElementById("memoryTitle");
    const text = document.getElementById("memoryText");
    const memoryBox = document.getElementById("heartMemoryBox");

    heartButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const year = btn.getAttribute("data-year");
        const data = MEMORIES_DATA[year];
        if (!data) return;

        playHeartSfx();

        // Actualiza botón activo
        heartButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Transición en el contenedor
        if (memoryBox) {
          memoryBox.style.opacity = "0.4";
          memoryBox.style.transform = "translateY(6px)";

          setTimeout(() => {
            if (badge) badge.textContent = data.badge;
            if (title) title.textContent = data.title;
            if (text) text.textContent = data.text;

            const statsContainer = memoryBox.querySelector(".memory-stats");
            if (statsContainer && data.stats) {
              statsContainer.innerHTML = data.stats.map((s) => `<span>${s}</span>`).join("");
            }

            memoryBox.style.opacity = "1";
            memoryBox.style.transform = "translateY(0)";
          }, 150);
        }
      });
    });
  }

  /* ==========================================================================
     6. SELECTOR DE HOSPEDAJES (4 OPCIONES PARA ELEGIR 1)
     ========================================================================== */
  function initStays() {
    const savedStayId = localStorage.getItem("zelda_selected_stay");
    const summaryValue = document.getElementById("selectedStayName");

    function applyStaySelection(id, notify = false) {
      document.querySelectorAll(".stay-card").forEach((card) => {
        const cardId = card.getAttribute("data-stay-id");
        const btn = card.querySelector(".btn-vote-stay");
        const icon = btn ? btn.querySelector(".vote-icon") : null;
        const txt = btn ? btn.querySelector(".vote-text") : null;

        if (cardId === String(id)) {
          card.classList.add("is-chosen");
          if (icon) icon.textContent = "💖";
          if (txt) txt.textContent = "¡Nuestra Elección Favorita!";
        } else {
          card.classList.remove("is-chosen");
          if (icon) icon.textContent = "🤍";
          if (txt) txt.textContent = "Elegir como Nuestro Refugio";
        }
      });

      const found = STAYS_DATA.find((s) => s.id === Number(id));
      if (found && summaryValue) {
        summaryValue.textContent = `✨ ${found.title}`;
      }

      if (notify && found) {
        playSecretSfx();
        showToast(`🎉 ¡Elegiste la Opción ${found.id}: ${found.title}!`);
      }
    }

    if (savedStayId) {
      applyStaySelection(savedStayId, false);
    }

    // Escuchador en los botones de votar
    document.querySelectorAll(".btn-vote-stay").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = btn.getAttribute("data-target-id");
        localStorage.setItem("zelda_selected_stay", targetId);
        applyStaySelection(targetId, true);
      });
    });

    // Modal de Hospedajes
    window.handleStayDetails = function (event, stayId) {
      event.preventDefault();
      const stay = STAYS_DATA.find((s) => s.id === stayId);
      if (!stay) return;

      const modal = document.getElementById("stayModal");
      const modalBadge = document.getElementById("modalBadge");
      const modalTitle = document.getElementById("modalTitle");
      const modalBody = document.getElementById("modalBody");
      const modalVoteBtn = document.getElementById("modalVoteBtn");

      if (modalBadge) modalBadge.textContent = `Opción 0${stay.id} · ${stay.subtitle}`;
      if (modalTitle) modalTitle.textContent = stay.title;

      if (modalBody) {
        modalBody.innerHTML = `
          <p style="margin-bottom: 1.2rem; font-size: 1.05rem; line-height: 1.6;">${stay.description}</p>
          <div style="background: rgba(15, 31, 53, 0.7); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(92, 180, 209, 0.2); margin-bottom: 1.4rem;">
            <strong style="color: var(--gold-triforce-light); display: block; margin-bottom: 0.6rem; font-family: var(--font-epic);">Amenidades & Detalles:</strong>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
              ${stay.amenities.map((a) => `<li>${a}</li>`).join("")}
            </ul>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
            * Plataforma estimada: <strong>${stay.platform}</strong>. Puedes pasarme los enlaces exactos cuando gustes para enlazar tu reserva directa.
          </p>
        `;
      }

      if (modalVoteBtn) {
        modalVoteBtn.onclick = () => {
          localStorage.setItem("zelda_selected_stay", stay.id);
          applyStaySelection(stay.id, true);
          closeStayModal();
        };
      }

      if (modal) {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      }
    };

    function closeStayModal() {
      const modal = document.getElementById("stayModal");
      if (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    }

    const closeBtn = document.getElementById("stayModalClose");
    const backdrop = document.getElementById("stayModalBackdrop");
    if (closeBtn) closeBtn.addEventListener("click", closeStayModal);
    if (backdrop) backdrop.addEventListener("click", closeStayModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeStayModal();
    });
  }

  /* ==========================================================================
     7. ITINERARIO DE SALIDAS EN VALDIVIA (FILTROS, FAVORITOS Y CHECKED)
     ========================================================================== */
  function initItinerary() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const placeCards = document.querySelectorAll(".place-card");

    // Filtrado interactivo
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        placeCards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          if (filter === "all" || cat === filter) {
            card.style.display = "flex";
            card.style.animation = "fadePlace 0.35s ease forwards";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Manejo de Favoritos en LocalStorage
    const savedFavorites = JSON.parse(localStorage.getItem("valdivia_favs") || "{}");
    const savedVisited = JSON.parse(localStorage.getItem("valdivia_visited") || "{}");

    placeCards.forEach((card) => {
      const favBtn = card.querySelector(".btn-fav-place");
      const placeId = favBtn ? favBtn.getAttribute("data-place-id") : null;
      const visitedInput = card.querySelector("input[data-visited-id]");

      // Cargar favoritos guardados
      if (placeId && savedFavorites[placeId]) {
        card.classList.add("is-favorite");
      }

      // Cargar visitados guardados
      if (visitedInput && savedVisited[placeId]) {
        visitedInput.checked = true;
        card.classList.add("is-visited");
      }

      // Toggle favorito
      if (favBtn && placeId) {
        favBtn.addEventListener("click", () => {
          const isFav = card.classList.toggle("is-favorite");
          savedFavorites[placeId] = isFav;
          localStorage.setItem("valdivia_favs", JSON.stringify(savedFavorites));

          if (isFav) {
            playHeartSfx();
            showToast("💖 ¡Lugar añadido a nuestras paradas soñadas!");
          }
        });
      }

      // Toggle visitado
      if (visitedInput && placeId) {
        visitedInput.addEventListener("change", () => {
          const isVisited = visitedInput.checked;
          if (isVisited) {
            card.classList.add("is-visited");
            playSecretSfx();
            showToast("✨ ¡Misión cumplida! Parada completada en Valdivia");
          } else {
            card.classList.remove("is-visited");
          }
          savedVisited[placeId] = isVisited;
          localStorage.setItem("valdivia_visited", JSON.stringify(savedVisited));
        });
      }
    });
  }

  /* ==========================================================================
     8. TOAST DE NOTIFICACIONES MÁGICAS
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("magicToast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3800);
  }

  /* ==========================================================================
     9. NAVBAR ACTIVE ON SCROLL
     ========================================================================== */
  function initNavbarScroll() {
    const navbar = document.getElementById("topNavbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 120;

      if (navbar) {
        if (window.scrollY > 40) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, { passive: true });
  }

  /* ==========================================================================
     10. CANVAS DE PARTÍCULAS: HADAS (NAVI), POLVO TRIFUERZA Y CORAZONES
     ========================================================================== */
  function initAmbientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Tipos de partículas: Hada Navi (azul cielo), Chispa Trifuerza (oro), Corazón (rojo/rosa)
    const PARTICLE_TYPES = ["fairy", "gold", "heart", "gold"];
    const count = Math.min(Math.floor(window.innerWidth / 28), 45);
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
        size: 1.5 + Math.random() * 3,
        speedY: 0.2 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.2 + Math.random() * 0.7,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseVal: Math.random() * Math.PI
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.pulseVal) * 0.3;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentOpacity = p.opacity * (0.6 + Math.sin(p.pulseVal) * 0.4);

        if (p.type === "heart") {
          // Dibujar un pequeño corazón
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(p.size * 0.5, p.size * 0.5);
          ctx.fillStyle = `rgba(230, 57, 70, ${currentOpacity})`;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-2, -3, -5, -1, -5, 2);
          ctx.bezierCurveTo(-5, 5, 0, 8, 0, 10);
          ctx.bezierCurveTo(0, 8, 5, 5, 5, 2);
          ctx.bezierCurveTo(5, -1, 2, -3, 0, 0);
          ctx.fill();
          ctx.restore();
        } else if (p.type === "fairy") {
          // Destello mágico azul cielo Navi
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92, 180, 209, ${currentOpacity})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#5cb4d1";
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Chispas doradas de la Trifuerza
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(246, 223, 96, ${currentOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#f6df60";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      requestAnimationFrame(render);
    }

    render();
  }

  /* ==========================================================================
     INICIALIZACIÓN AL CARGAR EL DOM
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initSoundToggle();
    initCardTilt();
    initHeartsHud();
    initStays();
    initItinerary();
    initNavbarScroll();
    initAmbientCanvas();
  });
})();

})();