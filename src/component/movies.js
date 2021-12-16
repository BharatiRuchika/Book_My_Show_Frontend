import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import axios from "axios";
import { useHistory,Link,useParams } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { MDBCol, MDBIcon } from "mdbreact";
// import { MDBCol } from "mdbreact";
// import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
// import SearchBar from "material-ui-search-bar";
import { MenuItem, Select, Typography } from "@material-ui/core/";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import '../movie_details.css';
const Homepage = (props) => {
    console.log("props",props);
    const history = useHistory();
    var params = useParams();
    const profile = props.profile;
    const name = props.name;
    const email = props.email;
    const mobile = props.mobile;
    const [moviedata, setmoviedata] = useState([]);
    const [search,setsearch] = useState("");
    useEffect(() => {
        console.log("history",history);
        console.log("props",props);
        console.log("home component mounted");
        getmovies();
        
    }, [])
    const SearchSubmit = async()=>{
        const token = localStorage.getItem("token");
        console.log("search called");
        console.log("search",search);
        var response = await axios.get(`https://bookmyshowback.herokuapp.com/movies/searchmovies/${search}`,{
            headers:{
                'auth-token':token
            }
        });
        console.log("response",response);
        setmoviedata(response.data)
    }
    const getmovies=async()=>{
        var id = params.id;
        const token = localStorage.getItem("token");
        console.log("getmovies called");
       var response = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getmovies/${id}`,{
           headers:{
               'auth-token':token
           }
       });
       console.log("res",response);
       setmoviedata(response.data.response)
    }
    // const  view = async(id)=>{
    //   history.push("/details");
    // }
    // const bookMovie = async()=>{
    //     history.push("/bookingform");
    
    // }
    return (
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
            {/* <MDBCol md="6">
      <div className="active-pink-3 active-pink-4 mb-4">
        <input style={{marginLeft:"300px",color:"black"}} className="form-control" type="text" placeholder="Enter Movie in your city" aria-label="Search" />
      </div>
    </MDBCol> */}
     <MDBCol md="6">
      <form style={{marginLeft:"300px",width:"700px"}} className="form-inline mt-4 mb-4">
        <MDBIcon onClick={SearchSubmit} icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" name="search" value={search} onChange={(e)=>{setsearch(e.target.value)}} onKeyUp={getmovies} placeholder="Search Movie By Name" aria-label="Search" />
      </form>
    </MDBCol>
    {moviedata.length==0?<h1 style={{marginLeft:"300px"}}>No Movie Available</h1>:<>
            {moviedata.map(movie=>{
        return (
            <Card sx={{ minWidth: 550,marginTop:"40px",marginLeft:"400px" }}>
            <CardMedia
              component="img"
              height="140"
              image={movie.movieimage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {movie.moviename}
              </Typography> 
              <Typography variant="body2" color="text.secondary">
              {movie.description}
              </Typography>
            </CardContent>
            <CardActions>
            <Button onClick={() => history.push({ pathname: "/details", state: { videourl: movie.videourl, moviename: movie.moviename, description:movie.description, actorname: movie.actorname, directorname: movie.directorname, releasedate: movie.releasedate, outdate: movie.outdate,movieimage:movie.movieimage } })}>View Details</Button>
             
            <Button onClick={() => history.push({ pathname: "/bookingform", state: { videourl: movie.videourl, moviename: movie.moviename,ticketcost:movie.ticketcost,description:movie.description, actorname: movie.actorname, directorname: movie.directorname, releasedate: movie.releasedate, outdate: movie.outdate,movieimage:movie.movieimage } })}>Book Now</Button>
            </CardActions>
          </Card>
        )
    })}</>}
    <input type="button" style={{width:"200px",marginLeft:"550px",marginTop:"50px"}} onClick={()=>{history.push("/homepage")}} value="Back"  id="con-select" />
  </div>

    )
}
function mapStateToProps(state) {
    console.log("state",state);
    return {
        name: state.name,
        email:state.email,
        profile:state.profile,
        mobile:state.mobile
    }
}
export default connect(mapStateToProps)(Homepage);