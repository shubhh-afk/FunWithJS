document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 399.99 },
    { id: 2, name: "Product 2", price: 199.99 },
    { id: 3, name: "Product 3", price: 249.99 },
  ];

  const productCart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name}  -  ₹${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id")); //gets the product id parse it into int.
      const product = products.find((p) => p.id === productId); //
      addToCart(product);
    }
  });

  function addToCart(product) {
    productCart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let total = 0;
    if (productCart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      productCart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <div class="cart-item" >
        <div class="item-name">
        ${item.name} - ₹${item.price.toFixed(2)}
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
        </div>`;
        cartItems.appendChild(cartItem);
        totalPrice.innerText = `₹${total.toFixed(2)}`;
      });

      const removeBtns = document.querySelectorAll(".remove-btn");
      removeBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          productCart.splice(index, 1);
          renderCart();
        });
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPrice.innerText = `₹0.00`;
    }
  }

  checkoutBtn.addEventListener("click", () => {
    productCart.length = 0;
    console.log(productCart);
    alert("Checkout Successfull");
    renderCart();
  });
});
