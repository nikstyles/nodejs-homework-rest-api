const contactsFunctions = require("../../models/contacts");
const { contactSchema } = require("../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsFunctions.updateContact(contactId, req.body);
    result
      ? res.status(200).json({ message: "Contact update" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
