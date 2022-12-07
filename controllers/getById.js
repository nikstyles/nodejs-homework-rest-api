const contactsFunctions = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFunctions.getContactById(contactId);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
      // return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
