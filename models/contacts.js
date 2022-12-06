const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/contacts.json");

const getContactsList = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const listContacts = async () => {
  try {
    const contacts = await getContactsList();
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log("Error", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();

    const result = contacts.find((contact) => contact.id === String(contactId));
    console.table(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await getContactsList();
    const result = list.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
    const newContacts = await getContactsList();
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await getContactsList();
    const id = await shortid.generate();

    const newContact = { id, name, email, phone };
    const createdNewList = [...contacts, newContact];

    if (contacts.find((e) => e.email === newContact.email)) {
      console.log("Contact with this email already exists");
      return;
    }
    const newListContacts = JSON.stringify(createdNewList);

    await fs.writeFile(contactsPath, newListContacts, "utf-8");

    // const updatedListContacts = await getContactsList();
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await getContactsList();
    const changedContacts = contacts.map((e) => {
      if (e.id === contactId.toString()) {
        if (name) e.name = name;
        if (email) e.email = email;
        if (phone) e.phone = phone;
      }
      return e;
    });

    const updatedContact = JSON.stringify(changedContacts);

    await fs.writeFile(contactsPath, updatedContact, "utf-8");
    return updateContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
