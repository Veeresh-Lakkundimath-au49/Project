let express = require('express')
const initDB = require('./DbConfig')
const {signup,login,logout,profile}=require('./Controllers/authControllers')
let app = express()
// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
let multer = require('multer')
var fs = require('fs');
let cookieParser=require('cookie-parser')
app.use(cookieParser())
const path=require('path');

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public',express.static('public'))


let upload = multer({storage:multer.memoryStorage()})
app.get('/',(req,res)=>{


    res.sendFile('/public/welcome.html', { root: __dirname })
})

app.get('/signup',(req,res)=>{


    res.sendFile('/public/signup.html', { root: __dirname })

})

app.get('/login',(req,res)=>{


    res.sendFile('/public/login.html', { root: __dirname })

})

app.get('/library',(req,res)=>{
    res.sendFile('/public/library.html', { root: __dirname })
})

app.post('/signup',upload.single('image'),signup)

app.post('/login',login)
app.get('/profileData', profile)

app.listen(8000,()=>{
    console.log('server is runing');
})





// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// exports.uploadUserPhoto = upload.single('photo');

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);

//   next();
// });
