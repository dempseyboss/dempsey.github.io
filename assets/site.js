(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const page = document.body.dataset.page || 'home';
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (v) => /^https:\/\//i.test(String(v || '')) ? String(v) : '';
  const icon = (name, size=20) => {
    const paths = {
      arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
      external: '<path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
      target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
      keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M7 16h10"/>',
      monitor: '<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
      tablet: '<rect x="3" y="3" width="16" height="18" rx="2"/><path d="M7 7h8m-7 9h7"/><path d="m19 8 2-3"/>',
      headphones: '<path d="M3 13v-2a9 9 0 0 1 18 0v2"/><rect x="2" y="12" width="4" height="8" rx="2"/><rect x="18" y="12" width="4" height="8" rx="2"/>',
      volume: '<path d="M11 5 6 9H3v6h3l5 4V5Zm4 4a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
      sliders: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="16" cy="17" r="2"/>',
      layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
      cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
      message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5Z"/>',
      video: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>',
      play: '<rect x="3" y="4" width="18" height="16" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>',
      github: '<circle cx="12" cy="12" r="9"/><path d="M8 20v-4a2 2 0 0 1-2-2m10 6v-4a2 2 0 0 0 2-2"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>',
      spark: '<path d="m12 2 1.9 7.1L21 11l-7.1 1.9L12 20l-1.9-7.1L3 11l7.1-1.9L12 2Z"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      tune: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/>',
      home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8"/>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
  };
  const titles = { home:'Home', settings:'Settings & Devices', skins:'Skins Library', setup:'Gaming Setup' };
  const navs = [['home','Home','index.html'],['settings','Settings','settings.html'],['skins','Skins','skins.html'],['setup','Setup','setup.html']];
  const link = (href,label,cls='') => `<a class="${cls}" href="${href}">${label}</a>`;
  const profileUrl = config.osuUsername ? `https://osu.ppy.sh/users/${encodeURIComponent(config.osuUsername)}` : '';
  const externalBtn = (url, label, cls='button button-primary') => url ? `<a href="${esc(url)}" class="${cls}" target="_blank" rel="noopener noreferrer">${label}${icon('external',16)}</a>` : '';
  const mediaLinks = (config.socials || []).map(s => safeUrl(s.url) ? `<a href="${esc(s.url)}" title="${esc(s.label)}" class="social-link" target="_blank" rel="noopener noreferrer">${icon(s.icon||'external',19)}<span>${esc(s.label)}</span>${icon('external',12)}</a>` : `<span class="social-link social-disabled" title="Add its URL in config.js">${icon(s.icon||'external',19)}<span>${esc(s.label)}</span>${icon('external',12)}</span>`).join('');
  const avatar = config.avatarImage ? `<img class="avatar-img" src="${esc(config.avatarImage)}" alt="Profile avatar">` : `<span class="avatar-symbol">✧</span>`;
  const brandMark = config.brandIconImage ? `<img class="brand-mark brand-mark-img" src="${esc(config.brandIconImage)}" alt="Site icon">` : `<span class="brand-mark">✳</span>`;
  const nav = navs.map(([p,name,url])=>`<a href="${url}" class="nav-link ${p===page?'active':''}" ${p===page?'aria-current="page"':''}>${name}</a>`).join('');
  const footer = `<footer class="footer"><span>© <span id="year"></span> ${esc(config.name||'yourname')}</span></footer>`;
  const shell = (body) => `
    <div class="ambient"><span class="ambient-purple"></span><span class="ambient-cyan"></span><span class="grid-overlay"></span></div>
    <div class="site"><header class="header"><div class="header-inner"><a class="brand" href="index.html">${brandMark}<span>${esc(config.shortName||'yn.')}</span></a><nav aria-label="Main navigation" class="nav">${nav}</nav><a class="header-cta" href="${page === 'home' ? 'settings.html' : 'index.html'}">${page === 'home' ? 'Explore' : 'Back home'} ${icon('arrow',15)}</a><button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button></div></header>
    <main>${body}</main>${footer}</div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  const speedVisual = `<div class="speed-display" aria-label="osu! speed player illustration">
    <div class="speed-display-top"><span class="speed-live-dot"></span><span>osu!standard</span><span class="speed-mode">DT // SPEED</span></div>
    <div class="speed-playfield speed-playfield-image-wrap" aria-hidden="true">
      <img class="speed-playfield-image" src="assets/hero-osu-screenshot.png" alt="osu! gameplay screenshot">
    </div>
    <div class="speed-display-info"><div><span class="speed-micro">PLAYSTYLE</span><strong>speed player<span>.</span></strong></div><span class="speed-pill">streams / bursts</span></div>
    <div class="sound-zone"><button id="memeSoundButton" class="meme-sound-btn" type="button" aria-label="Play DO NOT REDEEM audio" aria-pressed="false"><span class="sound-symbol">${icon('play',18)}</span><span class="sound-button-copy"><strong>DO NOT REDEEM</strong></span><span class="sound-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></button><audio id="memeSoundAudio" preload="none" src="assets/do-not-redeem.mp3"></audio></div>
  </div>`;
  function home() {
    const interestTags = (config.interests||[]).map(i=>`<span>${esc(i)}</span>`).join('');
    return `<section class="hero page-width"><div class="hero-copy">
      <div class="hero-avatar">${avatar}<span class="avatar-ring"></span></div>
      <h1 class="hero-title"><span class="title-name">${esc(config.name||'Dempsey')}</span></h1>
      <p class="hero-text">${esc(config.description||'list of my config, gear and settings')}</p>
      <div class="hero-actions">${profileUrl ? externalBtn(profileUrl, 'My osu! profile') : link('settings.html',`See my settings ${icon('arrow',17)}`,'button button-primary')}${link('skins.html',`Browse skins ${icon('arrow',17)}`,'button button-outline')}</div>
      <div class="interests"><span class="micro-label">INTO LATELY</span><div class="interest-tags">${interestTags}</div></div></div>
      <div class="hero-art hero-art-speed">${speedVisual}</div></section>
      <section class="page-width explore-section">
      <div class="explore-grid">
      <a href="settings.html" class="explore-card settings-card"><div class="explore-top"><span class="card-arrow">${icon('arrow',19)}</span></div><div class="card-visual image-visual"><img class="card-preview-image" src="assets/settings-devices-preview.png" alt="Settings and devices preview"></div><div class="card-body"><span class="card-icon">${icon('sliders',21)}</span><h3>Settings & devices</h3><p>My tablet, keybinds, rapid trigger, and the little things that matter.</p></div></a>
      <a href="skins.html" class="explore-card skins-card"><div class="explore-top"><span class="card-arrow">${icon('arrow',19)}</span></div><div class="card-visual image-visual"><img class="card-preview-image" src="assets/skins-library-preview.png" alt="osu! skin library preview"></div><div class="card-body"><span class="card-icon">${icon('layers',21)}</span><h3>Skins library</h3><p>list of skins I use</p></div></a>
      <a href="setup.html" class="explore-card setup-card"><div class="explore-top"><span class="card-arrow">${icon('arrow',19)}</span></div><div class="card-visual monitor-preview"><img class="monitor-preview-img" src="assets/gaming-setup-monitor.png" alt="Alienware gaming monitor on a dark background" loading="lazy"></div><div class="card-body"><span class="card-icon">${icon('cpu',21)}</span><h3>Gaming setup</h3><p>The gear on my desk, from keyboard to audio.</p></div></a>
      </div></section>
      <section class="page-width connect-section" aria-label="Social links"><div class="socials">${mediaLinks}</div></section>`;
  }
  const detailHero = (title, subtitle = '') => `<section class="detail-hero page-width"><div><h1>${title}<span class="h-accent">.</span></h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div></section>`;
  const stat = (label,value) => `<div class="stat"><span class="stat-label">${esc(label)}</span><strong>${esc(value||'—')}</strong></div>`;
  function settings() {
    const s = config.settings || {};
    const binds = (s.keybinds||['T','H']).map((k,i)=>`<div class="key-block"><span class="keycap">${esc(k)}</span><span>${i===0?'KEY 1': 'KEY '+(i+1)}</span></div>`).join('');
    return `${detailHero('Settings & devices')}
    <section class="page-width details-grid">
      <article class="glass-card settings-main"><div class="card-heading"><span class="small-icon">${icon('target',21)}</span><div><div class="kicker">OSU!STANDARD</div><h2>In-game settings</h2></div></div>
        <div class="stat-grid">${stat('INPUT',s.input)}${stat('RESOLUTION',s.resolution)}${stat('REFRESH RATE',s.refreshRate)}${stat('FRAME LIMITER',s.frameLimiter)}${stat('LEGACY AUDIO MODE',s.legacyAudio)}${stat('GLOBAL OFFSET',s.globalOffset)}${stat('BACKGROUND DIM',s.backgroundDim)}${stat('TABLET DRIVER',s.tabletDriver)}</div>
      </article>
      <article class="glass-card settings-keys"><div class="card-heading"><span class="small-icon">${icon('keyboard',21)}</span><div><div class="kicker">${esc(s.keyboard||'KEYBOARD')}</div><h2>Keybinds</h2></div></div>
        <div class="key-row">${binds}</div><div class="key-hint">${esc(s.playstyle||'Middle–index player')}</div>
      </article>
      <article class="glass-card settings-trigger"><div class="card-heading"><span class="small-icon">${icon('tune',21)}</span><div><div class="kicker">WOOTING 60HE</div><h2>Rapid trigger</h2></div></div>
        <div class="tuning-row tuning-three"><div class="tuning-metric"><label>ACTUATION POINT</label><strong>${esc(s.actuation||'—')}</strong><div class="meter"><i style="width:35%"></i></div></div>
          <div class="tuning-metric"><label>PRESS / ACTIVATE</label><strong>${esc(s.rtPress||'—')}</strong><div class="meter"><i style="width:15%"></i></div></div>
          <div class="tuning-metric"><label>RELEASE / DEACTIVATE</label><strong>${esc(s.rtRelease||'—')}</strong><div class="meter"><i style="width:10%"></i></div></div></div>
        <div class="setting-pills"><span class="status-chip">Rapid Trigger: On</span><span class="status-chip">Split sensitivity: ${esc(s.splitSensitivity||'—')}</span><span class="status-chip muted">Continuous RT: ${esc(s.continuousRapidTrigger||'—')}</span></div>
        <div class="settings-disclaimer">${icon('spark',16)} ${esc(s.tips||'')}</div>
      </article>
      <article class="glass-card tablet-details"><div class="card-heading"><span class="small-icon">${icon('tablet',21)}</span><div><div class="kicker">OPENTABLETDRIVER</div><h2>Tablet area</h2></div></div>
        <div class="tablet-preview" aria-label="77 by 49 millimeter tablet area, rotated minus 90 degrees"><span class="tablet-shape"><span>${esc(s.tabletArea||'77 × 49 mm')}</span></span></div>
        <div class="stat-grid compact-stats">${stat('MODEL',s.tabletModel)}${stat('AREA',s.tabletArea)}${stat('ROTATION',s.tabletRotation)}${stat('AREA X',s.tabletX)}${stat('AREA Y',s.tabletY)}${stat('SCREEN MAPPING',s.displayMapping)}${stat('SCREEN X',s.displayX)}${stat('SCREEN Y',s.displayY)}${stat('REPORT RATE',s.tabletReportRate)}</div>
        <div class="firmware-source"><div class="firmware-source-copy"><span class="firmware-source-eyebrow">TABLET FIRMWARE</span><strong>${esc(s.tabletFirmware||'Custom firmware')}</strong><small>For Wacom CTL-672</small></div>${safeUrl(s.tabletFirmwareUrl) ? `<a class="firmware-source-link" href="${esc(safeUrl(s.tabletFirmwareUrl))}" target="_blank" rel="noopener noreferrer">View firmware source ${icon('external',16)}</a>` : ''}</div>
      </article>
    </section>`;
  }
  function skins() {
    return `${detailHero('Skins library', 'list of skins I use')}
      <section class="page-width skin-library-section" aria-label="Dempsey's osu! skins">
        <div id="skinsGrid" class="skins-grid skins-showcase"></div>
      </section>`;
  }
  function renderSkins() {
    const grid = document.getElementById('skinsGrid');
    if (!grid) return;
    const skinsList = config.skins || [];
    grid.innerHTML = skinsList.map(s => `
      <article class="skin-card skin-gallery-card">
        <a class="skin-gallery-preview" href="${esc(safeUrl(s.url) || '#')}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(s.name)} skin page">
          ${s.preview ? `<img src="${esc(s.preview)}" alt="osu! gameplay preview for ${esc(s.name)}" loading="lazy">` : `<div class="skin-placeholder-art" aria-label="Skin screenshot not available"><span class="skin-placeholder-eyebrow">OSU! SKIN COLLECTION</span><span class="skin-placeholder-title">${esc(s.name)}</span><span class="skin-placeholder-subtitle">DOWNLOAD THE .OSK</span></div>`}
          <span class="skin-preview-caption">${s.preview ? 'GAMEPLAY PREVIEW' : 'SKIN DOWNLOAD'}</span>
        </a>
        <div class="skin-gallery-info">
          <div class="skin-gallery-copy"><span class="skin-gallery-kicker">OSU! SKIN</span><h2>${esc(s.name)}</h2></div>
          <a class="skin-gallery-link" href="${esc(safeUrl(s.url) || '#')}" target="_blank" rel="noopener noreferrer">View skin / download ${icon('external',17)}</a>
        </div>
      </article>`).join('');
  }
  function setup() {
    const gear = config.gear || [];
    return `<section class="page-width"><div class="section-heading setup-heading"><div><h2>Peripherals<span class="h-accent">.</span></h2></div></div><div class="setup-grid">${gear.map(g=>`<article class="setup-gear"><div class="setup-gear-top"><div class="setup-gear-icon">${icon(g.icon||'cpu',27)}</div></div><span class="kicker">${esc(g.category)}</span><h3>${esc(g.title)}</h3><p>${esc(g.meta)}</p></article>`).join('')}</div></section>`;
  }
  document.documentElement.style.setProperty('--accent', config.accent||'#a78bfa');
  document.documentElement.style.setProperty('--accent2', config.accentSecondary||'#5ce6e6');
  const pageBody = ({home,settings,skins,setup}[page] || home)();
  document.getElementById('app').innerHTML = shell(pageBody);
  document.title = `${titles[page] || 'Home'} — ${config.name||'yourname'}`;
  document.getElementById('year').textContent = new Date().getFullYear();
  const menu = document.querySelector('.menu-toggle');
  menu?.addEventListener('click', ()=>{ const open = document.querySelector('.nav').classList.toggle('nav-open'); menu.setAttribute('aria-expanded',String(open)); menu.textContent=open?'×':'☰'; });
  if (page === 'skins') renderSkins();
  // This clip plays only after a click/tap, never automatically.
  const memeButton = document.getElementById('memeSoundButton');
  const memeAudio = document.getElementById('memeSoundAudio');
  if (memeButton && memeAudio) {
    const updateAudioButton = () => {
      const playing = !memeAudio.paused && !memeAudio.ended;
      memeButton.classList.toggle('playing', playing);
      memeButton.setAttribute('aria-pressed', String(playing));
      memeButton.setAttribute('aria-label', playing ? 'Pause DO NOT REDEEM audio' : 'Play DO NOT REDEEM audio');
    };
    memeButton.addEventListener('click', () => {
      if (!memeAudio.paused) memeAudio.pause();
      else {
        if (memeAudio.ended) memeAudio.currentTime = 0;
        memeAudio.play().catch(() => {
          memeButton.setAttribute('aria-label', 'Audio could not be played');
          memeButton.title = 'Audio could not be played';
        });
      }
      updateAudioButton();
    });
    memeAudio.addEventListener('play', () => { memeButton.removeAttribute('title'); updateAudioButton(); });
    memeAudio.addEventListener('pause', updateAudioButton);
    memeAudio.addEventListener('ended', updateAudioButton);
  }
  // Entrance animation is purely decorative and disabled when reduced motion is requested.
  document.body.classList.add('loaded');
})();
