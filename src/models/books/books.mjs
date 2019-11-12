
import mongoose from 'mongoose';
 
const Schema = mongoose.Schema;

const BookSchema = Schema({
title : { type: String, unique: true},
authors : [String],
picture : String,
price : {type : Number, default :0 },
category :[ String ],
publishedDate: String,
description : String,
stock : {type : Number, default :0 },
})

export default mongoose.model('books', BookSchema)