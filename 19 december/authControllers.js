const { userModel } = require("../models/userModels")
const cloudinary=require('cloudinary').v2;
const {Base64}=require('js-base64')

let  jwt = require('jsonwebtoken')
let jwtKey = 'bookkey'
let user;


cloudinary.config({
    cloud_name:'docch2cvb',
    api_key:'673847735511879',
    api_secret:'qaSVo3r8ikDiit4P_Qwet_nPNbE'
})


let signup = async (req,res) =>{
    let pic = req.file
    // console.log(pic);
    
    let picString=Base64.encode(pic.buffer)
    let picData=await cloudinary.uploader.upload(`data:${pic.mimetype};base64,${picString}`)
    let imageUrl=[];
    //req.body=(picData.secure_url)
    console.log(imageUrl)
    console.log(picData);   
    let postdata = req.body
        console.log(postdata);




    //res.send('request succes',)
    
    let {name, email, password} = req.body

    console.log("req.body",req.body);

    try{
        let newUser = await userModel.create({'name':name,'email':email,'password':password,'image':picData.secure_url})
        res.send({status : 'success',newuser:newUser})



    }catch(err){
        res.status(500).send({status:'error',err:err})
        console.log(err);
    }

    // userModel.insertMany({'name':name,'email':email,'password':password,'image':picData.secure_url})

}

let login = async (req,res) =>{
    let {email,password} =  req.body
// console.log(req.body);
    try{
         user = await userModel.findOne({email,password})
        //console.log(user);
if(!user){
    res.send({user:'not found'})
}else{
//generate toke
let userPayload = {email:user.email,name:user.name}
// console.log(userPayload);
let token = jwt.sign(userPayload,jwtKey,{expiresIn:'1d'})
// console.log(token);
res.cookie('jwt',token)

//  res.send(user)
res.sendFile('C:/Users/HP/Desktop/BookLibrary/bookLibrary/public/profile.html')
}
    }catch(err){
        res.send('error in login')
    }

}
let profile=async(req,res)=>{
    let token = req.cookies.jwt
    let userdata=  jwt.verify(token,jwtKey)
    let {email,name}=userdata;
    user = await userModel.findOne({email,name})
   // console.log(userdata);
    console.log("This is from mongoDB ",user);

    // console.log('this is ',userdata);
res.send(user)}


//login-token-email-id(DB)-userInfo+token->DB

//cookie-token->userInfo(DB)->send to front end js
let logout = (req,res) =>{
    
}

// if(user){
//     module.exports={
//         user
//     }
// }

    module.exports={
        login,
        signup,
        logout,
        profile       
    }

// module.exports={
//     login,
//     signup,
//     logout,
//     user
    
// }