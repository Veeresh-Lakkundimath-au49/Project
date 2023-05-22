import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';

//import MenuIcon from '@mui/icons-material/Menu';

import navbarStyles from '@/styles/Navbar.module.scss'
import modalStyles from '@/styles/Modal.module.scss'
import lpStyles from '@/styles/Lp.module.scss'
import {useSession,signIn,signOut} from "next-auth/react"
import { orange } from '@mui/material/colors';
//import {useSession,signIn} from "next-auth/client"
//import myfont from 'styles/fonts.css';

const inter = Inter({ subsets: ['latin'] })
  
export default function Home() {
  const [modal,setModal]=useState(false)
  const [nextBtn,setnextBtn]=useState(false)
  const [pass,setPass]=useState('');
  const [conPass,setConPass]=useState('');
  const [email,setEmail]=useState('')
  const [emailSt,setEmailSt]=useState(0);
  const [isLogin,setIsLogin]=useState(false);
  const [authLogin,setauthLogin]=useState(false)
  let [cookieData,setCookieData]=useState(" ")

  const session = useSession();

  useEffect(()=> {
    if(session.data){
      setCookieData(session.data.user)
      console.log(typeof session.data.user.email)

      console.log("Session",session)
      console.log("session.accessToken",session.accessToken)
      console.log("cookieData",cookieData)
      setIsLogin(true)
      setauthLogin(true)
    }

      const sendName=async()=>{
      console.log("cookieData ln 34",cookieData)
   //setCookieData(session.data.user.email)
    let response=await fetch('/api/hello',{
      method:'POST',
      body:JSON.stringify(cookieData),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data=await response.text()
    console.log(data)
}
 sendName()

},[session]);



//console.log("Session",session)

   function loginStatus(){

    if(pass==undefined){
      if(conPass==undefined){
        window.alert("Password cannot be empty")
      }
    }
    if(pass==conPass){

      setEmailSt(2);
      setIsLogin(!isLogin)
      setnextBtn(!nextBtn)
      console.log("Email entered is",email)
      console.log("Condition matched",pass,conPass)
      // window.alert("Password matched! Logged in Successfully!")
    }
    else{
      setEmailSt(4);
      console.log("Condition did not match",pass,conPass)
      // window.alert("Password did not match, Login Failed!")
    }
    console.log("Function invoked successfully")
  }

  return (
  
<div className={lpStyles.bgImg}>

    {/* <div className={lpStyles.bgImgSK}>
      <img src="bgOverlay.png" width="100%vw" height="100%vh"></img>
    </div> */}

    <div className={lpStyles.navBar1}>
   
    <div className={lpStyles.logo}>
          <Image src="/nutraverse.png" alt="nutraverse logo" height={160}  width={160}></Image>
    </div> 
    <div className={lpStyles.menuIcon}> <a><Image src="/mobMenu.png" height={25} width={25}></Image></a></div>
  {/* <div style={{display:"flex", justifyContent:"space-around", width:"100%", backgroundColor:"blue", height:"100px",alignItems:"center"}}> */}

        {/* <div className={lpStyles.navBarItem} > */}
<div className={lpStyles.navBarContainer}>
                          <div className={lpStyles.navBarItem}><a>HOME</a></div>
                          <div className={lpStyles.navBarItem}><a>RECIPE SUBMISSION</a></div>

                          <div className={lpStyles.desktopLogo}>
                            <Image src="/nutraverse.png" alt="nutraverse logo" height={150}  width={150}></Image>
                          </div> 

                          <div className={lpStyles.navBarItem}><a>GALLERY</a></div>
                          <div className={lpStyles.navBarItem}><a>SCOREBOARD</a></div>
          {/* <div className={navbarStyles.navBarItem}><a>Login</a></div> */}
        

        
        {!isLogin ? (
                          //
                          <div > <button className={navbarStyles.loginBtn} onClick={()=>setModal(!modal)}><h4>LOGIN</h4></button> 
                          </div>

        ):null}

        {
          authLogin ? (<div><h6>{cookieData.email}</h6>
          {/* <img height="100px" width="100px" src="/landingCTAOverlay2.png" /> */}
          </div>):null}
        

        {(emailSt/2==1) ? <div >
                 <h6>{email}</h6>
                </div>:null
       }

        {(emailSt/2==2) ? <div >
          <h2>Invalid credentials</h2>
        </div>:null
        } 
      </div>

    <div className={lpStyles.loginModal}>
        {/* LOGIN Modal component */}
         
            {modal ? <div className={modalStyles.loginModal}>

                        <div className={modalStyles.socialBtn}>
                            <div className={modalStyles.crossBtn}><a href="#" onClick={()=>{setModal(!modal)}}><Image src="/crossMark.png" height={20} width={20}></Image></a></div>
                        <div className={modalStyles.modalHead}><h2>LOG IN TO PARTICIPATE</h2></div>
                        
                            <div>
                              <button className={modalStyles.socialItem} onClick={(e)=>{e.preventDefault(),signIn('google')}}>
                              <div className={modalStyles.googleLoginBtn}>
                            <Image src="/googleIcon.png" height={25} width={25}></Image>
                            <h2>SIGN IN</h2> 
                            </div>
                                </button>
                              <button className={modalStyles.socialItem}>
                              <div className={modalStyles.googleLoginBtn}>
                          <Image src="/facebookLogo.png" height={25} width={25}></Image>
                          <h2>SIGN IN</h2> 
                          </div></button>
                            </div>

                        </div>

                        <form>
                              <div >
                                  <input className={modalStyles.input} required type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/> 
                              </div>

                              <div>
                                <button className={modalStyles.nxtBtn} onClick={(e)=>{e.preventDefault(),setnextBtn(true)}}>Next</button>
                              </div>
                        </form>
                      
            </div>:null}
          
        {/* LOGIN Modal component ends here */}


        {/* Modal for PASSWORD and CONFIRM-PASSWORD */}
        
        {nextBtn ? (<div className={modalStyles.loginModal}>
        <div className={modalStyles.socialBtn}>
        <div className={modalStyles.crossBtn}><a href="#" onClick={()=>{setnextBtn(!nextBtn),setModal(!modal)}}><Image src="/crossMark.png" height={20} width={20}></Image></a></div>
        <div >
       
        {/* <img src="/googleIcon.png" /> */}
            <button className={modalStyles.socialItem} >
              <div className={modalStyles.googleLoginBtn}>
            <Image src="/googleIcon.png" height={25} width={25}></Image>
             <h2>SIGN IN</h2> 
             </div></button>
            <button className={modalStyles.socialItem}>
            <div className={modalStyles.googleLoginBtn}>
            <Image src="/facebookLogo.png" height={25} width={25}></Image>
             <h2>SIGN IN</h2> 
             </div>
              </button>

        </div>

        </div>
          <div>
            <input className={modalStyles.input} type="password" placeholder="Enter Password" required onChange={(e)=>{setPass(e.target.value)}}/>
            <input className={modalStyles.input} type="password" placeholder="Confirm Password"  required onChange={(e)=>{setConPass(e.target.value)}}/> 
          </div>

          {/* LOGIN */}
          <div>
          <button className={modalStyles.nxtBtn} onClick={()=>{loginStatus(),setnextBtn(!nextBtn),setModal(!modal)}}>LOGIN</button>
          </div>
        
        </div>):null}

          {/* Modal for PASSWORD and CONFIRM-PASSWORD ENDS */}

    </div>
  
  </div>

      <div className={lpStyles.heading}>
              <div className={lpStyles.heading1}> <h1>THE WORLD'S FIRST-EVER COOKERY SHOW</h1></div> 
              <div className={lpStyles.heading2}><h1>HOSTED ON THE METAVERSE</h1></div>
      </div>
      
      <div className={lpStyles.bgImgSK}>
                  <img src="bgOverlay.png" width="100%vw" height="100%vh"></img>
      </div>
      
      <div>
    
        <div className={lpStyles.tag_Para}>

          <div className={lpStyles.tag_Para_item1}><h1>WHERE DELICIOUS GOES DIGITAL</h1></div>

          <div className={lpStyles.tag_Para_item2}>
                  <div className={lpStyles.tag_Para_item3}>
                  <h3>Participate in the Nutraverse Recipe Contest, and 
                  have your recipe's travel from your kitchen to a whole new Universe!
                  The best recipe's under three exciting catagories stand a chance to win prizes worth Rs 1Lakh*!</h3>
                  </div>
                  <div >
                  <button className={lpStyles.submitBtn}><h1>SUBMIT YOU RECIPE</h1></button>
                  </div>
                  <div className={lpStyles.submitBtnAsterisk}><h4>*You can create a recipe only in one catagory</h4></div>
                  
          </div>

        </div>  
        
          
      </div>
      
            <div className={lpStyles.whatsMoreContainer}>
            
      <div className={lpStyles.whatsMore}>
        <div className={lpStyles.whatsMoreImg}>
          <Image src="/landingCTAOverlay.png" width={160} height={80}></Image>
        </div>

        <div className={lpStyles.whatsMoreImg2}>
          <Image src="/landingCTAOverlay2.png" width={100} height={95}></Image>
        </div>
                <div className={lpStyles.whatsMoreVerbia}>
                
                  <h3 className={lpStyles.aboutUSblack}>
                    What's more,you also get the golden opportunity to meet
                  </h3>
                  <h3 className={lpStyles.nameDate}>CHEF SANJEEV KAPOOR</h3>
                  <h3 className={lpStyles.aboutUSblue}>AND WITNESS HIM COOKING IN THE NUTRAVERSE IN A NEVER-SEEN-BEFORE AVATAR ON </h3>
                  <h3 className={lpStyles.nameDate}>DD-MM-YY</h3>
                </div>
                
      </div>
      
            </div>
           
            <div className={lpStyles.aboutUsContainer}>
              
      <div className={lpStyles.aboutUs}>
                <div className={lpStyles.aboutUsContainerItem}>
                  <h1>ABOUT US</h1>
                </div>

                <div className={lpStyles.aboutUsContainerItem}>
                  <h3>Nutralite has been bringing health and taste together since 2006.Our product help smart homemakers choose healthier alternatives to tasty food accompaniments and keep their daily meals fuss-free,delicious, and healthier too</h3>
                </div>
      </div>
      </div>
      
      <div className={lpStyles.timer}>

        <div className={lpStyles.timerContainer}>
                  <div className={lpStyles.recipe}><div><h4>Recipes Submitted</h4></div></div>
                  <div className={lpStyles.timerCtrl}>
                  <div className={lpStyles.timerItem}><h1>9</h1></div>
                  <div className={lpStyles.timerItem}><h1>9</h1></div>
                  <div className={lpStyles.timerItem}><h1>9</h1></div>
                  <div className={lpStyles.timerItem}><h1>9</h1></div>
        </div>
        
      </div>
      <div className={lpStyles.footer}>
      <h4>Copyright Ⓒ 2022 Nutralite </h4>
      <h3>|</h3>
      <h4>T&Cs and Privacy Policy</h4>
      <h3>|</h3>
      <h4>Digital Agency Tonic Worldwide</h4>
      </div>


      <div className={lpStyles.footerMob}>
      <h4>Copyright Ⓒ 2022 Nutralite </h4>
      <h3>|</h3>
      <h4>T&Cs and Privacy Policy</h4>
      <h4>Digital Agency Tonic Worldwide</h4>
      </div>
  </div>

      <div className={lpStyles.footerLogo}>
        <h4 >Powered by</h4>
        <Image src="/logo.png" alt="nutraverse logo" height={60}  width={60}></Image>
      </div>
     

  </div>
  

      
      
      )
}

 


