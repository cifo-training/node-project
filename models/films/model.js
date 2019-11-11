import mongoose from 'mongoose';

const Schema=mongoose.Schema

const filmSchema=Schema({
      id: Number,
      Title : String,
      Year : String,
      Released : String,
      Runtime : String,
      Genre : String,
      Director : String,
      Actors : String,
      Plot : String,
      Language : String,
      Country : String,
      Awards : String,
      Poster : String,
      imdbRating : String,
      votos : Number
})
export default mongoose.model('Films',filmSchema);