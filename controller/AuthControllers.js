import { AuthService } from "../services/index.js";

class AuthController {
  async registerUser(req, res, next) {
    try {
      console.log("regist");
      await AuthService.register(req, res, next);
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      await AuthService.login(req, res, next);
    } catch (error) {
      console.log(error);
    }
  }

  async logoutUser(req, res, next) {
    try {
      await AuthService.logout(req, res, next);
    } catch (error) {
      console.log(error);
    }
  }
}

const authController = new AuthController();

export default authController;
