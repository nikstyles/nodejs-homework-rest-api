const express = require("express");
const contactsFunctions = require("../../models/contacts");
const Joi = require("joi");
const { NotFound } = require("http-errors");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    // .length(10)
    .pattern(/^[(]?[0-9][)]?()?[0-9]?[-]?[0-9]/)
    .required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contactsFunctions.listContacts();
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
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
});

router.delete("/:contactId", async (req, res, next) => {
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
});

router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
