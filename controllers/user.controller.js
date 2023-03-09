const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//signup

const signup = async (req, res, next) => {
  const { name, email, phoneNumber, password, gender } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json("User already exists! Login Instead");
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    gender, 
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};


//login

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json("You don't have an account, Signup please");
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json("Wrong email or password");
  }
  const token = jwt.sign({ id: existingUser._id }, 'secret123', {
    expiresIn: "12h",
  });

  console.log("Generated Token", token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  // adding special characters before the ( = ) and after the actual token, to be able to get it easily, 
  // in case of multiple cookies.
  res.cookie(String(`${existingUser._id}<<%.P`), token + "DllpK", {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};


//verify token

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  // getting the token by defining the same special charachter from above 
  // + adding the ( = ) sign which is added after the cookie id
  const token = cookies?.split('<<%.P=').pop().split('DllpK')[0];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), 'secret123', (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};


// get user data 

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies?.split('<<%.P=').pop().split('DllpK')[0];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), 'secret123', (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}<<%.P`);
    req.cookies[`${user.id}<<%.P`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

// exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.logout = logout;



