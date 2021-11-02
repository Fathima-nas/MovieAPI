const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const {movieModel}=require('./model')
const { response } = require('express')


//initialise
let app=express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())


//CORS Policy
app.use( (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()

} )


//db connection
mongoose.connect("mongodb+srv://fathima:fathima@cluster0.njlw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

///
app.get('/',(req,res)=>{
    res.send("hello")
})


app.get("/view",(req,res)=>{
    res.json([{MovieName:"CID Moosa",Actor:"Dileep",Actress:"Bhavana",Director:"Johny Antony",ReleasedYear:"03-03-2003",Camera:"Siby K Thomas",Producer:"Dileep,Anoop",Language:"Malayalam"}])
})


app.post('/add',async(req,res)=>{
try{
console.log(req.body)
let movie=new movieModel(req.body)
let result=await movie.save()
res.json(result)
}
catch(error)
{
    res.status(500).send(error)
}
})


app.get("/viewData",async(req,res)=>{
    try {
        var result=await movieModel.find()
        res.json(result)
    } catch (error) 
    {
     res.status(500).send(error)
    }
})


app.post("/delete",async(req,res)=>{
    try {
        var result=await movieModel.findByIdAndDelete(req.body) 
        res.json({"status":"Succesfully Deleted"}) 
    } catch (error) {
        res.status(500).json({"status":error})
    }
})


app.post("/update",async(req,res)=>{
    try {
        var result=await movieModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"Succesfully updated"})
        
    } catch (error) {
        res.status(500).json({"status":error})
    }   
})


app.post("/search",async(req,res)=>{
    try {
        var result=await movieModel.find({"MovieName":{$regex:'.*'+req.body.MovieName+'.*'} })
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(8050,()=>{
    console.log('Running')
})