// seed.js
const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const User = require("./models/User.js");
require("dotenv").config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Check if the Products collection is empty
    const productCount = (await Product.findAll()).length;
    if (productCount === 0) {
      // Seed Products
      console.log("Seeding Products...");
      await Product.create({
        title: "SHOE 1",
        category: "men",
        sizes: ["9", "10", "11"],
        price: 29.99,
        image:
          "https://th.bing.com/th/id/OIP.sA1OOol-g-ZWP5aSQEYNXwAAAA?rs=1&pid=ImgDetMain",
      });
      console.log("Products seeded successfully.");
    } else {
      console.log("Products already seeded.");
    }

    // Check if the Users collection is empty
    const userCount = (await User.findAll()).length;
    if (userCount === 0) {
      // Seed Users
      console.log("Seeding Users...");
      await User.create({
        email: "admin@example.com",
        password: "adminpassword",
        role: "admin",
        password: "admin",
        firstName: "test",
        lastName: "test",
      });
      console.log("Users seeded successfully.");
    } else {
      console.log("Users already seeded.");
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with error code
  }
}

// Run the seed function
seedDatabase();
