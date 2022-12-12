const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new Error(`${contactId} is not correct id format`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
