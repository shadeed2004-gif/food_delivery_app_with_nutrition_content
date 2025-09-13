// Restaurant Database with Kerala images
const DB = {
  restaurants: [
    {
      id: 'r1',
      name: 'Malabar Spice Hub',
      cuisine: 'Kerala, Malabar',
      rating: 4.7,
      image: 'malabar-spice-hub.png',
      menu: [
        { id: 'm1', name: 'Chicken Biryani', description: 'Aromatic Malabar chicken biryani with spices', price: 220, nutrition: { calories: 650, protein: 30, carbs: 65, fats: 25 } },
        { id: 'm2', name: 'Puttu & Kadala Curry', description: 'Steamed rice cake with black chickpea curry', price: 120, nutrition: { calories: 480, protein: 15, carbs: 65, fats: 15 } },
        { id: 'm3', name: 'Banana Fry (Pazham Pori)', description: 'Golden fried ripe banana fritters', price: 60, nutrition: { calories: 320, protein: 4, carbs: 45, fats: 12 } }
      ]
    },
    {
      id: 'r2',
      name: 'Cochin Treats',
      cuisine: 'Kerala, Seafood',
      rating: 4.6,
      image: 'cochin-treats.png',
      menu: [
        { id: 'm4', name: 'Fish Curry Meal', description: 'Spicy Kerala fish curry with rice', price: 180, nutrition: { calories: 550, protein: 28, carbs: 50, fats: 20 } },
        { id: 'm5', name: 'Appam & Stew', description: 'Soft appams served with creamy vegetable stew', price: 150, nutrition: { calories: 400, protein: 10, carbs: 60, fats: 12 } },
        { id: 'm6', name: 'Prawn Roast', description: 'Spicy roasted prawns with coconut flavors', price: 260, nutrition: { calories: 500, protein: 32, carbs: 20, fats: 30 } }
      ]
    },
    {
      id: 'r3',
      name: 'Thattukada Express',
      cuisine: 'Kerala, Street Food',
      rating: 4.5,
      image: 'thattukada-express.png',
      menu: [
        { id: 'm7', name: 'Kerala Parotta & Beef Curry', description: 'Flaky parotta served with spicy beef curry', price: 250, nutrition: { calories: 800, protein: 40, carbs: 70, fats: 35 } },
        { id: 'm8', name: 'Kappa & Meen Curry', description: 'Tapioca with spicy fish curry', price: 160, nutrition: { calories: 600, protein: 25, carbs: 70, fats: 18 } },
        { id: 'm9', name: 'Egg Roast with Appam', description: 'Hard-boiled eggs in spicy masala served with appam', price: 140, nutrition: { calories: 450, protein: 18, carbs: 45, fats: 16 } }
      ]
    }
  ]
};

// Render Restaurants
const restaurantList = document.getElementById("restaurant-list");
function renderRestaurants() {
  restaurantList.innerHTML = "";
  DB.restaurants.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-thumbnail"><img src="${r.image}" alt="${r.name}"></div>
      <div class="card-body">
        <h3>${r.name}</h3>
        <p>${r.cuisine}</p>
        <div class="rating">⭐ ${r.rating}</div>
      </div>
    `;
    card.onclick = () => openMenu(r);
    restaurantList.appendChild(card);
  });
}
renderRestaurants();

// Menu Modal
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const menuList = document.getElementById("menu-list");
const modalTitle = document.getElementById("modal-title");
const modalSub = document.getElementById("modal-sub");

function openMenu(r) {
  modal.classList.add("active");
  modalTitle.textContent = r.name;
  modalSub.textContent = r.cuisine;
  menuList.innerHTML = "";
  r.menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <small>${item.description}</small><br>
        <strong>₹${item.price}</strong>
      </div>
      <button class="btn primary">Add</button>
    `;
    div.querySelector("button").onclick = () => addToCart(item);
    menuList.appendChild(div);
  });
}
modalClose.onclick = () => modal.classList.remove("active");
modalOverlay.onclick = () => modal.classList.remove("active");

// Cart
const fab = document.getElementById("fab");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const subtotalAmt = document.getElementById("subtotal-amt");
const fabCount = document.getElementById("fab-count");
let cart = [];

fab.onclick = () => cartSidebar.classList.add("active");
closeCart.onclick = () => cartSidebar.classList.remove("active");

function addToCart(item) {
  cart.push(item);
  renderCart();
}
function renderCart() {
  cartItems.innerHTML = "";
  let subtotal = 0, totalCal = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;
  cart.forEach(i => {
    subtotal += i.price;
    totalCal += i.nutrition.calories;
    totalProtein += i.nutrition.protein;
    totalCarbs += i.nutrition.carbs;
    totalFats += i.nutrition.fats;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<div>${i.name}</div><div>₹${i.price}</div>`;
    cartItems.appendChild(div);
  });
  subtotalAmt.textContent = `₹${subtotal}`;
  document.getElementById("total-cal").textContent = totalCal;
  document.getElementById("total-protein").textContent = totalProtein;
  document.getElementById("total-carbs").textContent = totalCarbs;
  document.getElementById("total-fats").textContent = totalFats;
  fabCount.textContent = cart.length;
}
