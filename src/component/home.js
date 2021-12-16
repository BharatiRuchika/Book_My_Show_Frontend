import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { connect } from 'react-redux';
import '../movie_details.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { MDBCol, MDBIcon } from "mdbreact";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useHistory,Link } from 'react-router-dom';
function UserHome(props){
    const history = useHistory();
   const [theaters,settheaters] = useState([]);
   const profile = props.profile;
   const name = props.name;
   const [search,setsearch] = useState("");
   const email = props.email;
   const mobile = props.mobile;
    useEffect(()=>{
       getTheaters();
    },[])
    const SearchSubmit = async()=>{
        const token = localStorage.getItem("token");
        console.log("search called");
        console.log("search",search);
        var response = await axios.get(`https://bookmyshowback.herokuapp.com/theater/searchtheaters/${search}`,{
            headers:{
                'auth-token':token
            }
        });
        console.log("response",response);
        settheaters(response.data)
    }
    const getTheaters = async()=>{
        const token = localStorage.getItem("token");
        console.log("token",token);
       var res = await axios.get("https://bookmyshowback.herokuapp.com/theater/getTheaters",{
          headers:{
              'auth-token':token
          }
      });
      console.log("res",res);
      settheaters(res.data);
    }
   
    return(
        <div className="wrapper ">
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo"><a href="http://www.creative-tim.com" className="simple-text logo-normal">
                    AK CINEMAS
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item active  ">
                            <Link to={{ pathname: "/homepage",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/dashboard",state:{ profile: profile, name: name, email: email, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/bookings",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Bookings</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/userprofile",state:{ profile: profile, name: name, email: email, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/feedback",state:{ profile: profile, name: name, email: email, mobile: mobile } }} className="nav-link" >
                                <i className="material-icons">notifications</i>
                                <p>Feedback</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="" className="nav-link" >
                                <i className="material-icons">logout</i>
                                <p>Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <MDBCol md="6">
      <form style={{marginLeft:"300px",width:"700px"}} className="form-inline mt-4 mb-4">
        <MDBIcon onClick={SearchSubmit} icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" name="search" value={search} onChange={(e)=>{setsearch(e.target.value)}} onKeyUp={getTheaters} placeholder="Search Theaters By City" aria-label="Search" />
      </form>
    </MDBCol>
    {theaters.length==0?<h1 style={{color:"red",marginLeft:"350px",fontWeight:"bold"}}>No Theaters Available</h1>:<>
         {theaters.map(theater=>{
             return (
                 <Box sx={{ minWidth: 600,marginLeft:"300px" }}>
                <Card variant="outlined">
                <React.Fragment>
      <CardContent>
       
        <Typography variant="h5" component="div">
        {theater.theater_name}
        </Typography>
       
        <Typography variant="body2">
          <b>State</b> - {theater.theater_state}
          <br />
        
        </Typography>
        <Typography variant="body2">
         <b>City</b> - {theater.theater_city}
          <br />
        
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>{history.push(`/movies/${theater._id}`)}}size="small">View Movies</Button>
       

      </CardActions>
    </React.Fragment>
    </Card>
    </Box>
             )
         })}</>}
        </div>
      
       
    )
}
function mapStateToProps(state) {
    console.log("state",state);
    return {
        name: state.name,
        email:state.email,
        password:state.password,
        mobile:state.mobile
    }
}
export default connect(mapStateToProps)(UserHome);