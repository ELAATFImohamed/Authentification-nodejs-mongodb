// La connexionn avec notre base de donne avec ---MongoDb Atlas---

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mohamed:AUthJM4Oc7js30KM@cluster0.djjf5hs.mongodb.net/mongodb?retryWrites=true&w=majority")
.then(()=>{
    console.log('mongoose est connecter');
})
.catch(()=>{
    console.log('probleme de connexion');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection  
