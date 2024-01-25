const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const isAuthenticated = (request, response, next) => {
  try {
    const token = request.headers.authorization.split("")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    request.tokenPayload = payload;
    next();
  } catch (err) {
    response.status(401).json("token not provided or not valid");
  }
};

const isCompany = async (request, response, next) => {
  const currentUser = await User.findById(request.tokenPayload.userId);
  if (currentUser.role?.includes("company")) {
    next();
  } else {
    response.status(403).json("You need to be a company user for that");
  }
};

const isPerson = async (request, response, next) => {
  const currentUser = await User.findById(request.tokenPayload.userId);
  if (currentUser.role?.includes("person")) {
    next();
  } else {
    response.status(403).json("You need to be a person user for that");
  }
};

module.exports = { isAuthenticated };
