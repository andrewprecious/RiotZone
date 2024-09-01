const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaderToken = req.headers.token;
  if (authHeaderToken) {
    // extract token and verify it
    const token = authHeaderToken.split(" ")[1]; // get token from bearer
    jwt.verify(token, process.env.JWT_SEC, (err, decodedUser) => {
      if (err) {
        return res.status(403).json("token is not valid");
      }
      req.user = decodedUser;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(401)
        .json("You are not allowed to do that! Admins only");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
