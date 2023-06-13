import { menuArray } from "./data.js";

const menu = document.getElementById("menu");
const orderList = document.getElementById("order-list");
const modal = document.getElementById("modal");
const completeOrderBtn = document.getElementById("complete-order-btn");
const order = document.getElementById("order");

let purchasedItems = [];
let total = 0;

// Renders the Menu
function renderMenu() {
  let menuHTML = "";

  menuArray.forEach(function (item) {
    menuHTML += `<div class="menu-item">
                    <div class="menu-food-image">${item.emoji}</div>
                    <div class="menu-food-info">
                        <h1>${item.name}</h1>
                        <p>${item.ingredients}</p>
                        <h2>$${item.price}</h2>
                    </div>
                    <button class="menu-food-btn" id="${item.id}">+</button>
                </div>`;
  });

  menu.innerHTML = menuHTML;
}
//Event listner for the remove buttons on the "Your Order" section
// Subtracts from total
// Removes selected item from purchasedItems[] and calls renderOrder()
orderList.addEventListener("click", function (e) {
  total -= purchasedItems[e.target.dataset.orderNumber].price;
  const index = Number(e.target.dataset.orderNumber);

  purchasedItems.splice(index, 1);

  renderOrder();
});

// Event Listener for the add buttons on the menu
//Sends handleAddBtn() its ID
menu.addEventListener("click", function (e) {
  handleAddBtn(e.target.id);
});

completeOrderBtn.addEventListener("click", function () {
  if (purchasedItems.length > 0) {
    modal.style.display = "flex";
  }
});

modal.addEventListener("submit", function (e) {
  e.preventDefault();
  const form = document.getElementsByClassName("modal-form-input");
  const name = form[0].value;
  for (let input of form) {
    input.value = "";
  }

  modal.style.display = "none";

  order.innerHTML = `<div class="order-complete">
            Thanks, ${name}! Your order is on its way!
          </div>`;
});

// Sends the object corresponding to the pressed button (pizza, hamburger, or beer) to addOrder() based on the given ID
function handleAddBtn(id) {
  const selectedItem = menuArray.filter(function (item) {
    return item.id == id;
  })[0];

  total += selectedItem.price;

  addOrder(selectedItem);
}

// Pushes the object to the purchasedItems array
function addOrder(item) {
  purchasedItems.push(item);
  renderOrder();
}

//Makes the "Your Order" section disapear/appear
// Goes through the purchasedItem array and adds HTML to the orderList element
//Displays the total in the orderTotal element
function renderOrder() {
  const orderEl = document.getElementById("order");
  const orderTotal = document.getElementById("order-list-total");
  let orderListHTML = "";
  let counter = 0;

  if (purchasedItems.length > 0) {
    orderEl.classList.remove("hide");
  } else {
    orderEl.classList.add("hide");
  }

  purchasedItems.forEach(function (item) {
    orderListHTML += `<div class="order-list-item">
                             <h1>${item.name}</h1>
                             <p data-order-number="${counter}">remove</p>
                             <h2>$${item.price}</h2>
                     </div>`;
    counter++;
  });

  let orderTotalHTML = `<h1>Total Price:</h1>
                        <h2>$${total}</h2>`;

  orderList.innerHTML = orderListHTML;
  orderTotal.innerHTML = orderTotalHTML;
}

renderMenu();
