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

exports.addUserDetails = async (req, res, next) => {

  try{
    
    let userRecord = []

    for(let i = 0; i < req.body.length; i++){

      let body = req.body[i] || {};

      let userData = {}

      userData.firstname = body.firstname || "";
      userData.lastname = body.lastname || "";
      userData.email = body.email || "";
      userData.walletAddress = body.walletAddress || null;
      userData.amountTransfered = body.amountTransfered || 0;
      userData.transactionHash = body.transactionHash;
      userData.transactionStatus = body.transactionHash !== "Declined" ? "pending" : "failed"
      userData.transactionLink = body.transactionLink
  
      userData.adminId = req.user._id || req.user.user._id;

      userRecord.push(userData)

    }

    //console.log(userRecord)

    users.insertMany(userRecord).then(() => {    
      return res.status(200).send("User details saved sucessfully") // Success
    }).catch((err) => {
      console.log("h",err)
      return res.status(500).send("Some Error Occured, Please retry")
    });

  } catch(err) {
    console.log(err)
    return res.status(500).send("Internal Server Error")
  }
}

exports.fetchUserDetails = async (req, res, next) => {

  try{
    let adminId = req.user._id || req.user.user._id;

    let userDetails = await users.find({ adminId:adminId });

    return res.status(200).send(userDetails);

  } catch(err) {

    return res.status(500).send("Internal Server Error")

  }

};

exports.updateTransactionStatus = async (req, res, next) => {

  try{

    //console.log(req.body)

    for(let i = 0; i < req.body.length; i++){

      let body = req.body[i] || {}

      await users.updateMany({transactionHash: body.transactionHash}, {transactionStatus: body.transactionStatus})

    }

    return res.status(200).send("Transaction Status Updated")


  } catch (err) {

    return res.status(500).send("Internal Server Error")

  }

}
