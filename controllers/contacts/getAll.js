const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const listContacts = await Contact.find(
      { owner },
      "-createdAt, -updatedAt"
    );
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
