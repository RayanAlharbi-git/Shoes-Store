document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  // Add event listeners for filter and sort options
  document
    .getElementById("priceSort")
    .addEventListener("change", window.applyFilters);
  document
    .getElementById("minPrice")
    .addEventListener("input", window.applyFilters);
  document
    .getElementById("maxPrice")
    .addEventListener("input", window.applyFilters);

  const categoryButtons = document.querySelectorAll(
    ".filters button[data-category]"
  );
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      button.classList.add("active");

      window.applyFilters();
    });
  });
});

window.products = []; // Store all fetched products here

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    window.products = await response.json();
    window.displayProducts(window.products); // Display all products initially
    updateButtonState(); // Ensure button states are correctly set on load
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function createBuyButton(product) {
  const buyButton = document.createElement("button");
  buyButton.classList.add("buy-button");
  buyButton.textContent = "Add to Cart";

  // Add click event listener
  buyButton.addEventListener("click", () => {
    // Add product to cart
    addToCart(product);

    // Update button appearance and text
    buyButton.classList.add("added-to-cart");
    buyButton.textContent = "Added to Cart";
    buyButton.disabled = true; // Disable the button after adding to cart

    // Update the delete button state
    updateButtonState();
  });

  return buyButton;
}

// Function to create the delete button and handle click event
function createDeleteButton(productId) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Remove";

  // Add click event listener
  deleteButton.addEventListener("click", () => {
    const size = document.querySelector(`#sizes-${productId}`).value;
    removeFromCart(productId, size);
  });

  return deleteButton;
}

// Update the displayProducts function to include delete buttons
window.displayProducts = function (products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.classList.add("product-box");
    productBox.dataset.id = product._id;

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;

    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;

    const productCategory = document.createElement("p");
    productCategory.textContent = `Category: ${product.category}`;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

    const sizeSelect = document.createElement("div");
    sizeSelect.classList.add("sizes");
    sizeSelect.innerHTML = `<label for="sizes-${product._id}">Size:</label>
                <select id="sizes-${product._id}">
                    ${product.sizes

                      .map((size) => `<option value="${size}">${size}</option>`)
                      .join("")}
                </select>`;

    const buyButton = createBuyButton(product);

    productBox.appendChild(productImage);
    productBox.appendChild(productTitle);
    productBox.appendChild(productCategory);
    productBox.appendChild(productPrice);
    productBox.appendChild(sizeSelect);
    productBox.appendChild(buyButton);

    productList.appendChild(productBox);
    const selectElement = sizeSelect.querySelector("select");
    selectElement.addEventListener("change", () => {
      updateButtonState();
    });
  });

  updateButtonState(); // Update button states and visibility of delete buttons
};

window.filterProducts = function (category) {
  let filteredProducts = window.products;

  // Filter by category
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  window.displayProducts(filteredProducts);
};

window.sortProductsByPrice = function () {
  const sortBy = document.getElementById("priceSort").value;
  let sortedProducts = [...window.products];

  // Sort products
  if (sortBy === "lowToHigh") {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  window.displayProducts(sortedProducts);
};

window.filterByPriceRange = function () {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;

  let filteredProducts = window.products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  window.displayProducts(filteredProducts);
};

window.applyFilters = function () {
  let filteredProducts = [...window.products];

  // Filter by category
  const category =
    document.querySelector(".filters button.active")?.dataset.category || "all";
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price range
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;
  filteredProducts = filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  // Sort by price
  const sortBy = document.getElementById("priceSort").value;
  if (sortBy === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Display the filtered and sorted products
  window.displayProducts(filteredProducts);
};

window.addToCart = function (product) {
  const size = document.querySelector(`#sizes-${product._id}`).value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product with the same ID and size already exists in the cart
  const existingProductIndex = cart.findIndex(
    (item) => item._id === product._id && item.size === size
  );

  if (existingProductIndex === -1) {
    // Add new product if not already in cart
    cart.push({ ...product, size });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update button state
  const button = document.querySelector(
    `.product-box[data-id="${product._id}"] .buy-button`
  );
  button.innerText = "Added to Cart";
  button.style.backgroundColor = "green";
  button.style.color = "white";
  button.disabled = true;

  // Update the button state and visibility of delete buttons
  updateButtonState();
};

window.removeFromCart = function (productId, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove the product with the specified ID and size from the cart
  cart = cart.filter((item) => !(item._id === productId && item.size === size));

  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the button state and visibility of delete buttons
  updateButtonState();
};

// Update the button state based on cart contents
function updateButtonState() {
  const productBoxes = document.querySelectorAll(".product-box");

  productBoxes.forEach((box) => {
    const productId = box.dataset.id;
    const sizeSelect = box.querySelector(".sizes select");
    const size = sizeSelect ? sizeSelect.value : "";
    const button = box.querySelector(".buy-button");
    const existingDeleteButton = box.querySelector(".delete-button");

    // Check if the product with the selected size is in the cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some(
      (item) => item._id === productId && item.size === size
    );

    if (isInCart) {
      button.innerText = "Added to Cart";
      button.style.backgroundColor = "green";
      button.style.color = "white";
      button.disabled = true;

      if (!existingDeleteButton) {
        const newDeleteButton = createDeleteButton(productId);
        box.appendChild(newDeleteButton);
      } else {
        existingDeleteButton.style.display = "inline-block";
      }
    } else {
      button.innerText = "Add to Cart";
      button.style.backgroundColor = "#ffffff"; // Reset to original color
      button.style.color = "#000000"; // Reset to original color
      button.disabled = false;

      if (existingDeleteButton) {
        existingDeleteButton.style.display = "none";
      }
    }
  });
}
