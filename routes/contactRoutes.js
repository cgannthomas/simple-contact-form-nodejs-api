const express = require("express");
const router = express.Router();
const { createContact, getContacts, updateContact, deleteContact, getContactById  } = require("../controllers/contactController");

// route for form submission
router.post("/", createContact);

// route to view all messages
router.get("/", getContacts);

// route to update a form
router.put("/:id", updateContact);

// route to delete a form
router.delete("/:id", deleteContact);

// route to get a single form data
router.get("/:id", getContactById);

module.exports = router;
