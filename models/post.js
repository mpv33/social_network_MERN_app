const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
          type:String,
          required:"title is required",
          minlength:5,
          maxlength:100
    },
    body:{
        type:String,
        required:"body is required",
        minlength:5,
        maxlength:100
    }
})

module.exports= mongoose.model('POST',postSchema)