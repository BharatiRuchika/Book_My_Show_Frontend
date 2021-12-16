import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import '../movie_details.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useHistory,Link } from 'react-router-dom';
function AdminHome(props){
    const history = useHistory();
   
    const [theaters,settheaters] = useState([]);
    useEffect(()=>{
       getTheaters();
    },[])
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
                        <li className="nav-item active">
                            <Link to={{ pathname: "/adminpage"}} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/movie_theater_upload" }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Movie Upload</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminbooking" }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Retrieve Bookings</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminprofile" }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/retrievefeedback" }} className="nav-link" >
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
           <p style={{fontSize:"30px",color:"black",fontWeight:"bold",marginLeft:"500px",marginTop:"50px"}}>Theaters</p>
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
        <Button onClick={()=>{history.push(`/theater_movies/${theater._id}`)}}size="small">View Movies</Button>
       

      </CardActions>
    </React.Fragment>
    </Card>
    </Box>
             )
         })}
        </div>
      
       
    )
}
// function mapStateToProps(state) {
//     console.log("state",state);
//     return {
//         name: state.name,
//         email:state.email,
//         password:state.password,
//         mobile:state.mobile
//     }
// }
export default AdminHome;