let mongoose = require('mongoose')
let DBurl = "mongodb+srv://DhruvDC7:12345@cluster0.0gjglo9.mongodb.net/?retryWrites=true&w=majority"

 initDB()

async function initDB(){

    try{

        await mongoose.connect(DBurl,{dbName:'openlibrary'})
console.log('DB is connected');

    }catch(err){

        console.log('error in connecting');
    }


}

module.exports= {initDB}