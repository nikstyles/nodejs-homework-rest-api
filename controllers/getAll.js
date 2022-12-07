const contactsFunctions = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const listContacts = await contactsFunctions.listContacts();
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
