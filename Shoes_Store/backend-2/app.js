// app.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const cors = require("cors");
require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupDatabase();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(
      cors({
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow only these methods
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  }

  setupRoutes() {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  setupDatabase() {
    mongoose
      .connect(process.env.MONGO_URI, {})
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Could not connect to MongoDB", err));
  }

  start(port) {
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}

const app = new App();
const PORT = process.env.PORT || 3000;

app.start(PORT);
