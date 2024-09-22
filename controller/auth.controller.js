const { User } = require("../database/models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("../config/secret");

const generateAccessToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, secret, { expiresIn: "3h" });
};
class AuthController {
  async registration(req, res) {
    try {
      const { userName, password } = req.body;

      const candidate = await User.findOne({ where: { userName } });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const salt = bcrypt.genSaltSync(7);
      const hashPassword = bcrypt.hashSync(password, salt);

      await User.create({
        userName,
        password: hashPassword,
      });

      return res.json({
        message: `Пользователь успешно зарегистрирован`,
      });
    } catch (error) {}
  }

  async login(req, res) {
    try {
      const { userName, password } = req.body;

      const user = await User.findOne({ where: { userName } });

      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      const validatePassword = bcrypt.compareSync(password, user.password);

      if (!validatePassword) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }
      const token = generateAccessToken(user.userName);
      return res.json({ token });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async getUsers(_req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async checkAuth(_req, res) {
    try {
      return res.json({});
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = new AuthController();
