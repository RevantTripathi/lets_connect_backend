const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select().lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});
const getOneUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.query
  //console.log(req.query)
  const user= await User.findOne({email}).lean().exec()
  if(!user){
    return res.status(409).json({massage:"user do not exist"})
    //console.log(user)
  }else{
    return res.json(user)
  }
})

const createNewUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, password,gender,contact } = req.body;

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "duplicate email" });
  }

  const userObject = { email, username, password,gender,contact };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ messgae: `Invalid user data received` });
  }
});
module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser
};
