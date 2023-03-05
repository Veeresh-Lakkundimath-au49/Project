let profile=document.getElementById("profile")
let btnEle=document.getElementById("btn")



window.addEventListener("load", getProfile());

async function getProfile(){

  btnEle.addEventListener("click",()=>{
    console.log("clicked");
  })

  let profileData=await fetch('/user');
let result=await profileData.json()

console.log(result);








profile.innerHTML=`

<form method="post" action="updateUser" enctype="multipart/form-data">
                <h2>Edit your Profile</h2>
                <div class="input">

                    <input type="text" id="name" name="name" required = "required" value=${result[0].name}>
                    <span>NAME</span>
                </div>


                <div class="input">

                    <input type="number" id="phone-number" name="number" value=${result[0].number} maxlength="10">
                    <span>PHONE NUMBER</span>
                </div>

                <div class="input">

                    <input type="file" class="custom-file-input" name="image">
                </div>

                <button>
                    <p class="button">Submit</p>
                </button>


            </form>

`
}


// const fileInput = document.getElementById('file-input');
// const file = fileInput.files[0];

// fetch('/upload', {
//   method: 'POST',
//   body: file,
//   headers: {
//     'Content-Type': file.type,
//   },
// });


