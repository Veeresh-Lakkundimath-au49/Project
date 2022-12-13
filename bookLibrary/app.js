let express = require('express')
const initDB = require('./DbConfig')
let app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
let multer = require('multer')
let upload = multer({storage:multer.memoryStorage()})



app.get('/',(req,res)=>{


    res.sendFile('/public/welcome.html', { root: __dirname })
})

app.get('/singup',(req,res)=>{


    res.sendFile('/public/singup.html', { root: __dirname })

})

app.post('/singup',upload.single('Image'),async (req,res)=>{
let pic = req.file
console.log(pic);
    let postdata = await req.body
    console.log(postdata);
res.send('request succes',)

})








app.listen(8000,()=>{
    console.log('server is runing');
})