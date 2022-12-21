let express = require('express')
let app = express()
let dotenv = require('dotenv')
dotenv.config()
app.use(express.static('public'))
app.use(express.urlencoded())
let multer = require('multer')
const { signup, login,profile, logout } = require('./Controllers/authControllers')
const { initDB } = require('./DbConfig')
let upload = multer({storage:multer.memoryStorage()})
let cookieParser = require('cookie-parser')
app.use(express.json()) 
app.use(cookieParser())

initDB()


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
app.get('/library',(req,res)=>{

    res.sendFile('/public/library.html',{ root: __dirname })
})

app.post('/signup',upload.single('image'),signup)

app.post('/login',login)

app.get('/profileData',profile)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log('server is runing');
}) 