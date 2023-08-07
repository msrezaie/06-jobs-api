const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors/index");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("no valid token found!");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: decodedToken.id, name: decodedToken.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("no valid token found");
  }
};

module.exports = authenticate;
