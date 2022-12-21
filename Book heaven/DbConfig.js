let mongoose = require('mongoose')




async function initDB(){

    try{

        await mongoose.connect(process.env.DB_url,{dbName:'openlibrary'})
console.log('DB is connected');

    }catch(err){

        console.log(process.env.DB_url);
    }
 

}

module.exports= {initDB}