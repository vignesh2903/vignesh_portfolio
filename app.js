(function () {
  const root = document.getElementById("root");

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
    ));
  }

  function externalAttrs(href) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return "";
    return ` target="_blank" rel="noopener noreferrer"`;
  }

  function arrow() {
    return `<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function extIcon() {
    return `<svg class="ext" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function githubIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.4 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5Z"/></svg>`;
  }

  function tile(mark, image) {
    const picture = image
      ? `<img src="${esc(image)}" alt="" />`
      : `<span>${esc(mark)}</span>`;
    return `<div class="tile"${image ? "" : ` aria-hidden="true"`}>${picture}</div>`;
  }

  function sectionHead(section) {
    return `
      <header class="section-head">
        ${section.kicker ? `<p class="kicker"><span></span>${esc(section.kicker)}</p>` : ""}
        <h2>${esc(section.title)}</h2>
        ${section.subtitle ? `<p class="sub">${esc(section.subtitle)}</p>` : ""}
      </header>`;
  }

  function navLinks(items, className) {
    return items.map((item) => {
      const attrs = item.isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a class="${className}" href="${esc(item.href)}"${attrs}>${esc(item.text)}</a>`;
    }).join("");
  }

  function pointsList(points) {
    if (!points?.length) return "";
    return `<ul class="points">${points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>`;
  }

  function renderEntries(section) {
    const rows = section.items.map((item) => {
      const link = item.href
        ? `<a class="text-link" href="${esc(item.href)}"${externalAttrs(item.href)}>${esc(section.linkLabel || "View")} ${extIcon()}</a>`
        : "";
      const meta = [item.meta, item.place].filter(Boolean).join(" · ");
      return `
        <article class="entry">
          ${tile(item.mark, item.image)}
          <div class="entry-body">
            <h3>${esc(item.title)}</h3>
            ${meta ? `<p class="meta">${esc(meta)}</p>` : ""}
            ${item.summary ? `<p class="copy">${esc(item.summary)}</p>` : ""}
            ${pointsList(item.points)}
            ${link}
          </div>
        </article>`;
    }).join("");

    return `
      <section id="${esc(section.id)}" class="block">
        <div class="wrap">
          ${sectionHead(section)}
          <div class="entries">${rows}</div>
        </div>
      </section>`;
  }

  function renderProjects(section) {
    const rows = section.items.map((item) => {
      const link = item.href
        ? `<a class="text-link" href="${esc(item.href)}"${externalAttrs(item.href)}>View project ${extIcon()}</a>`
        : "";
      const code = item.github
        ? `<a class="icon-btn" href="${esc(item.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository for ${esc(item.title)}">${githubIcon()}</a>`
        : `<span class="icon-btn is-pending" title="GitHub link coming soon">${githubIcon()}</span>`;
      const tags = (item.tags || []).map((tag) => `<li>${esc(tag)}</li>`).join("");
      return `
        <article class="entry">
          ${tile(item.mark, item.image)}
          <div class="entry-body">
            <h3>${esc(item.title)}</h3>
            <p class="copy">${esc(item.description)}</p>
            ${tags ? `<ul class="tags">${tags}</ul>` : ""}
            ${link}
          </div>
          ${code}
        </article>`;
    }).join("");

    return `
      <section id="${esc(section.id)}" class="block">
        <div class="wrap">
          ${sectionHead(section)}
          <div class="entries">${rows}</div>
        </div>
      </section>`;
  }

  function skillRecord(item) {
    if (typeof item === "string") return { name: item, icon: "", note: "" };
    return { name: item.name || "", icon: item.icon || "", note: item.note || "" };
  }

  function skillMark(skill) {
    const letters = esc(skill.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?");
    if (!skill.icon) return `<span class="skill-fallback">${letters}</span>`;
    return `<img src="${esc(skill.icon)}" alt="" />`;
  }

  function renderSkills(section) {
    const groups = section.groups.map((group, groupIndex) => {
      const skills = group.items.map(skillRecord);
      const hasNotes = skills.some((skill) => skill.note);
      const panelId = `${section.id}-note-${groupIndex}`;
      const items = skills.map((skill, index) => {
        const inner = `
          <span class="skill-icon">${skillMark(skill)}</span>
          <span class="skill-name">${esc(skill.name)}</span>`;
        if (!skill.note) return `<li class="skill-item">${inner}</li>`;
        return `
          <li class="skill-item">
            <button class="skill-btn" type="button" aria-expanded="false" aria-controls="${esc(panelId)}" data-note-index="${index}">${inner}</button>
          </li>`;
      }).join("");
      const notes = hasNotes
        ? `<div class="skill-note" id="${esc(panelId)}" hidden>
            <div class="skill-note-inner">
              ${skills.map((skill, index) => skill.note
                ? `<div class="skill-note-body" data-note="${index}" hidden><h4>${esc(skill.name)}</h4><p>${esc(skill.note)}</p></div>`
                : "").join("")}
            </div>
          </div>`
        : "";
      return `
        <article class="skill${hasNotes ? " skill-notes" : ""}">
          <h3>${esc(group.label)}</h3>
          <ul class="skill-list">${items}</ul>
          ${notes}
        </article>`;
    }).join("");

    return `
      <section id="${esc(section.id)}" class="block">
        <div class="wrap">
          ${sectionHead(section)}
          <div class="skill-grid">${groups}</div>
        </div>
      </section>`;
  }

  function renderHighlights(section) {
    const groups = section.groups || [{ label: "", items: section.items || [] }];
    const blocks = groups.map((group) => {
      const cards = (group.items || []).map((item) => {
        const inner = `
          ${item.kicker ? `<p class="meta">${esc(item.kicker)}</p>` : ""}
          <h4>${esc(item.title)}</h4>
          ${item.body ? `<p>${esc(item.body)}</p>` : ""}`;
        if (!item.abstract && !item.href) return `<article class="highlight">${inner}</article>`;
        const index = paperCatalog.length;
        paperCatalog.push(item);
        return `<button class="highlight highlight-btn" type="button" data-paper="${index}" aria-haspopup="dialog">${inner}<span class="highlight-cue">Read abstract ${arrow()}</span></button>`;
      }).join("");
      const heading = group.label ? `<h3 class="highlight-label">${esc(group.label)}</h3>` : "";
      return `<div class="highlight-group">${heading}<div class="highlight-grid">${cards}</div></div>`;
    }).join("");

    return `
      <section id="${esc(section.id)}" class="block">
        <div class="wrap">
          ${sectionHead(section)}
          ${blocks}
        </div>
      </section>`;
  }

  function renderContact(section) {
    const profile = SITE.profile;
    const linkedin = SITE.socials.find((item) => item.label === "LinkedIn" && item.href);
    return `
      <section id="${esc(section.id)}" class="block">
        <div class="wrap">
          ${sectionHead(section)}
          <div class="contact-card">
            <p class="card-kicker">Email</p>
            <h3>Email me instead</h3>
            <p class="copy">A note to my inbox is the fastest way to reach me. I read every one.</p>
            <div class="contact-actions">
              <a class="btn" href="mailto:${esc(profile.email)}">Send an email ${arrow()}</a>
              ${linkedin ? `<a class="quiet-link" href="${esc(linkedin.href)}" target="_blank" rel="noopener noreferrer">or reach me on LinkedIn</a>` : `<a class="quiet-link" href="${esc(profile.phoneHref)}">or call ${esc(profile.phone)}</a>`}
            </div>
            <p class="email-line"><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>
          </div>
        </div>
      </section>`;
  }

  const renderers = {
    entries: renderEntries,
    projects: renderProjects,
    skills: renderSkills,
    highlights: renderHighlights,
    contact: renderContact,
    posts: renderPosts,
  };

  let postCatalog = [];
  let paperCatalog = [];

  function postTime(value) {
    const time = Date.parse(value);
    return Number.isNaN(time) ? Infinity : time;
  }

  function formatPostDate(value) {
    const time = Date.parse(value);
    if (Number.isNaN(time)) return value || "";
    return new Date(time).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function postCard(post, index, hidden) {
    const photo = post.image
      ? `<img src="${esc(post.image)}" alt="" />`
      : "";
    const lines = (post.lines || []).map((line) => `<li>${esc(line)}</li>`).join("");
    return `
      <button class="post-card" type="button" data-post="${index}" ${hidden ? `tabindex="-1" aria-hidden="true"` : `aria-haspopup="dialog"`}>
        <span class="post-photo">${photo}</span>
        <ul class="post-lines">${lines}</ul>
        <span class="post-date">${esc(formatPostDate(post.date))}</span>
      </button>`;
  }

  function yearAgo() {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    return cutoff.getTime();
  }

  function timeline(posts) {
    const times = posts.map((post) => postTime(post.date)).filter((time) => time !== Infinity);
    const earliest = Math.min(...times);
    const latest = Math.max(...times);
    const span = latest - earliest || 1;
    const marks = posts.map((post, index) => {
      const time = postTime(post.date);
      const pos = time === Infinity ? 50 : 8 + ((time - earliest) / span) * 84;
      return `
        <button class="timeline-item" type="button" data-post="${index}" style="--pos:${pos.toFixed(2)}" aria-label="${esc(formatPostDate(post.date))} ${esc(post.title || "Update")}">
          <span class="timeline-dot"></span>
          <span class="timeline-date">${esc(formatPostDate(post.date))}</span>
          <span class="timeline-label">${esc(post.title || "Update")}</span>
        </button>`;
    }).join("");
    return `
      <div class="timeline-wrap">
        <div class="timeline" aria-label="When these updates happened">
          <span class="timeline-line"></span>
          ${marks}
        </div>
      </div>`;
  }

  function renderPosts(section) {
    postCatalog = section.items.slice().sort((a, b) => postTime(a.date) - postTime(b.date));
    const cards = postCatalog.map((post, index) => postCard(post, index, false)).join("");
    const clone = postCatalog.map((post, index) => postCard(post, index, true)).join("");
    return `
      <section id="${esc(section.id)}" class="block posts-block">
        <div class="wrap">
          ${sectionHead(section)}
          <div class="post-filters" role="group" aria-label="Show updates">
            <button class="post-filter" type="button" data-filter="all">All</button>
            <button class="post-filter" type="button" data-filter="latest">Latest</button>
            <button class="post-filter" type="button" data-filter="earliest">Earliest</button>
          </div>
          <div class="posts-shell">
            <button class="posts-arrow" type="button" data-dir="-1" aria-label="Show earlier updates">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="posts-viewport">
              <div class="posts-track">
                <div class="posts-set">${cards}<span class="posts-gap" aria-hidden="true"></span></div>
                <div class="posts-set" aria-hidden="true">${clone}<span class="posts-gap"></span></div>
              </div>
            </div>
            <button class="posts-arrow" type="button" data-dir="1" aria-label="Show later updates">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          ${timeline(postCatalog)}
        </div>
      </section>`;
  }

  function render() {
    paperCatalog = [];
    const lead = SITE.hero.lead.map((part) => (
      part.accent ? `<span class="accent">${esc(part.text)}</span>` : esc(part.text)
    )).join("");

    const sections = SITE.sections.map((section) => {
      const renderSection = renderers[section.type];
      return renderSection ? renderSection(section) : "";
    }).join("");

    const year = new Date().getFullYear();
    const socials = SITE.socials
      .filter((item) => item.href)
      .map((item) => `<a href="${esc(item.href)}"${externalAttrs(item.href)}>${esc(item.label)}</a>`)
      .join("");

    root.innerHTML = `
      <header class="nav" data-nav>
        <a class="brand" href="#top">${esc(SITE.profile.mark)}</a>
        <nav class="nav-links" aria-label="Primary">${navLinks(SITE.nav, "nav-link")}</nav>
        <div class="nav-tools">
          <button class="theme-btn" type="button" aria-label="Toggle color theme">
            <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu">
            <span class="burger" aria-hidden="true"></span>
            <span>Menu</span>
          </button>
        </div>
      </header>
      <div id="mobile-menu" class="mobile-menu" hidden>
        <nav aria-label="Mobile">${navLinks(SITE.nav, "mobile-link")}</nav>
      </div>
      <main id="top">
        <section class="hero">
          <div class="wrap hero-grid">
            <div>
              <p class="badge">${esc(SITE.hero.badge)}</p>
              <h1>
                <span class="solid">${esc(SITE.profile.first)}</span>
                <span class="outline">${esc(SITE.profile.last)}</span>
              </h1>
              <p class="lede">${lead}</p>
              <div class="hero-actions">
                <a class="btn" href="${esc(SITE.hero.primary.href)}">${esc(SITE.hero.primary.text)} ${arrow()}</a>
                <a class="quiet-link" href="${esc(SITE.hero.secondary.href)}">${esc(SITE.hero.secondary.text)}</a>
              </div>
            </div>
            <div class="doodle" aria-hidden="true">
              <svg class="diamond" viewBox="0 0 120 120"><rect x="18" y="18" width="84" height="84" transform="rotate(18 60 60)" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
              <svg class="headphones" viewBox="0 0 90 70">
                <path class="wave" d="M10 28c-6 2-8 12-2 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <path class="wave" d="M80 28c6 2 8 12 2 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M24 38V30a21 21 0 0 1 42 0v8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <rect x="16" y="36" width="12" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/>
                <rect x="62" y="36" width="12" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/>
              </svg>
              <svg class="cup" viewBox="0 0 80 70">
                <path d="M18 22h36v18a14 14 0 0 1-14 14H32A14 14 0 0 1 18 40V22Z" fill="none" stroke="currentColor" stroke-width="1.4"/>
                <path d="M54 28h6a8 8 0 0 1 0 16h-6" fill="none" stroke="currentColor" stroke-width="1.4"/>
                <path class="steam" d="M28 14c0 4-4 4-4 8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <path class="steam" d="M38 12c0 4-4 4-4 8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <path class="steam" d="M48 14c0 4-4 4-4 8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
              <p>fueled by<br>caffeine<br>and music</p>
            </div>
          </div>
        </section>
        ${sections}
      </main>
      <div class="post-filter-modal" hidden>
        <div class="post-filter-dialog" role="dialog" aria-modal="true" aria-labelledby="post-filter-title">
          <button class="post-close post-filter-close" type="button" aria-label="Close">×</button>
          <p class="post-dialog-date" id="post-filter-kicker"></p>
          <h3 id="post-filter-title"></h3>
          <div class="post-filter-grid"></div>
        </div>
      </div>
      <div class="post-modal" hidden>
        <div class="post-dialog" role="dialog" aria-modal="true" aria-labelledby="post-dialog-title">
          <button class="post-close" type="button" aria-label="Close">×</button>
          <div class="post-dialog-photo"></div>
          <p class="post-dialog-date"></p>
          <h3 id="post-dialog-title"></h3>
          <div class="post-dialog-copy"></div>
        </div>
      </div>
      <footer class="site-footer">
        <div class="wrap footer-row">
          <nav class="footer-links" aria-label="Social">${socials}</nav>
          <p>${esc(SITE.profile.name)} © ${year}</p>
        </div>
      </footer>`;
  }

  function bindNav() {
    const header = root.querySelector("[data-nav]");
    const toggle = root.querySelector(".menu-btn");
    const menu = root.querySelector("#mobile-menu");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function bindTheme() {
    const button = root.querySelector(".theme-btn");
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      if (next === "dark") document.documentElement.dataset.theme = "dark";
      else delete document.documentElement.dataset.theme;
      try { localStorage.setItem("theme", next); } catch (error) { /* ignore */ }
    });
  }

  function bindSkillNotes() {
    root.querySelectorAll(".skill-notes").forEach((card) => {
      const panel = card.querySelector(".skill-note");
      const buttons = card.querySelectorAll(".skill-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = button.dataset.noteIndex;
          const wasOpen = button.getAttribute("aria-expanded") === "true";
          buttons.forEach((other) => other.setAttribute("aria-expanded", "false"));
          panel.querySelectorAll(".skill-note-body").forEach((body) => {
            body.hidden = body.dataset.note !== index;
          });
          if (wasOpen) {
            panel.classList.remove("is-open");
            panel.addEventListener("transitionend", () => {
              if (!panel.classList.contains("is-open")) panel.hidden = true;
            }, { once: true });
            return;
          }
          button.setAttribute("aria-expanded", "true");
          panel.hidden = false;
          requestAnimationFrame(() => panel.classList.add("is-open"));
        });
      });
    });
  }

  function bindPosts() {
    const modal = root.querySelector(".post-modal");
    const dialog = root.querySelector(".post-dialog");
    const closeButton = root.querySelector(".post-dialog .post-close");
    if (!modal) return;

    const close = () => {
      modal.hidden = true;
      if (!filterModal || filterModal.hidden) document.body.classList.remove("post-open");
    };

    const open = (detail) => {
      if (!detail) return;
      const photo = dialog.querySelector(".post-dialog-photo");
      photo.innerHTML = detail.image ? `<img src="${esc(detail.image)}" alt="" />` : "";
      photo.hidden = !detail.image;
      const date = dialog.querySelector(".post-dialog-date");
      date.textContent = detail.kicker || "";
      date.hidden = !detail.kicker;
      dialog.querySelector("#post-dialog-title").textContent = detail.title || "";
      const lines = (detail.lines || []).map((line) => `<li>${esc(line)}</li>`).join("");
      const paragraphs = String(detail.body || "")
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => `<p>${esc(part)}</p>`)
        .join("");
      const link = detail.href
        ? `<a class="text-link" href="${esc(detail.href)}"${externalAttrs(detail.href)}>View paper ${extIcon()}</a>`
        : "";
      dialog.querySelector(".post-dialog-copy").innerHTML = `
        ${lines ? `<ul>${lines}</ul>` : ""}
        ${paragraphs}
        ${link}`;
      modal.hidden = false;
      document.body.classList.add("post-open");
      closeButton.focus();
    };

    root.addEventListener("click", (event) => {
      const card = event.target.closest(".post-card, .timeline-item");
      if (!card || !root.contains(card)) return;
      const post = postCatalog[Number(card.dataset.post)];
      if (!post) return;
      open({
        image: post.image,
        kicker: formatPostDate(post.date),
        title: post.title || "Update",
        lines: post.lines,
        body: post.body,
      });
    });

    root.querySelectorAll(".highlight-btn").forEach((card) => {
      card.addEventListener("click", () => {
        const paper = paperCatalog[Number(card.dataset.paper)];
        if (!paper) return;
        open({
          kicker: paper.kicker,
          title: paper.title,
          body: paper.abstract,
          href: paper.href,
        });
      });
    });

    const filterModal = root.querySelector(".post-filter-modal");
    const filterGrid = root.querySelector(".post-filter-grid");
    const filterClose = root.querySelector(".post-filter-close");
    const filterLabels = {
      all: ["All", "Every update"],
      latest: ["Latest", "Less than a year old"],
      earliest: ["Earliest", "More than a year old"],
    };

    const closeFilter = () => {
      if (!filterModal) return;
      filterModal.hidden = true;
      if (modal.hidden) document.body.classList.remove("post-open");
    };

    const openFilter = (key) => {
      if (!filterModal || !filterGrid) return;
      const cutoff = yearAgo();
      const matches = postCatalog
        .map((post, index) => ({ post, index }))
        .filter(({ post }) => {
          const time = postTime(post.date);
          if (key === "latest") return time > cutoff;
          if (key === "earliest") return time < cutoff;
          return true;
        });
      const [title, kicker] = filterLabels[key] || filterLabels.all;
      filterModal.querySelector("#post-filter-title").textContent = title;
      filterModal.querySelector("#post-filter-kicker").textContent = kicker;
      filterGrid.innerHTML = matches.length
        ? matches.map(({ index }) => postCard(postCatalog[index], index, false)).join("")
        : `<p class="post-filter-empty">No updates in this range yet.</p>`;
      filterModal.hidden = false;
      document.body.classList.add("post-open");
      filterClose.focus();
    };

    root.querySelectorAll(".post-filter").forEach((button) => {
      button.addEventListener("click", () => openFilter(button.dataset.filter));
    });
    if (filterClose) filterClose.addEventListener("click", closeFilter);
    if (filterModal) {
      filterModal.addEventListener("click", (event) => {
        if (event.target === filterModal) closeFilter();
      });
    }

    const viewport = root.querySelector(".posts-viewport");
    const track = root.querySelector(".posts-track");
    const firstSet = track?.querySelector(".posts-set");
    if (viewport && track && firstSet) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const speed = reduceMotion ? 0 : 32;
      let offset = 0;
      let nudge = 0;
      let hovering = false;
      let last = performance.now();

      const step = () => {
        const card = firstSet.querySelector(".post-card");
        const gap = parseFloat(getComputedStyle(firstSet).columnGap) || 0;
        return card ? card.offsetWidth + gap : 260;
      };

      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const setWidth = firstSet.offsetWidth;
        const paused = hovering || !modal.hidden || (filterModal && !filterModal.hidden);
        if (!paused) offset += speed * dt;
        if (nudge) {
          const move = Math.abs(nudge) < 0.5 ? nudge : nudge * Math.min(1, dt * 9);
          offset += move;
          nudge -= move;
        }
        if (setWidth) offset = ((offset % setWidth) + setWidth) % setWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      viewport.addEventListener("mouseenter", () => { hovering = true; });
      viewport.addEventListener("mouseleave", () => { hovering = false; });
      root.querySelectorAll(".posts-arrow").forEach((button) => {
        button.addEventListener("click", () => {
          nudge += Number(button.dataset.dir) * step();
        });
      });
    }
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!modal.hidden) close();
      else closeFilter();
    });
  }

  function bindNetwork() {
    const canvas = document.createElement("canvas");
    canvas.className = "bg-network";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const linkDistance = 160;
    let width = 0;
    let height = 0;
    let nodes = [];
    let color = "240, 78, 35";

    const readColor = () => {
      const probe = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const hex = probe.replace("#", "");
      if (hex.length === 6) {
        color = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(18, Math.min(70, Math.round((width * height) / 26000)));
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 10 + Math.random() * 16;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / linkDistance) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${color}, 0.85)`;
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      nodes.forEach((node) => {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < 0 || node.x > width) { node.vx *= -1; node.x = Math.max(0, Math.min(width, node.x)); }
        if (node.y < 0 || node.y > height) { node.vy *= -1; node.y = Math.max(0, Math.min(height, node.y)); }
      });
      draw();
      requestAnimationFrame(tick);
    };

    readColor();
    resize();
    new MutationObserver(() => {
      readColor();
      if (reduceMotion) draw();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", () => {
      resize();
      if (reduceMotion) draw();
    });

    if (reduceMotion) draw();
    else requestAnimationFrame(tick);
  }

  render();
  bindNetwork();
  bindNav();
  bindTheme();
  bindSkillNotes();
  bindPosts();
})();


