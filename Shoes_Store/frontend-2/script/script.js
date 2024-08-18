document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  const navbar = document.querySelector("nav ul");

  if (token) {
    // User is already logged in, update the UI
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("userSection").style.display = "block";
    const userIcon = document.getElementById("userIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");

    userIcon.addEventListener("click", function () {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (response.ok) {
        if (data.role === "admin") {
          const adminLink = document.createElement("li");
          adminLink.innerHTML = '<a href="admin.html">Admin</a>';
          navbar.appendChild(adminLink);
        }

        document.getElementById("loginSectionContent").style.display = "none";
        document.getElementById("userInfoSection").style.display = "block";
        document.getElementById("firstName").innerText =
          "First Name: " + data.firstName;
        document.getElementById("lastName").innerText =
          "Last Name: " + data.lastName;
        document.getElementById("emailAddress").innerText =
          "Email: " + data.email;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    // User is not logged in, show login section
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("registrationSection").style.display = "block";
    document.getElementById("userSection").style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logout") {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.reload(); // Reload the page to update UI
  }
});
