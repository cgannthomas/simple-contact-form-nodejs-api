// controllers/contactController.js
import moment from "moment-timezone";
import Contact from "../models/Contact.js"; 

// POST /api/contact
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({ name, email, message });

    const response = {
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      message: newContact.message,
      createdAt: moment(newContact.createdAt)
        .tz("Asia/Kolkata")
        .format("D MMMM, YYYY hh:mm A"),
    };

    res
      .status(201)
      .json({ message: "Message sent successfully", data: response });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts.map((c) => ({
        id: c._id,
        name: c.name,
        email: c.email,
        message: c.message,
        createdAt: moment(c.createdAt)
          .tz("Asia/Kolkata")
          .format("D MMMM, YYYY hh:mm A"),
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// PUT api/contact/<contact_id>
export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { name, email, message } = req.body || {};

    // Validate input
    if (!name && !email && !message) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    // Find contact by ID
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Update fields
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (message) contact.message = message;

    await contact.save();

    // Return formatted response
    const response = {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: moment(contact.createdAt)
        .tz("Asia/Kolkata")
        .format("D MMMM, YYYY hh:mm A"),
      updatedAt: moment(contact.updatedAt)
        .tz("Asia/Kolkata")
        .format("D MMMM, YYYY hh:mm A"),
    };

    res.status(200).json({ message: "Contact updated successfully", data: response });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// DELETE /api/contact/<contact_id>
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET /api/contact/<contact_id>
export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const response = {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: moment(contact.createdAt)
        .tz("Asia/Kolkata")
        .format("D MMMM, YYYY hh:mm A"),
      updatedAt: moment(contact.updatedAt)
        .tz("Asia/Kolkata")
        .format("D MMMM, YYYY hh:mm A"),
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};