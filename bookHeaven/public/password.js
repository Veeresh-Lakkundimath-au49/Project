let emailEle=document.getElementById("email")
let btnEle=document.getElementById("btn");

btnEle.addEventListener("click",async()=>{

    let email=emailEle.value;
    console.log(email);
    let result=await fetch('/email',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "email":email
        })
    })
    console.log(await result.json());
    if(result=="1"){

        let otp="1515"

        function sendMail() {
            message=`Yout One time password is here ${otp}` 

            var params = {
            //   name: document.getElementById("name").value,
            name: ['oyage19@gmail.com','zenrobotics618@gmail.com'],
              email: document.getElementById("email").value,
              message: document.getElementById("message").value,
            };
          
            const serviceID="service_6v75sen";
            const templateID="template_ia7euxp";
          
              emailjs.sendMultiple(serviceID, templateID, params)
              .then(res=>{
                  document.getElementById("name").value = "";
                  document.getElementById("email").value = "";
                  document.getElementById("message").value = "";
                  console.log(res);
                  alert("OTP sent successfully!!")
          
              })
              .catch(err=>console.log(err));
          
          }


          sendMail()


        let codeInput=document.getElementById("code");
        codeInput.innerHTML=`
        
        <input placeholder="enter OTP sent to your Email" id="otp" />

        `
        let password=document.getElementById("otp")
        if(otp==password.value){

            codeInput.innerHTML=`
            
            <div>
            <input placeholder="Enter New password" id="newPass" />
            <button id="passBtn">Relace password</button>
            </div>

            `

            let passBtnEle=document.getElementById("passBtn")
            passBtnEle.addEventListener("click",async()=>{

                let data= await fetch("/newPass",{

                    method:"POST",
                    header:{'Content-type':'application/json'},
                    body:JSON.stringify({
                        "password":password.value
                    })
                })

                if(data){
                    window.alert("Password update Successfull")
                }
                else{
                    window.alert("Password update Failed")
                }

            })
        }
    }
    else if(result=="0"){
        let codeInput=document.getElementById("code");
        codeInput.innerHTML=`
        
        <h1>Your email ID is not registered, please SignUp </h1>

        `
    }
})
