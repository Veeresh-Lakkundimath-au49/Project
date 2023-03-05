//const { userModel } = require("../models/userModels")
let {initDB, adminCollection} = require("../DbConfig")
let jwt = require('jsonwebtoken')
let path = require('path')

let bookCollection;
let admin;
async function bookColl(){
     bookCollection=await initDB()
}
bookColl()

async function adminColl(){
    admin=await adminCollection()
}
adminColl()



const cloudinary = require('cloudinary').v2;
const { Base64 } = require('js-base64');
const { dirname } = require("path");
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})
let signup = async (req, res) => {
    
    let pic = req.file
    console.log("pic",pic)
    let picString = Base64.encode(pic.buffer)
    console.log("picString",picString);
    let picData = await cloudinary.uploader.upload(`data:${pic.mimetype};base64,${picString}`)
      console.log("picData",picData);
    let { name, email, password,number,customer } = req.body
    console.log(req.body);
 

    if(customer=='true'){

    //     try {
    //     let newUser = await admin.insertOne({ 'name': name, 'email': email, 'password': password,'number':number, 'image': picData.secure_url,'cartInfo':[{"bookName":"book"}],'favourites':[{"favBook":"bookName"}],'comments':[{"BookName":"Comment on the book"}] })
    //     res.sendFile(path.join(__dirname,'../public/login.html'))
    // } catch (err) {
    //     res.status(500).send({ status: 'error', err: err })
    //     console.log(err);
    // }


    try {

        let data=req.body;
        console.log(data);
    
    const result = await admin.insertOne({
        id:Math.floor(Math.random() * 100) + 1,
        name: `${name}`,
        password:`${password}`,
        number:`${number}`,
        email:`${email}`,
        profileImage: `${picData.secure_url}`,
        customer:`${customer}`,
        bookInfo: []
        
      });
      res.sendFile(path.join(__dirname,'../public/login.html'))
      console.log("Document Created successfully!!")
        
    } catch (error) {
        console.log("Error in createAdmin ,line 69 ",error);
    }





    }
    else if(customer=='false'){

        try {
        let newUser = await bookCollection.insertOne({ 'name': name, 'email': email, 'password': password,'number':number, 'image': picData.secure_url,'cartInfo':[{"bookName":"book"}],'favourites':[{"favBook":"bookName"}],'comments':[{"BookName":"Comment on the book"}] })
        res.sendFile(path.join(__dirname,'../public/login.html'))
    } catch (err) {
        res.status(500).send({ status: 'error', err: err })
        console.log(err);
    }

    }




    

}

let login = async (req, res) => {
    let { email, password,customer } = req.body
    

        if(customer=='false'){
        let user = await bookCollection.findOne({ email, password })
            console.log("This is user data from bookCollection,line 103",user);
        if (!user) {
            res.send({ user: 'not found' })
        } else {

            if(customer=='false'){
            //generate toke
            let userPayload = { email: user.email, name: user.name,customer:customer }
            // console.log(userPayload);
            let token = jwt.sign(userPayload,process.env.jwtKey, { expiresIn: '1d' })
            // console.log(token);
            res.cookie('jwt', token)
            res.sendFile(path.join(__dirname,'../public/profile.html'))
            }
            }
    }
       //  console.log(user);
        
             if(customer=='true'){

                let user = await admin.findOne({ email, password })
                console.log("This is user data from bookCollection,line 126",user);


                if (!user) {
                    res.send({ user: 'not found' })
                } else {
        
                    if(customer=='true'){
                    //generate toke
                    let userPayload = { email: user.email, name: user.name,customer:customer }
                    // console.log(userPayload);
                    let token = jwt.sign(userPayload,process.env.jwtKey, { expiresIn: '1d' })
                    // console.log(token);
                    res.cookie('jwt', token)
                    res.sendFile(path.join(__dirname,'../public/profile.html'))
                    }
        
        
                }

            }
        }
    


