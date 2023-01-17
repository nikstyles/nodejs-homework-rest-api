const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const shortid = require("shortid");

const { User, schemas } = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

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
    const avatarURL = gravatar.url(email);
    const verificationToken = shortid.generate();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Подтверждение регистрации на сайте",
      html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
    };
    await sendEmail(mail);

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
