import React, { useState } from "react";
import {useHistory} from "react-router-dom";
// import FileUpload from 'FileUpoad';
import { connect } from 'react-redux';
import {selectedProfile,selectedName,selectedEmail,selectedMobile} from "../Reducer/reducer";
import validator from 'validator'
import axios from "axios";
import "../App.css";
function Signup(props){
   const [Profile,setProfile] = useState('');
//    const [name,setname] = useState('');
//    const [email,setemail] = useState('');
//    const [password,setpassword] = useState('');
//    const [mobile,setmobile] = useState('');
   const [admin,setadmin] = useState(false);
 
   const [state,setState] = React.useState({
    username:"",
    email:"",
    password:"",
    mobile:"",
    
    errors:{
      username:"",
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
    var email = state.email;
    var password = state.password;
    e.preventDefault();
    if(email==="" || password===""){
      alert("enter email and password");
    }
    
   if(admin==true){
     var res = await axios.post("https://bookmyshowback.herokuapp.com/admin/validateAdmin",{
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
      localStorage.setItem("token",res.data.authToken);
      History.push({pathname:"/adminpage"});
     }
   }else{
var res = await axios.post("https://bookmyshowback.herokuapp.com/users/validateUser",{
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
    props.selectedName(res.data.user.username);
    props.selectedProfile(res.data.user.image);
    props.selectedEmail(res.data.user.email);
    props.selectedMobile(res.data.user.mobile);
    localStorage.setItem("token",res.data.authToken);
  History.push("/homepage");
 }
}
  }
  const handleSubmit = async(e)=>{
   e.preventDefault();
 
  console.log("target",e.target);
   const data = new FormData(e.target);
   console.log("data",data);
   data.append('photo',Profile);
   console.log("formdata",data.get("email"));
   console.log("formdata",data.get("photo"));
   const config={
     headers:{
       'content-type':'multipart/form-data'
     }
   }
   const url = "https://bookmyshowback.herokuapp.com/users/register";
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
 }
 const handleChange = async({target:{name,value}})=>{
    console.log("handlechange called");
    console.log("value",value);
    let errors = state.errors;
   
    switch(name){
      case "username":{
        if(value.length==0){
          errors.username = "name cant be empty";
        }else
        if(value.length<5){
          errors.username = 'name should be atleast 5 charaters long';
        }else{
          errors.username = "";
        }
       
        break;
      }
     
      case "email":{
        if(value.length==0){
          errors.email = "email cant be empty";
        }else
        errors.email =  validEmailRegex.test(value)
        ? ''
        : 'Email is not valid!';
        break;
      }
      case "mobile":{
        if(value.length==0){
          errors.mobile = "Mobile Nunber cant be empty";
        }else
        errors.mobile = '';
        break;
      }
      case "password":{
        if(value.length==0){
          errors.password = "password cant be empty";
        }else
        errors.password = validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })?'':"password is weak";
     
        break;
      }
    }
    console.log("errors",errors);
    setState({...state,[name]:value,errors:errors});
  }
   return(
     <div>
         <h2 style={{marginTop:"80px"}}>Movie Ticket Booking App</h2>
         <div class="container" id="container">
         <div class="form-container sign-up-container">
             <form onSubmit={handleSubmit}>
             <div>
                
                 </div> 
                 <h1>Create Account</h1>
                 <div class="social-container">
                 
                 </div>
                 <span>or use your email for registration</span>  
                
                 <input type="file" placeholder="Pick Image" onChange={(e) => setProfile(e.target.files[0])} />
                 
                 <input type="text" placeholder="name" name="username" id="name"
                 value={state.username} onChange={handleChange}/>
                  <span style={{color:'red'}}>{state.errors.username}</span>
                <input type="email" placeholder="email" name="email" id="email"
                value={state.email} onChange={handleChange}/> 
                 <span style={{color:'red'}}>{state.errors.email}</span>
                <input type="password" placeholder="password" name="password" id="password"
               value={state.password} onChange={handleChange}/> 
                <span style={{color:'red'}}>{state.errors.password}</span>
                 <input type="text" placeholder="mobile" name="mobile" id="mobile"
                
                  value={state.mobile} onChange={handleChange}/>
                  <span style={{color:'red'}}>{state.errors.mobile}</span>
                 
                 <button type="submit">Sign Up</button>
               
             </form>
            
         </div>
         <div class="form-container sign-in-container">
              <form>
                  <h1>Sign in</h1>
                 
                  <span>or use your account</span>
                  <input type="email" name="email" placeholder="email" value={state.email} onChange={handleChange}></input>
                  <span style={{color:'red'}}>{state.errors.email}</span>
                  <input type="password" name="password" placeholder="password" value={state.password} onChange={handleChange}></input>
                
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
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" onClick={signUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
</div>
   )
}
export default connect(null,{selectedProfile,selectedName,selectedEmail,selectedMobile})(Signup);