let profile = async (req, res) => {
    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name,customer } = userdata;
        console.log(userdata,"userdata line 154");
    if(customer=='true'){
        
        user = await admin.findOne({ email, name })
        console.log("line 158,if executed");
        res.send(user)

    }
    if(customer=='false'){

        user = await bookCollection.findOne({ email, name })
        console.log("line 163,else-if executed");
        res.send(user)
    }
    
}


let library =async (req,res)=>{

    // let data=req.cookies.jwt
    // console.log(data)
        let token = req.cookies.jwt
        if(token){
        let userdata = jwt.verify(token,process.env.jwtKey)
       
        let { email, name } = userdata;
        user = await bookCollection.findOne({ email, name })
        res.sendFile(path.join(__dirname,'../public/library.html'))}
        else{
            res.sendFile(path.join(__dirname,'../public/login.html'))
        }
}
let logout = (req, res) => {
    res.cookie('jwt', '')
    res.sendFile(path.join(__dirname,'../public/welcome.html'))
console.log('logout');
}
let cartData;
let getCartData=async (req,res)=>{
    cartData=req.body;
    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;

    const query = { "name": `${name}` };
    const updateDocument = {
      $push: { "cartInfo": {"BookName": `${cartData.bookName}`,"Price": `${cartData.Price}`,"bookImage": `${cartData.image}`} }
    };

    try {
        const result = await bookCollection.updateOne(query, updateDocument);

    } catch (error) {
        console.log("Error updating Cart Info",error);
    }
    res.send(cartData);
   // console.log("Cart data received and sent successfully!!");
}

let dispCartData=async (req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;
    user = await bookCollection.findOne({ email, name })

   // let {cartData}=req.body
    // console.log(cartData);
    console.log("data sent successfully!!");
    res.send(user)
  
}

// let cart=(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public/addToCart.html'))
// }


let removeCartData=async (req,res)=>{
    cartData=req.body;

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;

    try
    {
    const deletedDocument=await bookCollection.updateOne({"name":`${userdata.name}`},{$pull:{"cartInfo":{"BookName":`${cartData.BookName}`,"Price":`${cartData.Price}`,"bookImage":`${cartData.image}`}}})
    res.send("Cart Data Deleted successfully!!")
    }catch(err){
        console.log("Error deleting Array document",err);
    }
}





let adminData=async (req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;

    const findResult = await admin.find({"email":email}).toArray();
        // const insertResult = await adminCollection.insertOne({
             //"name": "Steve Lobsters"})
         res.send(findResult)
}


let userData=async (req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, customer } = userdata;

    if(customer=='true'){

        const findResult = await admin.find({"email":email}).toArray();
        // const insertResult = await adminCollection.insertOne({
             //"name": "Steve Lobsters"})
         res.send(findResult)

         //res.sendFile(path.join(__dirname,'../public/profile.html'))

    }
    else if(customer=='false'){

        const findResult = await bookCollection.find({"email":email}).toArray();
        // const insertResult = await adminCollection.insertOne({
             //"name": "Steve Lobsters"})
         res.send(findResult)
         //res.sendFile(path.join(__dirname,'../public/profile.html'))

    }
    
}



let createAdmin=async (req,res)=>{
    try {

        let data=req.body;
        console.log(data);
    
    const result = await admin.insertOne({
        id:Math.floor(Math.random() * 100) + 1,
        name: "Veeresh",
        email:"blveeresh97@gmail.com",
        address: "2nd main,3rd street",
        isAdmin:"NA",
        bookInfo: []
      });
      res.send("Document Created successfully!!")
        
    } catch (error) {
        console.log("Error in createAdmin ",error);
    }

}


let updateAdmin=async (req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;

    let upInfo=req.body;
    console.log(upInfo);
    
     

    try {
        let result= await admin.updateOne({email},{$set: {name:`${upInfo.name}`}});
        console.log(result);
        res.send("Admin data updated successfully")
    } catch (error) {
        console.log("error in updateAdmin",error);
    }
}

