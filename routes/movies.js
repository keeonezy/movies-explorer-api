const router = require('express').Router();
const { movieCreateValidator, movieIdValidator } = require('../middlewares/validation');
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', movieCreateValidator, createMovies);
router.delete('/movies/:movieId ', movieIdValidator, deleteMovies);

module.exports = router;
