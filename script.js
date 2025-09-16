const defaultBg = "https://cdn.readyfile.co/web/assets/genericPhotos/IMG_6272.jpg";
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
const overlay = document.getElementById("overlay");
const sections = Array.from(document.querySelectorAll(".section"));

const preload = (url) => {
  const i = new Image();
  i.src = url;
};
preload(defaultBg);
sections.forEach((s) => preload(s.dataset.bg));

const defaultImg = new Image();
defaultImg.onload = () => {
  bg1.style.backgroundImage = `url('${defaultBg}')`;
  bg1.style.opacity = 1;
  bg2.style.opacity = 0;
};
defaultImg.src = defaultBg;

let showingBg1 = true;
function crossfadeTo(url) {
  const img = new Image();
  img.onload = () => {
    if (showingBg1) {
      bg2.style.backgroundImage = `url('${url}')`;
      bg2.style.opacity = 1;
      bg1.style.opacity = 0;
    } else {
      bg1.style.backgroundImage = `url('${url}')`;
      bg1.style.opacity = 1;
      bg2.style.opacity = 0;
    }
    showingBg1 = !showingBg1;
  };
  img.src = url;
}

document.querySelectorAll(".items a").forEach((a) => {
  const bg = (a.style.backgroundImage || "")
    .replace(/^url\(["']?/, "")
    .replace(/["']?\)$/, "");
  if (bg) preload(bg);
});

let active = null;
sections.forEach((sec) => {
  sec.addEventListener("click", (e) => {
    if (
      e.target.tagName === "A" ||
      e.target.closest("a") ||
      e.target.classList.contains("back-btn")
    )
      return;

    const isActive = sec.classList.contains("active");
    sections.forEach((s) => s.classList.remove("active"));

    if (isActive) {
      active = null;
      crossfadeTo(defaultBg);
    } else {
      sec.classList.add("active");
      active = sec;
      crossfadeTo(sec.dataset.bg || defaultBg);
    }
  });

  const backBtn = sec.querySelector(".back-btn");
  backBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sec.classList.remove("active");
    crossfadeTo(defaultBg);
    active = null;
  });
});

/*let inactivityTimer;
function resetInactivity() {
  clearTimeout(inactivityTimer);
  overlay.classList.remove("active");
  inactivityTimer = setTimeout(() => {
    overlay.classList.add("active");
    sections.forEach((s) => s.classList.remove("active"));
    crossfadeTo(defaultBg);
    active = null;
  }, 15000);
}
["mousemove", "keydown", "click", "touchstart"].forEach((ev) =>
  document.addEventListener(ev, resetInactivity)
);
resetInactivity();

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  resetInactivity();
});*/

let lastOpenItems = null;

function openModal(resource) {
  lastOpenItems = document.querySelector('.items.active');
  if (lastOpenItems) lastOpenItems.classList.remove('active');

  const modal = document.getElementById('modal');
  const frame = document.getElementById('modal-frame');
  frame.src = resource;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modal-frame');
  frame.src = '';
  modal.style.display = 'none';

  if (lastOpenItems) {
    lastOpenItems.classList.add('active');
    lastOpenItems = null;
  }
}
