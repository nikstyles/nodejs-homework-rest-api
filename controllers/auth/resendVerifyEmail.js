// const shortid = require("shortid");
const HttpError = require("../../helpers/HttpError");

const { User, schemas } = require("../../models/user");
const { sendEmail } = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = schemas.verifyEmailSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required field email");
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, "Not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const mail = {
      to: email,
      subject: "Подтверждение регистрации на сайте",
      html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
