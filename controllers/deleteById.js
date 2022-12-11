const { NotFound } = require("http-errors");
const { Contact } = require("../models/contact");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({ message: "Contact delete" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
