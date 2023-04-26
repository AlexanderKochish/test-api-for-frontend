const { User, Position } = require("../models/models");

class UsersController {
  async createUser(req, res) {
    try {
      const { name, email, phone, positionId } = req.body;
      const photo = req.file;

      if (!name || !email || !phone || !positionId || !photo) {
        return res.status(422).json({
          success: false,
          message: "Not create new user",
          errors: {
            name: "This field is required.",
            email: "This field is required.",
            phone: "This field is required.",
            positionId: "This field is required.",
            photo: "This field is required.",
          },
        });
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return res.status(400).json({ message: "User this email exist" });
      }

      const position = await Position.findByPk(positionId);

      const user = await User.create({
        name,
        email,
        phone,
        photo: photo.originalname,
        position_user: position.name,
        positionId,
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      let { count, page } = req.query;
      page = page || 1;
      let limit = count || 5;
      let totalUsers = await User.findAll();
      let totalPages = Math.ceil(totalUsers.length / limit);

      if (page <= 0 || count <= 0) {
        const data = {
          success: false,
          message: "Validation failed",
          fails: {
            count: ["The count must be an integer."],
            page: ["The page must be at least 1."],
          },
        };
        return res.status(422).json(data);
      }
      if (page > totalPages) {
        return res.status(404).json({
          success: false,
          message: "Page not found",
        });
      }

      let offset = page * limit - limit;

      const users = await User.findAll({ limit, offset });
      if (users.length === 0) {
        return res.status(204).json({ message: "Users array is empty" });
      }
      const data = {
        success: true,
        page: page,
        total_pages: totalPages,
        total_users: totalUsers.length,
        count: count,
        users,
      };

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const errorData = {
        success: false,
        message: "The user with the requested identifier does not exist",
        fails: {
          user_id: "User not found",
        },
      };
      if (!user) {
        return res.status(404).json(errorData);
      }
      const data = {
        success: true,
        user,
      };
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
