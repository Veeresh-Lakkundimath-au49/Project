const { userModel } = require("../models/userModels")
let  jwt = require('jsonwebtoken')
let jwtKey = 'bookkey'
let singup = async (req,res) =>{

    let {name, email, password} = req.body
    console.log(req.body);

    try{
        let newUser = await userModel.create({name,email,password})
        res.send({status : 'success',newuser:newUser})


    }catch(err){
        res.status(500).send({status:'error',err:err})
        console.log(err);
    }

}

let login = async (req,res) =>{
    let {email,password} =  req.body
// console.log(req.body);
    try{
        let user = await userModel.findOne({email,password})
        console.log(user);
if(!user){
    res.send({user:'not found'})
}else{
//generate toke
let userPayload = {email:user.email,name:user.name}
// console.log(userPayload);
let token = jwt.sign(userPayload,jwtKey,{expiresIn:'1d'})
// console.log(token);
res.cookie('jwt',token)
res.send({status : 'success',user:user})
}
    }catch(err){
        res.send('error in login')
    }
}

let logout = (req,res) =>{
    
}

module.exports={
    login,
    singup,
    logout
}