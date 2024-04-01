import Manga from "../model/manga.js";
import User from "../model/user.js";
import validator from "email-validator";
import { userErrors } from "../errors/index.js";
import upload from "../multerConfig.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

import fs from "fs";
import path from "path";

class UserService {
  async getProfile(req, res, next) {
    try {
      // console.log(req.user.name);
      const user = {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        profile: req.user.profile,
      };
      res.status(200).json(user);
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }

  async uploadImg(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      // console.log("service");
      // console.log(req.user.name);
      if (!user) {
        return res.status(404).json({ error: userErrors.USER_NOT_FOUND });
      }

      upload.single("image")(req, res, async (err) => {
        try {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          let imagePath;
          if (req.file) {
            if (user.profile !== "default.jpg") {
              imagePath = path.join(
                __dirname,
                "../public/images",
                user.profile
              );
              fs.unlinkSync(imagePath);
            }
            user.profile = req.file.filename;
            await user.save();
          }
          res.status(200).json({ message: "File uploaded successfully" });
        } catch (err) {
          console.error("Error saving user:", err);
          return res.status(500).json({ error: "Error saving user" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        console.log("arrive at service");
        user.name = req.body.name || user.name;
        if (req.body.email) {
          if (validator.validate(req.body.email)) {
            user.email = req.body.email || user.email;
          } else {
            return res
              .status(400)
              .json({ error: userErrors.INVALID_EMAIL_FORMAT });
          }
        }

        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profile: updatedUser.profile,
        });
      } else {
        res.status(404).json({ error: userErrors.USER_NOT_FOUND });
      }
    } catch (error) {
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }

  async add(req, res, next) {
    try {
      const user = req.user;
      const newManga = new Manga({
        manga_name: req.body.manga_name,
        // manga_image: req.body.manga_image,
        manga_link: req.body.manga_link,
        manga_chapter: req.body.manga_chapter,
        user: user._id,
      });
      const saveManga = await newManga.save();

      await User.findByIdAndUpdate(user._id, {
        $push: { manga_data: saveManga._id },
      });
      // res.json(saveManga);
      res.status(201).json({ data: saveManga });
    } catch (error) {
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }

  async view(req, res, next) {
    try {
      const user = req.user;
      // console.log(user);
      const allmanga = await Manga.find({ user: user._id });
      res.status(200).json(allmanga);
    } catch (error) {
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }

  async edit(req, res, next) {
    try {
      const allmanga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ status: true, data: allmanga });
      // res.status(200).json(allmanga);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }

  async delete(req, res, next) {
    try {
      const allmanga = await Manga.findByIdAndDelete(req.params.id);
      await User.findByIdAndUpdate(allmanga.user, {
        $pull: { manga_data: allmanga._id },
      });
      res.status(204).json({ data: allmanga });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: userErrors.COMMON_ERR });
    }
  }
}

const userService = new UserService();

export default userService;
