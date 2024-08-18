document.addEventListener("DOMContentLoaded", () => {
  // Function to update the cart UI
  function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".container-cart");

    // Clear existing items
    cartContainer.innerHTML = "";

    let subtotal = 0;

    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = "Product Image";

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("cart-item-info");

      const itemTitle = document.createElement("h3");
      itemTitle.textContent = item.title;

      const itemSize = document.createElement("p");
      itemSize.textContent = `Size: ${item.size}`;

      itemInfo.appendChild(itemTitle);
      itemInfo.appendChild(itemSize);

      const itemPrice = document.createElement("p");
      itemPrice.classList.add("cart-item-price");
      itemPrice.textContent = `$${item.price.toFixed(2)}`;

      cartItem.appendChild(itemImage);
      cartItem.appendChild(itemInfo);
      cartItem.appendChild(itemPrice);

      cartContainer.appendChild(cartItem);

      subtotal += item.price;
    });

    // Add price details
    const priceDetails = document.createElement("div");
    priceDetails.classList.add("price-details");

    const subtotalElem = document.createElement("p");
    subtotalElem.innerHTML = `<strong>Subtotal:</strong> $${subtotal.toFixed(
      2
    )}`;

    const discountElem = document.createElement("p");
    discountElem.innerHTML = `<strong>Discount:</strong> $0.00`;

    const totalElem = document.createElement("p");
    totalElem.innerHTML = `<strong>Total:</strong> $${subtotal.toFixed(2)}`;

    priceDetails.appendChild(subtotalElem);
    priceDetails.appendChild(discountElem);
    priceDetails.appendChild(totalElem);

    cartContainer.appendChild(priceDetails);
    cartContainer.innerHTML += `<div class="discount-code">
                <input type="text" placeholder="Enter discount code">
                <button>Apply</button>
            </div>
            <button class="checkout-button" onclick="window.location.href='checkout.html'">Checkout</button>`;
  }

  // Call the function to update the cart UI on page load
  updateCart();
});
