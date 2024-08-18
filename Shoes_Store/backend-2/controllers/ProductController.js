const BaseController = require("./BaseController.js");
const Product = require("../models/Product.js");

class ProductController extends BaseController {
  // Constructor to initialize the controller with the Product model
  constructor() {
    super(Product); // Call the BaseController constructor with the Product model
  }

  // Retrieves products by their category
  async getByCategory(req, res) {
    try {
      // Find products by category using the model's findByCategory method
      const products = await this.model.findByCategory(req.params.category);
      // Respond with the list of products
      res.json(products);
    } catch (error) {
      // Respond with a 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: error.message });
    }
  }
}

// Export a new instance of ProductController
module.exports = new ProductController();
