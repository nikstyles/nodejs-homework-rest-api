const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, `There is no user with this email ${email}`);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw HttpError(400, "Email not verify");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
