const { Contact, schemas } = require("../../models/contact");

const updateById = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    result
      ? res.status(200).json({ message: "Contact update" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
