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
