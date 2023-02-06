const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, 'secret123', {
    expiresIn: "12h",
  });

  console.log("Generated Token", token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

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

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
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

// const logout = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[1];
//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldn't find token" });
//   }
//   jwt.verify(String(prevToken), 'secret123', (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authentication failed" });
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";
//     return res.status(200).json({ message: "Successfully Logged Out" });
//   });
// };

// exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
