import React, { useState } from "react";
import {useHistory} from "react-router-dom";
// import FileUpload from 'FileUpoad';
import { connect } from 'react-redux';
import {selectedProfile,selectedName,selectedEmail,selectedMobile} from "../Reducer/reducer";
import axios from "axios";
import "../App.css";
function Signup(props){
   const [Profile,setProfile] = useState('');
  const [name,setname] = useState('');
   const [email,setemail] = useState('');
   const [password,setpassword] = useState('');
   const [mobile,setmobile] = useState('');
   const [admin,setadmin] = useState(false);
   const [add,setadd] = useState(false);
   const [state,setState] = React.useState({
    Name:"",
    email:"",
    password:"",
    mobile:"",
    errors:{
      name:"",
      email:"",
      password:"",
      mobile:""
      
    }
  })
   const History = useHistory();
   const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const signIn = ()=>{
    var container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }
  const signUp = ()=>{
    var container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }
  const handleLogin = async(e)=>{
    console.log("handlelogin called");
    e.preventDefault();
    if(email==="" || password===""){
      alert("enter email and password");
    }
   if(admin==true){
     var res = await axios.post("http://localhost:3000/admin/validateAdmin",{
       email,password
     })
     console.log("res",res);
     if(res.data.error=="Invalid Password"){
       alert("Invalid Password");
     }else
     if(res.data.error=="admin doesnt exist"){
       alert("admin doesnt exist");
     }else
     if(res.data.authToken){
    
      props.selectedName(res.data.admin.name);
      props.selectedProfile(res.data.admin.image);
      props.selectedEmail(res.data.admin.email);
      props.selectedMobile(res.data.admin.mobile);
      History.push({pathname:"/adminpage"});
     }
   }else{
var res = await axios.post("http://localhost:3000/users/validateUser",{
  email,password
})
console.log("res",res);
if(res.data.error=="Invalid Password"){
  alert("Invalid Password");
}else
if(res.data.error=="user doesnt exist"){
  alert("user doesnt exist");
}else
  if(res.data.authToken){
    props.selectedName(res.data.user.name);
    props.selectedProfile(res.data.user.image);
    props.selectedEmail(res.data.user.email);
    props.selectedMobile(res.data.user.mobile);
  History.push("/homepage");
 }
}
  }
  const handleSubmit = async(e)=>{
   e.preventDefault();
 
  console.log("target",e.target);
   const data = new FormData(e.target);
   data.append('photo',Profile);
   console.log("formdata",data.get("email"));
   console.log("formdata",data.get("photo"));
   const config={
     headers:{
       'content-type':'multipart/form-data'
     }
   }
   const url = "http://localhost:3000/users/register";
   const res = await axios.post(url,data,config);
   console.log("res",res);
   if(res.data.response){
     alert("user register successfully");
     var container = document.getElementById('container');
     container.classList.remove("right-panel-active");
    //  history.push("/");
   }else{
     alert("user already exist");
   }
 
   
  //  }else{
  
  //     alert("account created successfully");
      // setadd("nouser");
      // setname('');
      // setemail('');
      // setpassword('');
      // setmobile('');
  //  }
  //  }
  //  }
  }
  // const handleSubmit = async(e)=>{
  //   e.preventDefault();
  //  console.log("submit called");
  //  console.log("data",Profile,url,name,email,password,mobile,admin);
  
  //  try{
  //      const res = await axios.post("http://localhost:5000/users/register",{
  //          imageName:Profile,
  //           // url:url,
  //           name:name,
      //       email:email,
      //       password:password,
      //       mobile:mobile,
      //       // admin:admin
      //  },{
      //      headers:{
      //       'content-type': 'multipart/form-data'
      //   }
           
      //  })
    //    const {fileName,filePath} = res.data;
  //  }catch(e){
  //      console.log(e);
  //  }
  // }
   return(
     <div>
         <h2>Movie Ticket Booking App</h2>
         <div class="container" id="container">
         <div class="form-container sign-up-container">
             <form onSubmit={handleSubmit}>
             <div>
                 {add=="nouser"?<h3>account created successfully</h3>:""}
                 {add=="user"?<h3>User already exist</h3>:""}
                 </div> 
                 <h1>Create Account</h1>
               
                 <span>or use your email for registration</span>  
                
                 <input type="file" placeholder="Pick Image" onChange={(e) => setProfile(e.target.files[0])} />
                 <input type="text" placeholder="name" name="name" id="name"
                  value={name} onChange={(e)=>setname(e.target.value)}/>

                  
                 <input type="email" placeholder="email" name="email" id="email"
                   value={email} onChange={(e)=>setemail(e.target.value)}/> 

                 
                 <input type="password" placeholder="password" name="password" id="password"
               value={password} onChange={(e)=>setpassword(e.target.value)}/> 
               
                 <input type="text" placeholder="mobile" name="mobile" id="mobile"
                
                  value={mobile} onChange={(e)=>setmobile(e.target.value)}/>
                 
                 
                 <button type="submit">Sign Up</button>
               
             </form>
            
         </div>
         <div class="form-container sign-in-container">
              <form>
                  <h1>Sign in</h1>
                
                  <span>or use your account</span>
                  <input type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}></input>
                  <input type="password" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
                  <input type="checkbox" style={{ marginLeft: "-66%", width: "-webkit-fill-available" }} value={admin} onChange={(e) => setadmin(true)} /><a href="#" style={{ marginLeft: "-8%", marginTop: "-8%" }}>Pick If You Are Admin</a>
                  <button onClick={handleLogin}>Sign In</button>
              </form>
         </div>

          <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn" onClick={signIn}>Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us </p>
              <button class="ghost" id="signUp" onClick={signUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
</div>
   )
}
export default connect(null,{selectedProfile,selectedName,selectedEmail,selectedMobile})(Signup);
