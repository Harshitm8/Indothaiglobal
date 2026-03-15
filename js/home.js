/**
 * home.js — Indo Thai Global
 * Scroll reveal + video showcase
 *
 * Video behaviour:
 *  • Hover over player  → autoplay MUTED (browser policy requires this)
 *  • Mouse leaves       → pause (unless user clicked to play)
 *  • Click video        → toggle play / pause
 *  • 🔇 / 🔊 button     → toggle mute/unmute at any time
 *  • Scroll away        → auto-pause
 *  • Arrow nav          → switch panel
 */

(function () {
  'use strict';

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObs.observe(el);
    });
  }

  /* ══════════════════════════════════════════════════
     VIDEO SHOWCASE
  ══════════════════════════════════════════════════ */
  const panels     = document.querySelectorAll('.video-panel');
  const playerWrap = document.getElementById('videoPlayerWrap');
  const prevBtn    = document.getElementById('videoPrev');
  const nextBtn    = document.getElementById('videoNext');
  const dotsWrap   = document.getElementById('videoNavDots');
  const muteBtn    = document.getElementById('vpMuteBtn');
  const muteIcon   = document.getElementById('vpMuteIcon');

  if (!panels.length || !playerWrap) return;

  let activeIndex = 0;
  let isHovering  = false;
  let userPlaying = false;   // user explicitly clicked play
  let isMuted     = true;    // global mute state — starts muted (browser requires)

  /* ── Nav dots ── */
  panels.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'video-nav-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Go to video ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function getDots() { return dotsWrap.querySelectorAll('.video-nav-dot'); }
  function getVideo(panel) { return panel.querySelector('video'); }

  /* ── Update mute button icon + label ── */
  function updateMuteBtn(muted) {
    if (!muteBtn || !muteIcon) return;
    muteIcon.textContent = muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
    muteBtn.setAttribute('title',      muted ? 'Unmute'       : 'Mute');
    // Update label text if present
    var lbl = muteBtn.querySelector('.vp-mute-label');
    if (lbl) lbl.textContent = muted ? 'Unmute' : 'Mute';
  }

  /* ── Apply mute state to the active video ── */
  function applyMute(vid, muted) {
    if (!vid) return;
    vid.muted = muted;
    isMuted   = muted;
    updateMuteBtn(muted);
  }

  /* ── Progress bar ── */
  function bindProgress(panel) {
    const vid = getVideo(panel);
    const bar = panel.querySelector('.video-progress-bar');
    if (!vid || !bar) return;
    vid.addEventListener('timeupdate', function () {
      if (vid.duration) bar.style.width = (vid.currentTime / vid.duration * 100) + '%';
    });
    vid.addEventListener('ended', function () {
      bar.style.width = '0%';
      panel.classList.remove('is-playing');
      userPlaying = false;
      vid.currentTime = 0;
    });
  }

  /* ── Play a video ── */
  function playVideo(panel) {
    const vid = getVideo(panel);
    if (!vid) return;
    vid.muted = isMuted; // respect current mute state
    vid.play().then(function () {
      panel.classList.add('is-playing');
      updateMuteBtn(vid.muted);
    }).catch(function () {
      // Autoplay blocked — force muted and retry
      vid.muted = true;
      isMuted   = true;
      updateMuteBtn(true);
      vid.play().then(function () {
        panel.classList.add('is-playing');
      }).catch(function () {});
    });
  }

  /* ── Pause a video ── */
  function pauseVideo(panel) {
    const vid = getVideo(panel);
    if (!vid) return;
    vid.pause();
    panel.classList.remove('is-playing');
  }

  /* ── Switch panel ── */
  function goTo(index) {
    const cur = panels[activeIndex];
    pauseVideo(cur);
    cur.classList.remove('is-active');
    getDots()[activeIndex].classList.remove('is-active');

    activeIndex = (index + panels.length) % panels.length;
    userPlaying = false;

    panels[activeIndex].classList.add('is-active');
    getDots()[activeIndex].classList.add('is-active');

    // If mouse still hovering, preview new panel
    if (isHovering) {
      setTimeout(function () { playVideo(panels[activeIndex]); }, 60);
    }
  }

  /* ── Hover: silent autoplay preview ── */
  playerWrap.addEventListener('mouseenter', function () {
    isHovering = true;
    const active = panels[activeIndex];
    const vid = getVideo(active);
    if (vid && vid.paused && !userPlaying) {
      playVideo(active);
    }
    // Preload on first hover
    if (vid && vid.preload === 'none') vid.preload = 'auto';
  });

  playerWrap.addEventListener('mouseleave', function () {
    isHovering = false;
    if (!userPlaying) {
      pauseVideo(panels[activeIndex]);
    }
  });

  /* ── Click video: toggle play / pause ── */
  playerWrap.addEventListener('click', function (e) {
    // Ignore clicks on the mute button or arrow buttons
    if (e.target.closest('.vp-mute-btn') ||
        e.target.closest('.video-arrow')  ||
        e.target.closest('.video-nav-dot')) return;

    const active = panels[activeIndex];
    const vid    = getVideo(active);
    if (!vid) return;

    if (vid.paused) {
      userPlaying = true;
      playVideo(active);
    } else {
      userPlaying = false;
      pauseVideo(active);
    }
  });

  /* ── Mute / Unmute button ── */
  if (muteBtn) {
    muteBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't trigger the playerWrap click
      const vid = getVideo(panels[activeIndex]);
      if (!vid) return;

      if (vid.muted) {
        // User wants sound — unmute
        applyMute(vid, false);
        // If video isn't playing yet, start it now
        if (vid.paused) {
          userPlaying = true;
          playVideo(panels[activeIndex]);
        }
      } else {
        applyMute(vid, true);
      }
    });
  }

  /* ── Scroll away: auto-pause all ── */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          panels.forEach(function (p) { pauseVideo(p); });
          userPlaying = false;
          isHovering  = false;
        }
      });
    }, { threshold: 0.15 }).observe(playerWrap);
  }

  /* ── Arrow buttons ── */
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(activeIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(activeIndex + 1); });

  /* ── Init ── */
  panels.forEach(function (p) { bindProgress(p); });
  panels[0].classList.add('is-active');
  updateMuteBtn(true); // start showing 🔇

})();