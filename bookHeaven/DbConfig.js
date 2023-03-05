// let mongoose = require('mongoose')




// async function initDB(){

//     try{

//         await mongoose.connect(process.env.DB_url,{dbName:'openlibrary'})
// console.log('DB is connected');

//     }catch(err){

//         console.log(process.env.DB_url);
//     }
 

// }

// module.exports= {initDB}

const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://VeereshCluster:1234@veereshcluster.dpxprjq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'Book';
async function initDB() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('DB Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('bookData');
    return collection
  
    // the following code examples can be pasted here...
  
    
  }


  
  async function adminCollection(){
    await client.connect();
    let db = client.db(dbName);
    const collection = db.collection('adminData');
    console.log("Successfully accessed adminData collection!!");
    return collection
  }



  module.exports={initDB,adminCollection}
  