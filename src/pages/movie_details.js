import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation,useParams,useHistory } from 'react-router-dom'
import '../movie_details.css';
import axios from "axios";
 const MovieDetails = (props) => {
    const location = useLocation();
    const history = useHistory();
    console.log(location.state);
    var videourl = location.state.videourl;
    var moviename = location.state.moviename;
    var description = location.state.description;
    var actorname = location.state.actorname;
    var directorname = location.state.directorname;
    var releasedate = location.state.releasedate;
    var outdate = location.state.outdate;
const params = useParams();
console.log("params",params);
    const [moviedata,setmoviedata] = React.useState([]);
    useEffect(()=>{
    //    getMovieDetails();
    console.log("props",props);
    },[])
    // const getMovieDetails = async(req,res)=>{
    //     var id = params.id;
    //    var res = await axios.get(`http://localhost:3000/users/getmovie/${id}`);
    //    console.log("res",res);
    //    setmoviedata(res.data.movie[0]);
    // }

    return (
        <div>
            <br /><br />
            <h2 style={{color:"red",fontWeight:"bold" }}>Movie Name-{moviename}</h2>
          

            <div ><iframe width="600" height="300" className="viedo" src={videourl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div className="card" style={{ width: "70%", marginLeft: "16%", background: "lightpink" }}>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>moviename : {moviename}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Description : {description}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Actor Name : {actorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Director Name : {directorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Release Date : {releasedate}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Out Date : {outdate}</h2>
            </div> 
            <input type="button" style={{width:"200px",marginLeft:"200px",marginTop:"50px"}} onClick={()=>{history.push("/homepage")}} value="Back"  id="con-select" />
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
export default connect(mapStateToProps)(MovieDetails);