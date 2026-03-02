# Node.js + MongoDB Person Directory Web Service

A RESTful web application built with **Node.js**, **Express**, and **MongoDB** (using **Mongoose**) that manages a directory of people. It features a modern, glassmorphic UI styled with raw CSS.

## Features

- **Full CRUD Operations**:
  - `Create`: Add a new person with Name, Age, Gender, and Mobile number.
  - `Read`: View a tabular list of all people in the directory.
  - `Update`: Edit existing person details.
  - `Delete`: Remove a person from the directory.
- **Modern UI**: Clean, premium design using CSS gradients, the `Inter` font, and glassmorphism cards.
- **Database Integration**: Automatically connects to local MongoDB instance.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port `27017`)

## Installation

1. **Clone or navigate to the repository folder**:
   ```bash
   cd person-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

By default, the application will attempt to connect to a local MongoDB instance at `mongodb://127.0.0.1:27017/personDB`. 

If you want to use MongoDB Atlas (the cloud-hosted version) or a different local port, you can create a `.env` file in the root of the project:

```env
PORT=3000
MONGO_URI=mongodb://your-mongo-connection-string
```

## Running the Application

1. **Start the server**:
   ```bash
   npm start
   ```
   *(Or just run `node server.js`)*

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

- `server.js` - Main Express application entry point, middleware setup, and route definitions.
- `models/Person.js` - Mongoose schema for the Person entity.
- `views/` - EJS templates for the frontend (`index.ejs`, `create.ejs`, `edit.ejs`, `delete.ejs`).
- `public/css/style.css` - Custom styling and theming for the application.

## RESTful Routing

The application adheres to MVC and RESTful design patterns:
- `GET /person` - Renders the directory table.
- `GET /person/new` - Renders the creation form.
- `POST /person` - Processes the creation form and saves to the database.
- `GET /person/:id/edit` - Renders the edit form for a specific person.
- `PUT /person/:id` - Processes the update data for a specific person.
- `GET /person/:id/delete` - Renders the deletion confirmation page.
- `DELETE /person/:id` - Processes the deletion of a specific person. 
