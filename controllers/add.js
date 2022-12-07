const contactsFunctions = require("../../models/contacts");
const { contactSchema } = require("../schemas/contacts");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await contactsFunctions.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
