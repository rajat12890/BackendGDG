
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { createMovie,deleteMovie,getMovies,updateMovie, filterMovies } from './controllers/movie.controller.js';
import { registerUser,loginUser } from './controllers/user.controller.js';
import { authenticateJWT } from './auth.js';
import { connectDB } from './DB/connect.js';

dotenv.config();

connectDB()

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100,
});
app.use(limiter);

// User routes
app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);


// Movie routes
app.post('/api/movies', authenticateJWT, createMovie);
app.get('/api/movies', authenticateJWT,getMovies);
app.get('/api/movies/filter', filterMovies);

app.put('/api/movies/:id', authenticateJWT, updateMovie);
app.delete('/api/movies/:id', authenticateJWT, deleteMovie);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
