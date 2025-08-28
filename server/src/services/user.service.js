import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const generateTokens = (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    throw ApiError.serverError(error.message);
  }
};

export const registerUser = async (user) => {
  const { username, email } = user;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw ApiError.validationError("User already exists");
  }

  const newUser = await User.create(user);

  const { accessToken, refreshToken } = generateTokens(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  return { newUser, accessToken, refreshToken };
};

export const loginUser = async (userDetails) => {
  const { email, username, password } = userDetails;

  const user = await User.findOne({ $or: [{ email }, { username }] }).select(
    "+password"
  );
  if (!user) {
    throw ApiError.notFoundError("User");
  }

  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    throw ApiError.authError("Invalid credentials");
  }

  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const refreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken }).select("+refreshToken");
  if (!user) {
    throw ApiError.notFoundError("User");
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw ApiError.badRequestError("Invalid refresh token");
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (refreshToken) => {
  // TODO: invalidate access token
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw ApiError.notFoundError("User");
  }

  user.refreshToken = null;
  await user.save();

  return { user };
};
