const router = require("express").Router();
const UserController = require("../module/user/controller/userController");
const Middleware = require("../middleware/validateRequest");

router.get("/fetchDetails", Middleware.checkAuth, UserController.fetchUserDetails);

router.post("/saveDetails", Middleware.checkAuth, UserController.addUserDetails);

router.put("/updateTrxStatus", Middleware.checkAuth, UserController.updateTransactionStatus)

module.exports = router;