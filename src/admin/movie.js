import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import axios from "axios";
import { useHistory,Link,useParams } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Movies = ()=>{
    const params = useParams();
    const history = useHistory();
    
    const [movies,setmovies] = React.useState([]);
    useEffect(()=>{
        getMovies();
    },[])
   
    async function getMovies(){
      var id = params.id;
      const token = localStorage.getItem("token");
      var res = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getmovies/${id}`,{
          headers:{
              'auth-token':token
          }
      });
      console.log("res",res);
      setmovies(res.data.response);
    }
   const Remove=async(id)=>{
       console.log("deleteId",id);
       const token = localStorage.getItem("token");
       var res = await axios.delete(`https://bookmyshowback.herokuapp.com/movies/deletemovie/${id}`,{
           headers:{
               'auth-token':token
           }
       });
       console.log("res",res);
   }
  const editMovie=async(id,theaterId)=>{
      history.push(`/editMovie/${id}/${theaterId}`);
  }
  return (
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
    {movies.length==0?<h1 style={{color:"red",marginLeft:"300px",marginTop:"100px",fontWeight:"bold"}}>No Movies Added</h1>:<>
    {movies.map(movie=>{
        return (
            <Card sx={{ minWidth: 550,marginTop:"40px",marginLeft:"410px" }}>
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
              <Button onClick={()=>Remove(movie._id)} size="small">Delete</Button>
              <Button onClick={()=>editMovie(movie._id,movie.theaterId)} size="small">Edit</Button>
            </CardActions>
          </Card>
        )
    })}</>}
    <input type="button" style={{width:"200px",marginLeft:"400px",marginTop:"100px"}} onClick={()=>{history.push("/movie_theater_upload")}} value="Back"  id="con-select" />
  </div>
  )
}
export default Movies;