let updateUser =async (req,res)=>{


    
        let token = req.cookies.jwt
        let userdata = jwt.verify(token,process.env.jwtKey)
        let { email ,customer} = userdata;


    let pic = req.file
    console.log("pic",pic)
    let picString = Base64.encode(pic.buffer)
    console.log("picString",picString);
    let picData = await cloudinary.uploader.upload(`data:${pic.mimetype};base64,${picString}`)
      console.log("picData",picData);
    let { name, number } = req.body
    console.log(req.body);

    //res.send("data received successfully in updateUser route")
 
    // try {
    //     let newUser = await bookCollection.insertOne({ 'name': name, 'email': email, 'password': password,'number':number, 'image': picData.secure_url,'cartInfo':[{"bookName":"book"}],'favourites':[{"favBook":"bookName"}],'comments':[{"BookName":"Comment on the book"}] })
    //     res.sendFile(path.join(__dirname,'../public/login.html'))
    // } catch (err) {
    //     res.status(500).send({ status: 'error', err: err })
    //     console.log(err);
    // }

    if(customer=='true'){

        try {
            let result= await admin.updateOne({email},{$set: {"name":name,"number":number,"image":picData.secure_url}});
            console.log(result);
           // res.send("User data updated successfully")
           res.sendFile(path.join(__dirname,'../public/profile.html'))
           
        } catch (error) {
            console.log("error in updateAdmin",error);
        }
    }
    else if(customer=='false'){

        try {
            let result= await bookCollection.updateOne({email},{$set: {"name":name,"number":number,"image":picData.secure_url}});
            console.log(result);
           // res.send("User data updated successfully")
                     res.sendFile(path.join(__dirname,'../public/profile.html'))
        } catch (error) {
            console.log("error in updateAdmin==>bookCollection",error);
        }

    }







// try {
        //     let result= await bookCollection.updateOne({email},{$set: {name:`${upInfo.name}`}});
        //     console.log(result);
        //     res.send("User data updated successfully")
        // } catch (error) {
        //     console.log("error in updateAdmin",error);
        // }








        // let token = req.cookies.jwt
        // let userdata = jwt.verify(token,process.env.jwtKey)
        // let { email } = userdata;
        // console.log(req.file);
    
        // let upInfo=req.body;
        // console.log(upInfo);
        
        // res.send("User data updated successfully")
         
    
        // try {
        //     let result= await bookCollection.updateOne({email},{$set: {name:`${upInfo.name}`}});
        //     console.log(result);
        //     res.send("User data updated successfully")
        // } catch (error) {
        //     console.log("error in updateAdmin",error);
        // }
    }


    // try {
    //     const query = { "name": "Steve Jobs" };
    //     const updateDocument = {
    //       $push: { "bookInfo": {"id":Math.floor(Math.random() * 100) + 1,"name":"Rich Dad Poor Dad","Genre":"Self Help","Author":"Robert","comments":[]} }
    //     };
    //     const result = await admin.updateOne(query, updateDocument);
    //     res.send("document updated successfully!!")

    // } catch (error) {
    //     console.log("error in updateAdmin",error);
    // }


    // try {
    //     const query = { "name": "Steve Jobs","bookInfo.name":"Richd" };
    //     const updateDocument = {
    //       $push: { "bookInfo.$.comments": {"userName":"BidExecs","userComment":"comment added by the user"} }
          
    //     };
    //     const result = await admin.updateOne(query, updateDocument);
    //     res.send("Comments updated successfully!!")

    // } catch (error) {
    //     console.log("error in updateAdmin",error);
    // }


    // db.array.updateOne(
    //     { },
    //     { $set: { "myArray.$[element]": 10 } },
    //     { arrayFilters: [ { element: 9 } ], upsert: true }
    //  )





let bookInfo=async (req,res)=>{

    // try {
    
    //     const result = await admin.find({"bookInfo.name":"Richd"},{"bookInfo.name:Richd":1}).toArray();
    //     let bookInfo=await result
    //     res.send(bookInfo)

    // } catch (error) {
    //     console.log("error in book fetch",error);
    // }



   let result= await admin.aggregate( [
       
        {
           $match: { "bookInfo.name": /rIcHd/i }
        },
       
        {
            $project: {
                       "bookInfo.name": 1,
                       "bookInfo.Genre": 1,
                       "bookInfo.Author": 1,
                    "bookInfo.comments.userName":1,
                    "bookInfo.comments.userComment":1
                     }
        }
     ] ).toArray()
console.log(await result);
//result = await admin.find().toArray();

     res.send(result)

}

