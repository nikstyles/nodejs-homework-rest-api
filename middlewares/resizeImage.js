const jimp = require("jimp");

const resizeImage = async (req, res, next) => {
  try {
    const { file } = req;
    const img = await jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = resizeImage;
