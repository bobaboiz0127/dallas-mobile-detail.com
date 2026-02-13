const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileNav = document.getElementById("mobileNav");

function openNav(){
  mobileNav.style.display = "block";
  mobileNav.setAttribute("aria-hidden", "false");
}
function closeNav(){
  mobileNav.style.display = "none";
  mobileNav.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", openNav);
closeBtn?.addEventListener("click", closeNav);

mobileNav?.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeNav();
});

// Close nav when clicking a link
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", closeNav);
});
// Autoplay helper (some browsers need a JS play() call)
document.querySelectorAll("video.autoVid").forEach((v) => {
  v.muted = true;      // required for autoplay
  v.playsInline = true;

  const tryPlay = async () => {
    try { await v.play(); } catch (e) { /* ignore */ }
  };

  tryPlay();

  // If video pauses (rare), try again
  v.addEventListener("pause", tryPlay);
});

