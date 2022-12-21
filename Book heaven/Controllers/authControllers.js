const { userModel } = require("../models/userModels")
let jwt = require('jsonwebtoken')
let path = require('path')



const cloudinary = require('cloudinary').v2;
const { Base64 } = require('js-base64');
const { dirname } = require("path");
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})
let signup = async (req, res) => {
    // console.log(req.body);
    let pic = req.file
    let picString = Base64.encode(pic.buffer)
    let picData = await cloudinary.uploader.upload(`data:${pic.mimetype};base64,${picString}`)
      
    let { name, email, password,number } = req.body
    
 
    try {
        let newUser = await userModel.create({ 'name': name, 'email': email, 'password': password,'number':number, 'image': picData.secure_url })
        res.sendFile(path.join(__dirname,'../public/login.html'))
    } catch (err) {
        res.status(500).send({ status: 'error', err: err })
        console.log(err);
    }

}

let login = async (req, res) => {
    let { email, password } = req.body
    // console.log(req.body);
    try {
        let user = await userModel.findOne({ email, password })
        console.log(user);
        if (!user) {
            res.send({ user: 'not found' })
        } else {
            //generate toke
            let userPayload = { email: user.email, name: user.name }
            // console.log(userPayload);
            let token = jwt.sign(userPayload,process.env.jwtKey, { expiresIn: '1d' })
            // console.log(token);
            res.cookie('jwt', token)
            res.sendFile(path.join(__dirname,'../public/profile.html'))
        }
    } catch (err) {
        console.log(err);
        res.send('error in login')
    }
}

let profile = async (req, res) => {
    let token = req.cookies.jwt
    let userdata = jwt.verify(token,process.env.jwtKey)
    let { email, name } = userdata;
    user = await userModel.findOne({ email, name })
    res.send(user)
}

let logout = (req, res) => {
    res.cookie('jwt', '')
    res.sendFile('C:/Users/dhruv/OneDrive/Desktop/book library website/public/welcome.html')
console.log('logout');
}


module.exports = {
    login,
    signup,
    logout,
    profile
}