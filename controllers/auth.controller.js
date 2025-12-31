const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_EXPIRE,
  REFRESH_EXPIRE
} = require("../config/jwt");

// helper
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRE
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRE
  });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  // 🔐 set refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,        // true in production (https)
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    accessToken,
    user
  });
};


// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  const user = await User.findOne({ refreshToken: token });
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  try {
    jwt.verify(token, REFRESH_SECRET);

    const newAccessToken = generateAccessToken(user._id);
    res.json({ success: true, accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: "Expired refresh token" });
  }
};


// LOGOUT
exports.logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { refreshToken: null });

  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out" });
};

