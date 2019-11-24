const mongoose = require('mongoose'),
{Schema} = mongoose,
authorSchema = new Schema({
    authorName:{type:String},
    age:Number,
})

module.exports = mongoose.model('Author',authorSchema)
