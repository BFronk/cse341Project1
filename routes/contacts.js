const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Get all contacts'
  */
  contactsController.getAll
);

router.get(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Get a single contact by ID'
  */
  contactsController.getSingle
);

router.post(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Create a new contact'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Contact data',
       required: true,
       schema: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'john@email.com',
         favoriteColor: 'blue',
         birthday: '1990-01-01'
       }
     }
  */
  contactsController.createContact
);

router.put(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Update a contact by ID'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated contact data',
       required: true,
       schema: {
         firstName: 'Jane',
         lastName: 'Doe',
         email: 'jane@email.com',
         favoriteColor: 'green',
         birthday: '1992-02-02'
       }
     }
  */
  contactsController.updateContact
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Delete a contact by ID'
  */
  contactsController.deleteContact
);

module.exports = router;