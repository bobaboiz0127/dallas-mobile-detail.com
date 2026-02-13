// ---------- Helpers ----------
function safePlay(videoEl){
  if (!videoEl) return;
  try{
    videoEl.muted = true;
    videoEl.playsInline = true;
    const p = videoEl.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch (e) {}
}

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileNav = document.getElementById("mobileNav");

function openNav(){
  if (!mobileNav) return;
  mobileNav.style.display = "block";
  mobileNav.setAttribute("aria-hidden", "false");
}
function closeNav(){
  if (!mobileNav) return;
  mobileNav.style.display = "none";
  mobileNav.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", openNav);
closeBtn?.addEventListener("click", closeNav);
mobileNav?.addEventListener("click", (e) => { if (e.target === mobileNav) closeNav(); });
mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));

// ---------- Autoplay reliability (Rubric #2) ----------
window.addEventListener("load", () => {
  document.querySelectorAll("video[autoplay]").forEach((v) => safePlay(v));
});

// Click any highlight clip to toggle sound (mutes others)
document.querySelectorAll("video.autoVid").forEach((vid) => {
  vid.addEventListener("click", () => {
    const willUnmute = vid.muted === true;
    document.querySelectorAll("video.autoVid").forEach(v => (v.muted = true));
    vid.muted = !willUnmute;
    safePlay(vid);
  });
});

// ---------- X-Factor: Instant Estimate ----------
const estVehicle = document.getElementById("estVehicle");
const estPackage = document.getElementById("estPackage");
const addonPetHair = document.getElementById("addonPetHair");
const addonExtract = document.getElementById("addonExtract");
const addonOdor = document.getElementById("addonOdor");
const estPrice = document.getElementById("estPrice");
const estNotes = document.getElementById("estNotes");

const base = {
  sedan:  { exterior:[89,129], interior:[99,149], full:[179,229] },
  suv:    { exterior:[99,149], interior:[109,169], full:[199,259] },
  truck:  { exterior:[109,169], interior:[119,189], full:[219,289] }
};
const addon = {
  pet: [20,40],
  extract: [30,60],
  odor: [20,40]
};

function fmtRange(lo, hi){ return `$${lo}–$${hi}`; }

function updateEstimate(){
  // Only run on pages where the estimator exists
  if (!estVehicle || !estPackage || !estPrice || !estNotes) return;

  const v = estVehicle.value;
  const p = estPackage.value;

  let lo = base[v][p][0];
  let hi = base[v][p][1];

  const chosen = [];
  if (addonPetHair?.checked){ lo += addon.pet[0]; hi += addon.pet[1]; chosen.push("Pet hair"); }
  if (addonExtract?.checked){ lo += addon.extract[0]; hi += addon.extract[1]; chosen.push("Extraction"); }
  if (addonOdor?.checked){ lo += addon.odor[0]; hi += addon.odor[1]; chosen.push("Odor"); }

  estPrice.textContent = fmtRange(lo, hi);

  const vLabel = v === "sedan" ? "Sedan/Coupe" : (v === "suv" ? "SUV/Crossover" : "Truck/Large SUV");
  const pLabel = p === "exterior" ? "Exterior Refresh" : (p === "interior" ? "Interior Reset" : "Full Detail");
  estNotes.textContent = chosen.length ? `${pLabel} • ${vLabel} • + ${chosen.join(", ")}` : `${pLabel} • ${vLabel}`;
}

[estVehicle, estPackage, addonPetHair, addonExtract, addonOdor].forEach(el => el?.addEventListener("change", updateEstimate));
updateEstimate();

// ---------- Chatbot (Rubric #4) ----------
const chatFab = document.getElementById("chatFab");
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function addMsg(text, who="bot"){
  if (!chatBody) return;
  const div = document.createElement("div");
  div.className = `msg msg--${who}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(qRaw){
  const q = (qRaw || "").toLowerCase();

  if (q.includes("price") || q.includes("cost") || q.includes("pricing"))
    return "Pricing depends on size and condition. Full Detail starts around $179+. Want interior, exterior, or full detail?";

  if (q.includes("area") || q.includes("serve") || q.includes("dallas") || q.includes("plano") || q.includes("richardson") || q.includes("garland") || q.includes("irving"))
    return "We serve Dallas + nearby areas like Plano, Richardson, Garland, Irving, Addison, and Carrollton. Tell me your area and I’ll confirm!";

  if (q.includes("book") || q.includes("appointment") || q.includes("schedule"))
    return "To book: use the Contact section (or the Call/Text buttons). Send your vehicle + location + preferred time and we’ll confirm.";

  if (q.includes("water") || q.includes("power"))
    return "Yes—we bring water and supplies. Power can be portable or a standard outlet if needed (we confirm before arrival).";

  if (q.includes("time") || q.includes("long") || q.includes("hours"))
    return "Typical time: Exterior 1–2 hrs, Interior 1–2.5 hrs, Full detail 3–5 hrs (depends on condition).";

  if (q.includes("pet") || q.includes("hair") || q.includes("stain") || q.includes("odor"))
    return "Yes—pet hair, stains, and odors can be handled with add-ons like extraction and odor treatment. Tell me what you’re dealing with.";

  return "I can help with pricing, service area, booking, timing, and add-ons. What do you need?";
}

function openChat(){
  if (!chatWidget) return;
  chatWidget.style.display = "block";
  chatWidget.setAttribute("aria-hidden", "false");
  if (chatBody && chatBody.children.length === 0){
    addMsg("Hi! I’m DetailBot. Ask me about pricing, booking, service areas, or add-ons.");
  }
}
function closeChatFn(){
  if (!chatWidget) return;
  chatWidget.style.display = "none";
  chatWidget.setAttribute("aria-hidden", "true");
}

chatFab?.addEventListener("click", openChat);
chatClose?.addEventListener("click", closeChatFn);

chatForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput?.value?.trim();
  if (!text) return;

  addMsg(text, "user");
  chatInput.value = "";

  setTimeout(() => addMsg(botReply(text), "bot"), 250);
});
