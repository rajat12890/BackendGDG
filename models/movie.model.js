import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {

    
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    release: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
