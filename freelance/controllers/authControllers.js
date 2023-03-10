const cloudinary = require('cloudinary').v2;
const { Base64 } = require('js-base64');
let cookieParser = require('cookie-parser');
const {sellerModel,buyerModel} = require('../schema');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let jwtkey= 'fprt'
//cloudinary configuration

cloudinary.config({
    cloud_name: 'docch2cvb',
    api_key: '673847735511879',
    api_secret: 'qaSVo3r8ikDiit4P_Qwet_nPNbE'
})

let signUp=async(req,res)=>{
    let userData=req.body;
    
   if(userData.usertype=="true"){
    await sellerModel.create({"name":userData.name,"email":userData.email,"password":userData.password,})
   }
   // let image = req.file;
   // console.log(image);
    // const hashedName = await bcrypt.hash(userData.name, 5)
    
    
    else{
        await buyerModel.create({"name":userData.name,"email":userData.email,"password":userData.password,})
    }

    // let imageString = Base64.encode(image.buffer)
    // let imageData = await cloudinary.uploader.upload(`data:${image.mimetype};base64,${imageString}`)

    console.log(userData);
    console.log("User added successfully!");
    //console.log(imageData.secure_url)
    res.send(userData);
    //res.send('1')

}

let login=async(req,res)=>{

    let {email,password}=req.body
console.log(email,password);
    try {
        
        let user = await sellerModel.findOne({ email, password })
        console.log(user);
        if (!user) {
            //res.send({ user: 'not found' })
            res.send('0')
        } else {
            //generate toke
            let userPayload = { email: user.email, name: user.name }
            // console.log(userPayload);
            let token = jwt.sign(userPayload,jwtkey, { expiresIn: '1d' })
            // console.log(token);
            res.cookie('jwt', token);
            res.send('1');

        
    } }catch (error) {
        console.log("Error occured in login",error);
    }
}

let logout=async(req,res)=>{

   
console.log(req.cookie);
    res.cookie('jwt', '');
    res.send('1');//success
    console.log("logout done form the backend side");
}

let addGig = async (req, res) => {
    let userData = req.body;
    try {
      let token = req.cookies.jwt;
      if (!token) {
        console.log('Please log in to add a gig');
        res.status(401).send('Please log in to add a gig');
        return;
      }
      let userdata = jwt.verify(token, jwtkey);
      let { email } = userdata;
      console.log(token);
      let user = await sellerModel.findOne({ email });
      if (user) {
        user.gigInfo.push({
          id: Math.floor(Math.random() * 100) + 1,
          gigName: userData.gigName,
          description: userData.description,
          price: userData.price
        });
        await user.save();
        res.send('Gig added successfully');
        console.log('Gig added successfully');
      } else {
        res.send('User not found');
        console.log('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(401).send('Please log in to add a gig');
    }
  };

let updateGig=async(req,res)=>{

    updatedData=req.body;

    let result=await sellerModel.findOneAndUpdate(
        { name: 'Dhruv' },
        { $set: { 'gigInfo.$[child]': {"id":Math.floor(Math.random() * 100) + 1,"gigName":updatedData.gigName,"description":updatedData.description,"price":updatedData.price} } },
        { arrayFilters: [{ 'child.price': 1499 }], new: true },
    )
    console.log(result)
        res.send("Gig data updated successfully!!")
}



let gig = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.log('Please log in');
            return res.status(401).send({ error: 'Please log in' });
        }
        const decoded = jwt.verify(token, jwtkey);
        const { email } = decoded;
        const user = await sellerModel.find({ email }).select("gigInfo");
        console.log(user);
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
    }
};

let MyGig = async (req, res) => {
    try {
      let token = req.cookies.jwt;
      let userdata = jwt.verify(token, jwtkey);
      let { email } = userdata;
      let user = await sellerModel.findOne({ email }).select('gigInfo');
      if (user) {
        res.send(user.gigInfo);
      } else {
        console.log("please log in");
        res.status(401).send({ error: 'Please log in.' });
      }
    } catch (err) {
        console.log("please log in");
      res.status(401).send({ error: 'Please log in.' });
    }
  };

let deleteGig=async(req,res)=>{
    let result=await sellerModel.findOneAndUpdate(
        { name: 'Dhruv' },
        { $pull: { gigInfo: {  "price":555  } } },
        { new: true },
    )
    res.send("Gig Deleted successfully")
}


module.exports={
    signUp,login,logout,gig,addGig,updateGig,deleteGig,MyGig
}