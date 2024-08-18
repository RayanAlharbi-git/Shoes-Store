const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/", UserController.create.bind(UserController));

// Only authenticated(admin) users can get all users
router.get(
  "/",
  authenticate,
  authorize("admin"),
  UserController.getAll.bind(UserController)
);

// Get yourself
router.get("/me", authenticate, UserController.getSelf.bind(UserController));

// Only authenticated users can get a single user
router.get("/:id", authenticate, UserController.getOne.bind(UserController));

// Only authenticated(admin) users can update a user
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  UserController.update.bind(UserController)
);

// Only authenticated(admin) users can delete a user
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  UserController.delete.bind(UserController)
);

module.exports = router;
