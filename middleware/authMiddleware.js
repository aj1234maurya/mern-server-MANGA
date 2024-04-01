import jwt from "jsonwebtoken";
import User from "../model/user.js";
import authMiddlewareErrors from "../errors/authMiddlewareError.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: authMiddlewareErrors.INVALID_TOKEN });
    }
  } else {
    res.status(401).json({ error: authMiddlewareErrors.NO_TOKEN });
  }
};

export default protect;

// import jwt from "jsonwebtoken";
// import User from "../model/user.js";
// import authMiddlewareErrors from "../errors/authMiddlewareError.js";

// const protect = async (req, res, next) => {
//   let token;
//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ error: "Not authorized and Invalid Token" });
//     }
//   } else {
//     res.status(401).json({ error: "Not Authorized and No token" });
//   }
// };

// export default protect;
