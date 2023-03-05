let express = require('express')
let app = express()
let dotenv = require('dotenv')
dotenv.config()
app.use(express.static('public'))
app.use(express.urlencoded())
let multer = require('multer')
let jwt = require('jsonwebtoken')
const { signup, login,profile, logout,library,dispCartData,
    getCartData,removeCartData ,adminData,userData,createAdmin,updateAdmin,deleteAdmin,editBookInfo,bookInfo,updateUser,myBooks,addBook,email,newPass} = require('./Controllers/authControllers')
const { initDB } = require('./DbConfig')
let upload = multer({storage:multer.memoryStorage()})
let cookieParser = require('cookie-parser')
app.use(express.json()) 
app.use(cookieParser())
app.listen(9000)


// const bodyParser = require('body-parser');


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// initDB()


app.get('/',(req,res)=>{


    res.sendFile('/public/welcome.html', { root: __dirname })
}) 
 
app.get('/signup',(req,res)=>{


    res.sendFile('/public/signup.html', { root: __dirname })

})

app.get('/login',(req,res)=>{


    res.sendFile('/public/login.html', { root: __dirname })

})

app.get('/logout',logout)

app.get('/library',library)

app.post('/signup',upload.single('image'),signup)

app.post('/login',login)

app.get('/profileData',profile)

app.post('/getCartData',getCartData)

app.get('/dispCartData',dispCartData)

app.get('/cart',(req,res)=>{
    
        //res.sendFile(path.join(__dirname,'/public/addToCart.html'))

        res.sendFile('/public/addToCart.html', { root: __dirname })

        //res.sendFile("C:/Users/HP/Desktop/bookHeaven/backend-project-Veeresh-Lakkundimath-au49-dev/public/addToCart.html")
})

app.get('/editProfile',(req,res)=>{
    
    //res.sendFile(path.join(__dirname,'/public/addToCart.html'))

    res.sendFile('/public/editProfile.html', { root: __dirname })

    //res.sendFile("C:/Users/HP/Desktop/bookHeaven/backend-project-Veeresh-Lakkundimath-au49-dev/public/addToCart.html")
})

app.post('/removeCartData',removeCartData);


app.get('/admin',adminData)

app.get('/user',userData)

app.post('/createAdmin',createAdmin)

app.put('/updateAdmin',updateAdmin)

app.post('/updateUser',upload.single('image'),updateUser )

app.delete('/deleteAdmin',deleteAdmin)

app.put('/editBookInfo',upload.single('image'),editBookInfo)

app.get('/bookInfo',bookInfo)

app.get('/adminBooks', (req,res)=>{

    res.sendFile('/public/mybooks.html', { root: __dirname })

})

app.get('/myBooks',myBooks)

app.get('/addBook',(req,res)=>{

    res.sendFile('/public/addBook.html', { root: __dirname })
})

app.post('/addBook',upload.single('image'),addBook)

app.post('/email',email)

app.get('/password',(req,res)=>{

    res.sendFile('/public/password.html', { root: __dirname })
})

app.post('/newPass',newPass)

// const PORT = process.env.PORT || 8000
// app.listen(PORT,()=>{
//     console.log('server is runing'); 
// }) 