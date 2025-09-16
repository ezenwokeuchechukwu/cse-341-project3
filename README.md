Contacts API

This project is a RESTful API for managing contacts information, such as my friends’ data. It interacts with a MongoDB database and supports full CRUD operations with data validation and error handling. The API is designed to be easily integrated with future frontend applications.

Project Overview
Week 01 Goals

Set up the project and MongoDB database.

Import initial contact data into the database.

Complete the GET API routes (fetch all contacts and fetch a contact by ID).

Deploy the app to Render.

Week 03-04 Goals

Implement full CRUD operations (Create, Retrieve, Update, Delete).

Add data validation and error handling.

Prepare API documentation.

Integrate OAuth for authentication (planned for Week 04).

Publish API with environment variables secured.

Technologies Used

Backend: Node.js, Express.js

Database: MongoDB Atlas

Deployment: Render

Testing: REST Client extension for VSCode, Postman, or cURL

Getting Started
Prerequisites

Node.js and npm installed locally

MongoDB Atlas account

Render account for deployment

Git for version control

Installation

Clone the repository:

git clone git@github.com:ezenwokeuchechukwu/cse-341-project3.git
cd cse-341-project3


Install dependencies:

npm install


Create a .env file with your MongoDB URI and any other environment variables:

MONGODB_URI=your_mongodb_connection_string


Start the server locally:

npm start

API Reference
Base URL

Local (development): http://localhost:3000

Published (Render): https://cse-341-project3-zouh.onrender.com

Contact Object Schema (7 fields)
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "favoriteColor": "string",
  "birthday": "ISO 8601 date string",
  "phone": "string",
  "address": "string"
}

Endpoints
Get All Contacts

Endpoint: /contacts

Method: GET

Description: Retrieves all contacts from the database.

Response: Array of contact objects.

Get Contact by ID

Endpoint: /contacts/{id}

Method: GET

URL Parameter: id (string) - Contact’s unique MongoDB ObjectId.

Description: Retrieves a single contact by its ID.

Response: Contact object.

Create a New Contact

Endpoint: /contacts

Method: POST

Content-Type: application/json

Request Body: Full contact object (7 fields required).

Description: Creates a new contact in the database.

Response: Confirmation message and the created contact.

Update a Contact

Endpoint: /contacts/{id}

Method: PUT

URL Parameter: id (string) - Contact’s ObjectId.

Content-Type: application/json

Request Body: Full contact object (7 fields required).

Description: Updates the contact with the specified ID.

Response: Confirmation message and the updated contact.

Delete a Contact

Endpoint: /contacts/{id}

Method: DELETE

URL Parameter: id (string) - Contact’s ObjectId.

Description: Deletes the contact with the specified ID.

Response: Confirmation message.

Testing

Use the provided requests.rest file with the REST Client extension in VSCode.

Alternatively, use Postman or cURL to test endpoints.

Video Demonstration

Watch the demo videos showcasing the API functionality:

(Project Demo Video 1)

(Project Demo Video 2)

License

This project is for educational purposes only.

Contact

Author: Ezenwoke Uchechukwu Promise

Email: uezenwoke@byupathway.edu