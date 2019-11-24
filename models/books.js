const mongoose = require('mongoose'),
{Schema} = mongoose,
bookSchema = new Schema({
    name:{type:String},
    genre:String,
    authorId:String,
})

module.exports = mongoose.model('Book',bookSchema)
