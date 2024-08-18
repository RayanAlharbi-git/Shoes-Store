// Import required modules and controllers
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authenticate, authorize } = require("../middleware/auth");

// Route to create a new product (requires authentication and admin authorization)
router.post(
  "/",
  authenticate, // Ensure the user is authenticated
  authorize("admin"), // Ensure the user has admin role
  ProductController.create.bind(ProductController) // Bind the ProductController's create method to the route
);

// Route to get all products (no authentication required)
router.get("/", ProductController.getAll.bind(ProductController));

// Route to get a single product by ID (no authentication required)
router.get("/:id", ProductController.getOne.bind(ProductController));

// Route to update a product by ID (requires authentication and admin authorization)
router.put(
  "/:id",
  authenticate, // Ensure the user is authenticated
  authorize("admin"), // Ensure the user has admin role
  ProductController.update.bind(ProductController) // Bind the ProductController's update method to the route
);

// Route to delete a product by ID (requires authentication and admin authorization)
router.delete(
  "/:id",
  authenticate, // Ensure the user is authenticated
  authorize("admin"), // Ensure the user has admin role
  ProductController.delete.bind(ProductController) // Bind the ProductController's delete method to the route
);

// Route to get products by category (no authentication required)
router.get(
  "/category/:category",
  ProductController.getByCategory.bind(ProductController) // Bind the ProductController's getByCategory method to the route
);

// Export the router to be used in the main application
module.exports = router;
