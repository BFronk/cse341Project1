const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('contacts').find()
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts)
    });
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: userId })
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0])
    });
}

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);
  res.status(201).json({ id: response.insertedId });
  } catch (error) {
    res.status(500).json(error.message || 'Error creating contact');
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Contact not found or no changes made');
    }
  } catch (error) {
    res.status(500).json(error.message || 'Error updating contact');
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Contact not found');
    }
  } catch (error) {
    res.status(500).json(error.message || 'Error deleting contact');
  }
};


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}