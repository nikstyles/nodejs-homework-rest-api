const { schemas } = require("../models/contact");
const { Contact } = require("../models/contact");

const add = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
