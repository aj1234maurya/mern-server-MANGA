import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";
import validator from "email-validator";
import { authErrors } from "../errors/index.js";

class AuthService {
  async register(req, res, next) {
    try {
      console.log("regist2");
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(400).json({ error: authErrors.ALREADY_EXIST });
      }

      if (validator.validate(email)) {
        const user = await User.create({
          email,
          name,
          password,
          profile: "default.jpg",
        });
        if (user) {
          generateToken(res, user._id);
          res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
          });
        } else {
          res.status(400).json({ error: authErrors.INVALID_DATA });
        }
      } else {
        res.status(400).json({ error: authErrors.INVALID_EMAIL });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: authErrors.DOESNT_EXIST });
      }

      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        console.log("auth try");
        res.status(201).json({
          _id: user._id,
          email: user.email,
          name: user.name,
          profile: user.profile,
          status: true,
        });
      } else {
        res.status(401).json({ error: authErrors.INVALID_EMAIL_PASSWORD });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("jwt");
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      });
      console.log("logout try");
      res.status(200).json({ message: "user logged out", status: true });
    } catch (error) {
      console.error(error);
    }
  }
}

const authService = new AuthService();

export default authService;

// import User from "../model/user.js";
// import generateToken from "../utils/generateToken.js";
// import validator from "email-validator";

// class AuthService {
//   async register(req, res, next) {
//     try {
//       console.log("regist2");
//       const { name, email, password } = req.body;
//       const userExist = await User.findOne({ email });

//       if (userExist) {
//         res.status(400).json({ error: "User already Exist" });
//       }

//       if (validator.validate(email)) {
//         const user = await User.create({
//           email,
//           name,
//           password,
//         });
//         if (user) {
//           generateToken(res, user._id);
//           res.status(201).json({
//             _id: user._id,
//             email: user.email,
//             name: user.name,
//           });
//         } else {
//           res.status(400).json({ error: "Invalid user data" });
//         }
//       } else {
//         res.status(400).json({ error: "Invalid email" });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async login(req, res, next) {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ error: "User does not exist" });
//       }

//       if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);
//         console.log("auth try");
//         res.status(201).json({
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           status: true,
//         });
//       } else {
//         res.status(401).json({ error: "Invalid email or password" });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async logout(req, res, next) {
//     try {
//       res.clearCookie("jwt");
//       res.cookie("jwt", "", {
//         httpOnly: true,
//         expires: new Date(0),
//         path: "/",
//       });
//       console.log("logout try");
//       res.status(200).json({ message: "user logged out", status: true });
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// const authService = new AuthService();

// export default authService;
