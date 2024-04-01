// import Manga from "../model/manga.js";
// import User from "../model/user.js";
// import generateToken from "../utils/generateToken.js";
// import validator from "email-validator";

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExist = await User.findOne({ email });

//     if (userExist) {
//       res.status(400).json({ error: "User already Exist" });
//     }

//     if (validator.validate(email)) {
//       const user = await User.create({
//         email,
//         name,
//         password,
//       });
//       if (user) {
//         generateToken(res, user._id);
//         res.status(201).json({
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           // status: false,
//         });
//       } else {
//         res.status(400).json({ error: "Invalid user data" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid email" });
//     }

//     // if (user) {
//     //   generateToken(res, user._id);
//     //   res.status(201).json({
//     //     _id: user._id,
//     //     email: user.email,
//     //     name: user.name,
//     //     // status: false,
//     //   });
//     // } else {
//     //   res.status(400).json({ error: "Invalid user data" });
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const authUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: "User does not exist" });
//     }

//     if (user && (await user.matchPassword(password))) {
//       generateToken(res, user._id);
//       console.log("auth try");
//       res.status(201).json({
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//         status: true,
//       });
//     } else {
//       res.status(401).json({ error: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const logoutUser = async (req, res) => {
//   try {
//     res.clearCookie("jwt");
//     res.cookie("jwt", "", {
//       httpOnly: true,
//       expires: new Date(0),
//       path: "/",
//     });
//     console.log("logout try");
//     res.status(200).json({ message: "user logged out", status: true });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getUserProfile = async (req, res) => {
//   // console.log(req.user);
//   const user = {
//     _id: req.user._id,
//     email: req.user.email,
//     name: req.user.name,
//   };
//   res.status(200).json(user);
// };

// const updateUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     // if (validator.validate(req.body.email)) {
//     //   user.email = req.body.email || user.email;
//     // }

//     if (req.body.email) {
//       if (validator.validate(req.body.email)) {
//         user.email = req.body.email || user.email;
//       } else {
//         return res.status(400).json({ error: "Invalid email format" });
//       }
//     }

//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404).json({ error: "User Not Found" });
//   }
// };

// const addingManga = async (req, res) => {
//   try {
//     const user = req.user;
//     const newManga = new Manga({
//       manga_name: req.body.manga_name,
//       // manga_image: req.body.manga_image,
//       manga_link: req.body.manga_link,
//       manga_chapter: req.body.manga_chapter,
//       user: user._id,
//     });
//     const saveManga = await newManga.save();

//     await User.findByIdAndUpdate(user._id, {
//       $push: { manga_data: saveManga._id },
//     });
//     // res.json(saveManga);
//     res.status(201).json({ data: saveManga });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const viewingManga = async (req, res) => {
//   try {
//     const user = req.user;
//     // console.log(user);
//     const allmanga = await Manga.find({ user: user._id });
//     res.status(200).json(allmanga);
//   } catch (error) {
//     // console.error(error);
//   }
// };

// // const viewingMangaId = async (req, res) => {
// //   try {
// //     const allmanga = await Manga.findById(req.params.id);
// //     res.status(200).json(allmanga);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };

// const editingManga = async (req, res) => {
//   try {
//     const allmanga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json({ status: true, data: allmanga });
//     // res.status(200).json(allmanga);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const deletingManga = async (req, res) => {
//   try {
//     const allmanga = await Manga.findByIdAndDelete(req.params.id);
//     await User.findByIdAndUpdate(allmanga.user, {
//       $pull: { manga_data: allmanga._id },
//     });
//     res.status(204).json({ data: allmanga });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // const deletingManga = async (req, res) => {
// //   try {
// //     const allmanga = await Manga.findByIdAndDelete(req.params.id);
// //     await User.findByIdAndUpdate(manga.user, {
// //       $pull: { manga_data: manga._id },
// //     });
// //     res.status(204).json({ data: allmanga });
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };

// export {
//   addingManga,
//   viewingManga,
//   // viewingMangaId,
//   editingManga,
//   deletingManga,
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
// };
