# Contacts API

This project is an API for storing and retrieving information about contacts, such as my friends data. The API interacts with a MongoDB database and allows for future frontend integration.

## Project Overview

- **Week 01 Goals:**
  - Set up the project and database.
  - Import data into the database.
  - Complete the GET API routes (`GET` all contacts and `GET` a single contact by ID).
  - Deploy the app to Render.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Render
- **Testing:** REST Client (e.g., Postman or REST Client extension for VSCode)

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your local machine.
- A **MongoDB Atlas** account.
- A **Render** account for deployment.
- **Git** installed for version control.

### Installation

1. **Clone the Repository**

   ```bash
   git clone:git@github.com:ezenwokeuchechukwu/cse-341-project3.git
   cd cse341-project3
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## API Reference

### Base URL

- **URL:** `https://cse-341-project3-zouh.onrender.com`

### Get All Contacts

- **Endpoint:** `/contacts`
- **Method:** `GET`
- **Description:** Retrieves all contacts from the database.
- **Response:** Array of contact objects.

### Get Contact by ID

- **Endpoint:** `/contacts/{id}`
- **Method:** `GET`
- **URL Parameter:** `id` (string) - The unique identifier of the contact.
- **Description:** Retrieves a single contact by its ID.
- **Response:** Contact object.

## Testing

- Use the `requests.rest` file with the REST Client extension in VSCode.
- Alternatively, use a tool like Postman or cURL to test the endpoints.

## Video Demonstration

A video demonstrating the functionality of this project is available on YouTube:

- [Project Demo Video 1]()
- [Project Demo Video 2]()

## License

This project is for my educational purposes.

## Contact

- **Author:** Ezenwoke Uchechukwu Promise
- **Email:** uezenwoke@byupathway.edu