let myBooks=async(req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email ,customer} = userdata;

    console.log(email);

    // let result=await admin.find({"email":email},{"_id":"0", "bookInfo.name":"1","bookInfo.price":"1","bookInfo.genre":"1","bookInfo.author":"1","bookInfo.image":"1","bookInfo.description":"1"}).toArray()

    let result= await admin.aggregate( [
       
        {
           $match: { "email": email }
        },
       
        {
            $project: {
                "_id":0,
                       "bookInfo.name": 1,
                       "bookInfo.genre": 1,
                       "bookInfo.author": 1,
                    "bookInfo.price":1,
                    "bookInfo.description":1,
                    "bookInfo.image":1
                    
                     }
        }
     ] ).toArray()
     

    console.log("myBook route executed Successfully!! ");
    res.send(result)

} 


let addBook=async(req,res)=>{

    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email ,customer} = userdata;

    let {name,genre,price,author,description}=req.body;
    console.log("req.body , line 529",req.body);
    console.log("req.file line 530",req.file);

    let pic = req.file
    //console.log("pic",pic)
    let picString = Base64.encode(pic.buffer)
    console.log("picString",picString);
    let picData = await cloudinary.uploader.upload(`data:${pic.mimetype};base64,${picString}`)
      console.log("picData",picData);

    

    try {
        const query = { "email": email };
        const updateDocument = {
          $push: { "bookInfo": {"id":Math.floor(Math.random() * 100) + 1,"name":name,"genre":genre,"author":author,"price":price,"description":description,"image":picData.secure_url} }
        };
        const result = await admin.updateOne(query, updateDocument);
        // res.send("document updated successfully!!")
         res.sendFile(path.join(__dirname,'../public/success.html'))

    } catch (error) {
        console.log("error in updateAdmin",error);
    }
    //res.send("Route executed successfully!!")

}

let deleteAdmin=async (req,res)=>{
    try
    {
    const deletedDocument=await admin.updateOne({"name":"Steve Jobs"},{$pull:{"bookInfo":{"name":"Rich Dad Poor Dad"}}})
    res.send("Deleted successfully!!")
    }catch(err){
        console.log("Error deleting Array document");
    }

}

let editBookInfo=async(req,res)=>{

    console.log(req.body);
    console.log(req.file);
    
    try {
        const updateBook=await admin.updateOne({"name":"Steve Jobs"},{$set:{'bookInfo.$[element].Genre':'fiction'}},{arrayFilters:[{'element.Author':'Robert'}]});
        res.send("Book info Edited successfully")
    } catch (error) {
        console.log("Error editing bookInfo");
    }
}

let email=async(req,res)=>{
    let {email}=req.body;

    try {

        let adminResult=await admin.find({"email":email}).toArray();
        let buyerResult=await bookCollection.find({"email":email}).toArray();

        if((adminResult) && (buyerResult)){
            res.send("1")
        }
        else{
            res.send("0")
        }
        
    } catch (error) {
        console.log("error in email verification for password",error);
    }
}


let newPass=async(req,res)=>{


    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email ,customer} = userdata;
    let {password}=req.body;

    if(customer=="true"){
        let result=await admin.updateOne({"email":email},{$set:{"password":password}})
        res.send("Password update successfull")
    }
    else if(customer=="false"){
        let result=await bookCollection.updateOne({"email":email},{$set:{"password":password}})
        res.send("Password update successfull")
    }

}




module.exports = {
    login,
    signup,
    logout,
    profile,
    library,
    dispCartData,
    getCartData,
    removeCartData,
    adminData,
    userData,
    createAdmin,
    updateAdmin,
    updateUser,
    deleteAdmin,
    editBookInfo,
    bookInfo,
    myBooks,
    addBook,
    email,
    newPass
    
}