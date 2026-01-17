const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.toggle("open");
});

document.addEventListener("click", () => {
  nav.classList.remove("open");
});

document.getElementById("requestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Заявку відправлено (демо). Ми зв’яжемося з вами!");
  e.target.reset();
});
