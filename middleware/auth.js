const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key";

    
    const extractedToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(extractedToken, secret);

    req.user = decoded;

    next(); 

  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
