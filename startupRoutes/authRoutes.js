const router = require("express").Router();
const AuthController = require("../module/auth/controller/authController");
const Middleware = require("../middleware/validateRequest");


router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.post("/refresh_token", AuthController.generateRefreshToken);

router.delete("/logout", AuthController.logout);

router.get("/protected_resource", Middleware.checkAuth, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;