// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const themeToggleEl = document.getElementById("theme-toggle");
if (themeToggleEl) {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggleEl.textContent = currentTheme === "dark" ? "🌙" : "☀️";
  themeToggleEl.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggleEl.textContent = theme === "dark" ? "🌙" : "☀️";
  });
}

// ---------- Nav scroll state ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobile nav ----------
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  links.classList.toggle("open");
  toggle.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
  })
);

// ---------- Typed roles ----------
const roles = [
  "Threat analysis in 24/7 SOC environments",
  "Vulnerability assessment & penetration testing",
  "Incident response & digital forensics",
  "Governance, risk & compliance (GRC)",
  "Securing the digital frontier.",
];
const typedEl = document.getElementById("typed");
let roleIdx = 0,
  charIdx = 0,
  deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (deleting) {
    charIdx--;
  } else {
    charIdx++;
  }
  typedEl.textContent = current.slice(0, charIdx);

  let delay = deleting ? 35 : 65;
  if (!deleting && charIdx === current.length) {
    delay = 1900;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 350;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ---------- Count-up stats ----------
const animateCount = (el) => {
  const target = +el.dataset.count;
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    let val = Math.floor(eased * target);
    el.textContent = target >= 1000 ? val.toLocaleString() : val;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? target.toLocaleString() : target;
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat__num").forEach((el) => statObserver.observe(el));

// ---------- Reveal on scroll ----------
const revealTargets = document.querySelectorAll(
  ".section__head, .about__text, .about__card, .skill-card, .tl-item, .proj, .creds__col, .contact__lead, .contact__link"
);
revealTargets.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
});
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ---------- Copy email ----------
const copyBtn = document.getElementById("copy-email");
const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = "tawandamach@outlook.com";
  navigator.clipboard
    ? navigator.clipboard.writeText(email).then(() => showToast("Email copied ✓"))
    : showToast(email);
});

// ---------- Matrix / digital rain background ----------
(function matrix() {
  const canvas = document.getElementById("matrix-bg");
  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let cols, drops;
  const fontSize = 16;
  const glyphs = "01ABCDEF<>/{}[]#$%&*+=アカサタナ".split("");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1).map(() => Math.random() * -canvas.height);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    ctx.fillStyle = isLight ? "rgba(248,250,252,0.1)" : "rgba(10,14,20,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;
    for (let i = 0; i < drops.length; i++) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillStyle = isLight ? (Math.random() > 0.975 ? "#2ea0ff" : "rgba(0,229,160,0.3)") : (Math.random() > 0.975 ? "#2ea0ff" : "rgba(0,229,160,0.45)");
      ctx.fillText(ch, x, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
