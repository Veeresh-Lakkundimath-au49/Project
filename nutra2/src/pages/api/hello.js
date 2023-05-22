// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require('jsonwebtoken');
export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  if(req.method==='GET'){
    res.send("This is NEXT js server ");
  }
 

  if(req.method==='POST'){
    const info=req.body.email;
    console.log(info)
    var token = jwt.sign({ info }, 'shhhhh');
    console.log(token)
    //res.setHeader('Set-Cookie',token)
    //res.cookie('jwt',token,{maxAge:900000,httpOnly:true})
    console.log("Data received successfully in the server");
    res.send(`Data is sent from server ,Data received is ${info}`);
  }

  // if(req.method==='GET'){
  //   let {cookies}=req
  //   console.log("Cookie successfully received from request",cookies)
  // }
}
