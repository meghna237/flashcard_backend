const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn = require('../services/db');
conn.dbConnection();

const UserSchema = new Schema({
    username: String,
    password: String, // Store hashed passwords
});

const usersModel = mongoose.model('users', UserSchema);


const QuestionSchema = new Schema({
    question: String,
    answer: String,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'subjectsModel'}
});

const questionsModel = mongoose.model('questions', QuestionSchema);

const SubjectSchema = new Schema({
    name: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'}
});

const subjectsModel = mongoose.model('subjects', SubjectSchema);

module.exports = {
    usersModel,
    questionsModel,
    subjectsModel
};