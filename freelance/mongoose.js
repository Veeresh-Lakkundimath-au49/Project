const mongoose = require('mongoose');
async function mos(){
   try{
    await mongoose.connect('mongodb+srv://VeereshCluster:1234@veereshcluster.dpxprjq.mongodb.net/?retryWrites=true&w=majority', { dbName: 'fprt' });
    console.log("mongoose schema activated!")
   } catch(err){
    console.log("Error cactivating schema",err);
    process.exit()
   }
}
//mos()

module.exports={
    mos
}