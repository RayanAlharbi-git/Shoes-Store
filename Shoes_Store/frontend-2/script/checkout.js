document.addEventListener("DOMContentLoaded", () => {
  // Function to calculate and update the order summary
  function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cart.forEach((item) => {
      subtotal += item.price;
    });

    const discount = 0; // You can implement discount logic if needed
    const total = subtotal - discount;

    // Update the order summary section
    document.querySelector(".order-summary").innerHTML = `
        <h2>Order Summary</h2>
        ${cart
          .map(
            (item) => `
          <p><strong>${item.title}:</strong> $${item.price.toFixed(2)}</p>
        `
          )
          .join("")}
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Discount:</strong> $${discount.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      `;
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Perform form validation here if needed
    window.location.href = "order-finished.html";
  }

  // Call the function to update the order summary
  updateOrderSummary();

  // Attach the form submit handler
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
