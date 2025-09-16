const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact.
 *         firstName:
 *           type: string
 *           description: The first name of the contact.
 *         lastName:
 *           type: string
 *           description: The last name of the contact.
 *         email:
 *           type: string
 *           description: The email address of the contact.
 *         favoriteColor:
 *           type: string
 *           description: The favorite color of the contact.
 *         birthday:
 *           type: string
 *           format: date
 *           description: The birthday of the contact.
 *       example:
 *         firstName: Abigail
 *         lastName: Johnson
 *         email: abi.jo@example.com
 *         favoriteColor: Blue
 *         birthday: 1990-01-01
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the contact.
 *         lastName:
 *           type: string
 *           description: The last name of the contact.
 *         email:
 *           type: string
 *           description: The email address of the contact.
 *         favoriteColor:
 *           type: string
 *           description: The favorite color of the contact.
 *         birthday:
 *           type: string
 *           format: date
 *           description: The birthday of the contact.
 *       example:
 *         firstName: ""
 *         lastName: ""
 *         email: ""
 *         favoriteColor: ""
 *         birthday: ""
 *     ContactResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ContactInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the contact.
 *       example:
 *         id: 60f7f9b2e1d3c0b1c8a9e123
 *         firstName: Abigail
 *         lastName: Johnson
 *         email: abi.jo@example.com
 *         favoriteColor: Blue
 *         birthday: 1990-01-01
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/", contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get("/:id", contactsController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       400:
 *         description: Invalid input
 */
router.post("/", contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Contact not found
 */
router.put("/:id", contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
