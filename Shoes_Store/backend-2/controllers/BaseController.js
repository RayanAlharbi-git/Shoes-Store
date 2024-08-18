class BaseController {
  // Constructor to initialize the controller with a model
  constructor(model) {
    this.model = model;
  }

  // Handles the creation of a new item
  async create(req, res) {
    try {
      // Create a new item with the provided request body and a default role of "user"
      const item = await this.model.create({ ...req.body, role: "user" });
      // Respond with a 201 Created status and the created item
      res.status(201).json(item);
    } catch (error) {
      // Respond with a 400 Bad Request status if an error occurs
      res.status(400).json({ message: error.message });
    }
  }

  // Retrieves all items
  async getAll(req, res) {
    try {
      // Find all items from the model
      const items = await this.model.findAll();
      // Respond with the list of items
      res.json(items);
    } catch (error) {
      // Respond with a 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: error.message });
    }
  }

  // Retrieves a single item by its ID
  async getOne(req, res) {
    try {
      // Find an item by its ID from the request parameters
      const item = await this.model.findById(req.params.id);
      // Respond with a 404 Not Found status if the item does not exist
      if (!item) return res.status(404).json({ message: "Item not found" });
      // Respond with the found item
      res.json(item);
    } catch (error) {
      // Respond with a 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: error.message });
    }
  }

  // Updates an existing item by its ID
  async update(req, res) {
    try {
      // Update an item by its ID with the provided request body
      const item = await this.model.updateById(req.params.id, req.body);
      // Respond with a 404 Not Found status if the item does not exist
      if (!item) return res.status(404).json({ message: "Item not found" });
      // Respond with the updated item
      res.json(item);
    } catch (error) {
      // Respond with a 400 Bad Request status if an error occurs
      res.status(400).json({ message: error.message });
    }
  }

  // Deletes an item by its ID
  async delete(req, res) {
    try {
      // Delete an item by its ID
      const item = await this.model.deleteById(req.params.id);
      // Respond with a 404 Not Found status if the item does not exist
      if (!item) return res.status(404).json({ message: "Item not found" });
      // Respond with a success message
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      // Respond with a 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BaseController;
