const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Company = require("../models/Company.model");

const isAuthenticated = (request, response, next) => {
  try {
    if (request.headers.authorization?.split(" ")[0] === "Bearer") {
      const token = request.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      request.tokenPayload = payload;
      next();
    } else {
      throw new Error("No token");
    }
  } catch (err) {
    response.status(401).json("token not provided or not valid");
  }
};

const isEmployee = async (request, response, next) => {
  try {
    const company = await Company.findById(request.companyId);
    if (!company) {
      return response.status(403).json("Company not found");
    }

    const currentUser = await User.findById(request.tokenPayload.userId);
    if (!currentUser) {
      return response.status(403).json("User not found");
    }

    if (company.employees.includes(currentUser._id)) {
      next();
    } else {
      response.status(403).json("You need to be a company employee for that");
    }
  } catch (error) {
    response.status(500).json("Error checking employee status");
  }
};


/*
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
*/

module.exports = { isAuthenticated };
