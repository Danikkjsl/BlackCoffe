const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const checkoutBtn = document.getElementById("checkoutBtn");

const STORAGE_KEY = "blackcoffe_cart_v2";

// cartData: [{ name, price, qty }]
let cartData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// ✅ IMAGE URL MAP (можеш міняти/доповнювати)



function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
}

function formatUAH(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cartData.length === 0) {
    cartItems.innerHTML = `<p style="color:#6b7280;font-weight:800;">Кошик порожній ☕</p>`;
  } else {
    cartData.forEach((item, i) => {
      total += item.price * item.qty;
      count += item.qty;

      cartItems.innerHTML += `
        <div class="cart-item" style="gap:10px;">
          <div style="display:flex;flex-direction:column;gap:4px;min-width:0;">
            <strong style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px;">
              ${item.name}
            </strong>
            <span style="color:#6b7280;font-weight:800;font-size:12px;">
              ${formatUAH(item.price)} ₴ / шт
            </span>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <button class="qty-btn" data-action="minus" data-index="${i}">−</button>
            <strong>${item.qty}</strong>
            <button class="qty-btn" data-action="plus" data-index="${i}">+</button>
          </div>

          <button class="remove-btn" data-action="remove" data-index="${i}">✕</button>
        </div>
      `;
    });
  }

  totalEl.textContent = formatUAH(total);
  cartCount.textContent = count;

  saveCart();
}

cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const index = Number(btn.dataset.index);
  if (Number.isNaN(index)) return;

  if (action === "remove") cartData.splice(index, 1);
  if (action === "plus") cartData[index].qty += 1;
  if (action === "minus") {
    cartData[index].qty -= 1;
    if (cartData[index].qty <= 0) cartData.splice(index, 1);
  }
  updateCart();
});

document.querySelectorAll(".product button").forEach((btn) => {
  btn.onclick = (e) => {
    e.stopPropagation();
    const card = e.target.closest(".product");

    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existing = cartData.find((x) => x.name === name);
    if (existing) existing.qty += 1;
    else cartData.push({ name, price, qty: 1 });

    updateCart();
    cart.classList.add("open");
  };
});

cartBtn.onclick = (e) => {
  e.stopPropagation();
  cart.classList.toggle("open");
};
cartClose.onclick = () => cart.classList.remove("open");
cart.addEventListener("click", (e) => e.stopPropagation());

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cartData.length === 0) return alert("Кошик порожній 🙂");
    alert("✅ Замовлення оформлено (демо)");
    cartData = [];
    updateCart();
    cart.classList.remove("open");
  });
}

burger.onclick = (e) => {
  e.stopPropagation();
  nav.classList.toggle("open");
};
nav.addEventListener("click", (e) => e.stopPropagation());

document.addEventListener("click", () => {
  cart.classList.remove("open");
  nav.classList.remove("open");
});

// FILTER
const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const brand = btn.dataset.brand;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    products.forEach((product) => {
      product.style.display = (brand === "all" || product.dataset.brand === brand) ? "block" : "none";
    });
  });
});

// ✅ APPLY IMAGES (URL) + fallback
document.querySelectorAll(".product").forEach((card) => {
  const key = card.querySelector(".product-img")?.dataset.img;
  const brand = card.dataset.brand;

  const imgEl = card.querySelector(".product-img");
  if (!imgEl) return;

  const url = IMG[key] || IMG[`${brand}-fallback`];
  imgEl.src = url;

  imgEl.onerror = () => {
    imgEl.src = IMG[`${brand}-fallback`];
  };
});

updateCart();
