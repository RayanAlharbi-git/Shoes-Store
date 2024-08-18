// Import the jsonwebtoken library for handling JWT authentication
const jwt = require("jsonwebtoken");

// Middleware function to authenticate users based on JWT
const authenticate = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, respond with a 401 Unauthorized status
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If token is invalid or expired, respond with a 403 Forbidden status
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Attach the decoded user information to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  });
};

// Middleware function to authorize users based on roles
const authorize = (roles = []) => {
  // Ensure roles is an array
  if (typeof roles === "string") roles = [roles];

  // Return a middleware function that checks user roles
  return (req, res, next) => {
    // If no specific roles are required, or the user's role is in the allowed roles, proceed
    if (!roles.length || roles.includes(req.user.role)) {
      return next();
    }
    // If the user's role is not allowed, respond with a 403 Forbidden status
    res.status(403).json({ message: "Access denied" });
  };
};

// Export the middleware functions
module.exports = { authenticate, authorize };
