const mongoose=require('mongoose')
let MongooseSchema=mongoose.Schema
const movieSchema=new MongooseSchema({
    MovieName:String,
    Actor:String,
    Actress:String,
    Director:String,
    ReleaseYear:Date,
    Camera:String,
    Producer:String,
    Language:String
})
var movieModel=mongoose.model("movies",movieSchema)
module.exports={movieModel}