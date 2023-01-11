const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const shortid = require("shortid");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    console.log(tempUpload);
    const { _id } = req.user;

    const filename = `${shortid.generate()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
