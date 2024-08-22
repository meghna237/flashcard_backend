const bcrypt = require('bcrypt');
const { usersModel, questionsModel, subjectsModel } = require('../models/flashcardModel');
require('dotenv').config();

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await usersModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Send success response with userID
        res.json({ success: true, userID: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Sign-up function
const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await usersModel.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new usersModel({
            username: username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Send success response with userID
        res.json({ success: true, userID: newUser._id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

const getSubjects = async (req, res) => {
    try {
        const { userID } = req.params;
        const subjects = await subjectsModel.find({ user: userID });

        if (!subjects || subjects.length === 0) {
            console.log('Subject list empty');
        }

        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Add subjects function
const addSubject = async (req, res) => {
    try {
        const { name, userId } = req.body; // Expect userID in the request body
        if (!name) {
            return res.status(400).json({ success: false, message: 'Subject name not entered' });
        }

        const newSubject = new subjectsModel({ name, user: userId });
        await newSubject.save();

        res.status(201).json({ success: true, subject: newSubject });
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
};

// Fetch flashcards by subjectId
const getFlashcardsBySubject = async (req, res) => {
    try {
        const { subject } = req.query;
        console.log(req.query);

        if (!subject) {
            return res.status(400).json({ success: false, message: 'Subject ID is required' });
        }

        const flashcards = await questionsModel.find({ subject: subject });

        res.status(200).json(flashcards);
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Add a new flashcard
const addFlashcard = async (req, res) => {
    try {
        const { question, answer, subject } = req.body;

        if (!question || !answer || !subject) {
            return res.status(400).json({ success: false, message: 'Question, answer, and subject ID are required' });
        }

        const newFlashcard = new questionsModel({ question, answer, subject });
        await newFlashcard.save();

        res.status(201).json({ success: true, flashcard: newFlashcard });
    } catch (error) {
        console.error('Error adding flashcard:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a flashcard by ID
const deleteFlashcard = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFlashcard = await questionsModel.findByIdAndDelete(id);

        if (!deletedFlashcard) {
            return res.status(404).json({ success: false, message: 'Flashcard not found' });
        }

        res.status(200).json({ success: true, message: 'Flashcard deleted successfully' });
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    login,
    signup,
    addSubject,
    getSubjects,
    getFlashcardsBySubject,
    addFlashcard,
    deleteFlashcard,
};
