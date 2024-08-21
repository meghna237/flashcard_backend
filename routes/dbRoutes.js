// authRoutes.js
const router = require('express').Router();
const flashcardController = require('../controllers/flashcardController');

router.post('/login', flashcardController.login);
router.put('/signup', flashcardController.signup);
router.get('/subjects',  flashcardController.getSubjects);
router.post('/subjects', flashcardController.addSubject);
router.get('/questions', flashcardController.getFlashcardsBySubject);
router.post('/addquestions', flashcardController.addFlashcard);
router.delete('/questions/:id', flashcardController.deleteFlashcard);

module.exports = router;
