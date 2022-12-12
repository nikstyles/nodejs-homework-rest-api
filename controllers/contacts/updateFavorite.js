const { Contact, schemas } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
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

module.exports = updateFavorite;
