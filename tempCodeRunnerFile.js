function renderMenu() {
  const menu = document.getElementById("menu");
  console.log(menu);

  let menuHTML = "";

  menuArray.forEach(function (item) {
    menuHTML += `<div class="menu-item">
                    <div class="menu-food-image">${item.emoji}</div>
                    <div class="menu-food-info">
                        <h1>${item.name}</h1>
                        <p>${item.ingredients}</p>
                        <h2>${item.price}</h2>
                    </div>
                    <button class="menu-food-btn">+</button>
                </div>`;
  });

  menu.innerHTML = menuHTML;
}

renderMenu();