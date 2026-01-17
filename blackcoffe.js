/* ================= BURGER MENU ================= */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", e => {
    e.stopPropagation();
    nav.classList.toggle("open");
  });

  document.addEventListener("click", e => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("open");
    }
  });
}

/* ================= HOVER EFFECTS ================= */
/* Легкі анімації для feature та popular-card */
document.querySelectorAll(".feature, .popular-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.transition = "transform 0.2s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
