const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const listContacts = await Contact.find({ owner }, "-createdAt, -updatedAt")
      .skip(skip)
      .limit(limit);

    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
