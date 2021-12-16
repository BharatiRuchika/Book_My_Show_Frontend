import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
// import { connect } from 'react-redux';
import '../movie_details.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Link from "react-router-dom";
import Typography from '@mui/material/Typography';
import { useHistory,Link } from 'react-router-dom';
function Movie_theater(props){
    const history = useHistory();
    const [theaters,settheaters] = useState([]);
   
    useEffect(()=>{
       getTheaters();
    },[])
    const getTheaters = async()=>{
        const token = localStorage.getItem("token");
      var res = await axios.get("https://bookmyshowback.herokuapp.com/theater/getTheaters",{
          headers:{
              'auth-token':token
          }
      });
      console.log("res",res);
      settheaters(res.data);
    }
    const Edit = (id)=>{
        history.push(`/editTheater/${id}`);
    }
    const   view=(id)=>{
        history.push(`/viewMovies/${id}`);
    }
       
    const remove = async(id)=>{
        const token = localStorage.getItem("token");
        var res = await axios.delete(`https://bookmyshowback.herokuapp.com/theater/deletetheater/${id}`,{
            headers:{
                'auth-token':token
            }
        });
        console.log("res",res);
        let current_theaters=theaters;
        current_theaters = current_theaters.filter((theater)=>theater._id!==id)
        // this.setState({posts});
        settheaters(current_theaters);
        if(res.status==200){
            var response = await axios.delete(`https://bookmyshowback.herokuapp.com/movies/deletemovie/${res.data._id}`,{
                headers:{
                    'auth-token':token
                }
            });
            console.log("res",response);
        }
    }
    const theaterUpload = ()=>{
        history.push("/addTheater");
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
                        <li className="nav-item">
                            <Link to={{ pathname: "/adminpage"}} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
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
            <Link to={{ pathname: "/theater_upload" }} className="nav-link" style={{marginLeft:"500px"}}><p style={{fontSize:"30px",color:"black",fontWeight:"bold"}}>Add Theater</p></Link>
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
        <Button onClick={()=>{history.push(`/movie_upload/${theater._id}`)}}size="small">Add Movie</Button>
        <Button onClick={()=>Edit(theater._id)} size="small">Edit</Button>
        <Button onClick={()=>remove(theater._id)} size="small">Delete</Button>
      
        <Button onClick={()=>view(theater._id)}  size="small">View Movies</Button>

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
export default Movie_theater;