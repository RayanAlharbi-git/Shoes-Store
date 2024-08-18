const mongoose = require("mongoose");
const BaseModel = require("./BaseModel");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  sizes: [{ type: String }],
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

class Product extends BaseModel {
  constructor() {
    super("Product", productSchema);
  }

  async findByCategory(category) {
    return await this.model.find({ category });
  }
}

module.exports = new Product();
