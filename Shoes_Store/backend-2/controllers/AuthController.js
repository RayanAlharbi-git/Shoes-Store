const User = require("../models/User.js");

class AuthController {
  // Handles user login requests
  async login(req, res) {
    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.model.findOne({ email });

      // If user is not found, return a 401 Unauthorized response
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the user's stored password
      const isMatch = await user.comparePassword(password);

      // If passwords do not match, return a 401 Unauthorized response
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate a token for the authenticated user
      const token = user.generateToken();

      // Respond with the generated token
      res.json({ token });
    } catch (error) {
      // In case of any error, respond with a 500 Internal Server Error status
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
