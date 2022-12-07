const { NotFound } = require("http-errors");
const contactsFunctions = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsFunctions.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({ message: "Contact delete" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
