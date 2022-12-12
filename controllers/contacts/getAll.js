const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const listContacts = await Contact.find({});
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
