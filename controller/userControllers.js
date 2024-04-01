import { UserService } from "../services/index.js";

class UserController {
  async getUserProfile(req, res, next) {
    try {
      await UserService.getProfile(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      console.log("arrive at controller");
      await UserService.updateProfile(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async addingManga(req, res, next) {
    try {
      await UserService.add(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async viewingManga(req, res, next) {
    try {
      await UserService.view(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async editingManga(req, res, next) {
    try {
      await UserService.edit(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async deletingManga(req, res, next) {
    try {
      await UserService.delete(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async uploadImage(req, res, next) {
    try {
      console.log("controller");
      await UserService.uploadImg(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }
}

const userController = new UserController();

export default userController;
