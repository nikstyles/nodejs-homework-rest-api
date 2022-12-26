const bcrypt = require("bcrypt");

const { User, schemas } = require("../../models/user");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
