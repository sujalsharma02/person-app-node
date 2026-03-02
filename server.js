const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Models
const Person = require('./models/Person');

// Routes
app.get('/', (req, res) => res.redirect('/person'));

// GET /person: Displays a table with a list of people
app.get('/person', async (req, res) => {
    try {
        const people = await Person.find({});
        res.render('index', { people });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Since the prompt explicitly says:
// POST /person: Displays a form to create a single person
// PUT /person/{id}: Displays a form through which a person with a specified id parameter can be edited and updated
// DELETE /person/{id}: Displays a page through which a person with a specified ID can be deleted
// 
// Forms in pure HTML can only use GET or POST to submit, and a link can only use GET.
// However, the prompt might be poorly worded and actually means:
// "GET /person/new" => displays form, "POST /person" => creates the person.
// "GET /person/:id/edit" => displays form, "PUT /person/:id" => edits the person.
// "GET /person/:id/delete" => displays page, "DELETE /person/:id" => deletes the person.
// 
// I will provide the standard REST endpoints to render forms + the actual actions.
// If the prompt literally meant the HTTP method should display the form, it's virtually impossible via normal browser navigation without JS.
// Therefore, I will use GET method for rendering the forms to make it usable in a browser, and map the prompt's required methods to the actual execution actions.

// Render Create Form
app.get('/person/new', (req, res) => res.render('create'));

// POST /person: Create a single person
app.post('/person', async (req, res) => {
    try {
        await Person.create(req.body);
        res.redirect('/person');
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET /person/:id/edit: Render Edit Form
app.get('/person/:id/edit', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).send('Person not found');
        res.render('edit', { person });
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT /person/{id}: Edit and update a person
app.put('/person/:id', async (req, res) => {
    try {
        await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/person');
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET /person/:id/delete: Render Delete Form
app.get('/person/:id/delete', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).send('Person not found');
        res.render('delete', { person });
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE /person/{id}: Delete a person
app.delete('/person/:id', async (req, res) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        res.redirect('/person');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
