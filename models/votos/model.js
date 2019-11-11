import mongoose from 'mongoose';

const Schema=mongoose.Schema

const voteSchema=Schema({
    Title : String,
    Poster : String,
    votos : Number
})
export default mongoose.model('Votos',voteSchema);