const BaseController = require("./BaseController.js");
const User = require("../models/User.js");

class UserController extends BaseController {
  // Constructor to initialize the controller with the User model
  constructor() {
    super(User); // Call the BaseController constructor with the User model
  }

  // Retrieves the current user's details
  async getSelf(req, res) {
    try {
      // Find the user by ID from the request's user information
      const item = await this.model.findById(req.user.id);
      // Respond with the user details if found
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (error) {
      // Respond with a 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: error.message });
    }
  }
}

// Export a new instance of UserController
module.exports = new UserController();
