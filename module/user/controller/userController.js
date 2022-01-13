const users = require("./../model/userModel");

exports.getUserDetails = async (req, res, next) => {
  let query = req.query || {};
  let firstname = query?.firstname?.length ? query.firstname : null;
  let lastname = query?.lastname?.length ? query.lastname : null;
  let email = query?.email?.length ? query.email : null;
  let walletAddress = query?.address?.length ? query.address : null;

  users.findOne(
    {
      $or: [{ firstname }, { lastname }, { email }, { walletAddress }],
    },
    (errors, user) => {
      if (errors || !user) {
        return res.json({
          status: false,
          message: "Failed to fetch user details or user does not exist",
          errors: errors?.errors,
        });
      }

      return res.json({
        status: true,
        user,
        message: "User details fetched sucessfully",
      });
    }
  );
};

exports.saveUserDetails = async (req, res, next) => {
  let user = new users();
  let body = req.body || {};
  user.firstname = body.firstname || "";
  user.lastname = body.lastname || "";
  user.email = body.email || "";
  user.walletAddress = body.address || null;

  user.save((errors, user) => {
    if (errors) {
      return res.json({
        status: false,
        message: "User details failed to save",
        errors: errors?.errors,
      });
    }

    return res.json({
      status: true,
      user,
      message: "User details saved sucessfully",
    });
  });
};
