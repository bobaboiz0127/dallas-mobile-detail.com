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
.videoWall{
  margin-top:18px;
  display:grid;
  gap:12px;
  grid-template-columns: repeat(3, 1fr);
}

.autoVid{
  width:100%;
  aspect-ratio: 16 / 9;
  border-radius:20px;
  display:block;
  object-fit: cover;
  background: rgba(0,0,0,.35);
  border:1px solid rgba(255,255,255,.10);
}

@media (max-width: 980px){
  .videoWall{ grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px){
  .videoWall{ grid-template-columns: 1fr; }
}

