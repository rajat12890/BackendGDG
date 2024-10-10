
import { Movie } from "../models/movie.model.js";

export const createMovie = async (req, res) => {
    const { title, genre, rating, release } = req.body;
    const userId = req.user.id; 

    try {
        const movie = new Movie({
            title,
            genre,
            rating,
            release,
            user: userId, 
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getMovies = async (req, res) => {
  const userId = req.user.id;
    try {
        const movies=await Movie.find({ user: userId })
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const filterMovies = async (req, res) => {
  const { title,genre, year } = req.query;
  const yearAsNumber = parseInt(year);
console.log(yearAsNumber+"dhb");
console.log(title);

  const filter = {};
  if (genre) {
      filter.genre = genre.toLowerCase();
  }
  if (title) {
    filter.title =title
}
  if (year!='') {

          filter.release =year+"T00:00:00.000Z"
          console.log(filter.release+"dhb");
     
  }

  try {
      const movies = await Movie.find(filter).populate('user', 'name email'); 
      res.status(200).json(movies);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};




export const updateMovie = async (req, res) => {
    let { title, genre, rating, release } = req.body;
console.log(title);
const movie = await Movie.findById(req.params.id)
console.log(movie.title);

if(genre==""){
  genre=movie.genre;
}
if(title==""){
  title=movie.title;
  }
  if(rating==""){
    rating=movie.rating;
    }
    if(release==""){
      release=movie.release;
      }
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, genre, rating, release },
            { new: true, runValidators: true }
        );
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.status(200).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
