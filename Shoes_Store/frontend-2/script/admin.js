document.addEventListener("DOMContentLoaded", () => {
  const addProductButton = document.getElementById("addProductButton");
  const listUsersButton = document.getElementById("listUsersButton");
  const productTable = document
    .getElementById("productsTable")
    .querySelector("tbody");
  const userTable = document
    .getElementById("usersTable")
    .querySelector("tbody");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You need to log in first");
    window.location.href = "login.html";
    return;
  }

  // Add Product Event Listener
  addProductButton.addEventListener("click", async () => {
    const title = document.getElementById("productTitle").value;
    const category = document.getElementById("productCategory").value;
    const sizes = document
      .getElementById("productSizes")
      .value.split(",")
      .map((s) => s.trim());
    const price = parseFloat(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value;

    if (!title || !category || !sizes.length || isNaN(price) || !image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category, sizes, price, image }),
      });

      if (response.ok) {
        alert("Product added successfully");
        // Clear the form fields
        document.getElementById("productTitle").value = "";
        document.getElementById("productCategory").value = "";
        document.getElementById("productSizes").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productImage").value = "";
        fetchProducts(); // Refresh product list
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    }
  });

  // List Users Event Listener
  listUsersButton.addEventListener("click", fetchUsers);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const users = await response.json();
        displayUsers(users);
      } else {
        alert("Failed to list users");
      }
    } catch (error) {
      console.error("Error listing users:", error);
      alert("An error occurred while listing users");
    }
  }

  function displayUsers(users) {
    userTable.innerHTML = ""; // Clear existing rows
    users.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>
              <button class="button edit-button" onclick="editUser('${user._id}')">Edit</button>
              <button class="button delete-button" onclick="deleteUser('${user._id}')">Delete</button>
            </td>
          `;

      userTable.appendChild(row);
    });
  }

  window.editUser = async function (userId) {
    const user = prompt(
      "Enter new user details (firstName,lastName,email):"
    ).split(",");
    if (user.length !== 3) return alert("Invalid input format");

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: user[0],
            lastName: user[1],
            email: user[2],
          }),
        }
      );

      if (response.ok) {
        alert("User updated successfully");
        fetchUsers(); // Refresh user list
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user");
    }
  };

  window.deleteUser = async function (userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers(); // Refresh user list
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const products = await response.json();
        displayProducts(products);
      } else {
        alert("Failed to list products");
      }
    } catch (error) {
      console.error("Error listing products:", error);
      alert("An error occurred while listing products");
    }
  }

  function displayProducts(products) {
    productTable.innerHTML = ""; // Clear existing rows
    products.forEach((product) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.category}</td>
            <td>${product.sizes.join(", ")}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="${
        product.title
      }" style="width: 100px; height: auto;" /></td>
            <td>
              <button class="button edit-button" onclick="editProduct('${
                product._id
              }')">Edit</button>
              <button class="button delete-button" onclick="deleteProduct('${
                product._id
              }')">Delete</button>
            </td>
          `;

      productTable.appendChild(row);
    });
  }

  window.editProduct = async function (productId) {
    const product = prompt(
      "Enter new product details (title,category,sizes (comma separated),price,image):"
    ).split(",");
    if (product.length !== 5) return alert("Invalid input format");

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: product[0],
            category: product[1],
            sizes: product[2].split(",").map((s) => s.trim()),
            price: parseFloat(product[3]),
            image: product[4],
          }),
        }
      );

      if (response.ok) {
        alert("Product updated successfully");
        fetchProducts(); // Refresh product list
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product");
    }
  };

  window.deleteProduct = async function (productId) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully");
        fetchProducts(); // Refresh product list
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product");
    }
  };

  // Initial fetch for products and users
  fetchProducts();
  fetchUsers();
});
