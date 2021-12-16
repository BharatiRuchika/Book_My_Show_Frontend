import React, { useEffect, useState } from 'react'
import { useHistory, useLocation ,useParams} from 
'react-router-dom';
import { connect } from 'react-redux';
import '../movie_details.css';
import axios from "axios";
const Bookingform = (props) => {
    const history = useHistory();
    const location = useLocation();
    console.log("location",location.state);
    console.log("props",props);
    const profile = props.profile;
    const password = props.password;
    const username = props.name;
    const mobile = props.mobile;
    const moviename = location.state.moviename;
    const ticketcost = location.state.ticketcost;
    const movieimage = location.state.movieimage;
    const releasedate = location.state.releasedate;
    const outdate = location.state.outdate;
    const email = props.email;

var params = useParams();

    const [bookingdate, setbookingdate] = useState('');
    const [moviedata,setmoviedata] = useState([]);
    useEffect(()=>{
    //   getDetails();
    },[])
    // const getDetails = async()=>{
    //     var id = params.id;
    //     var res = await axios.get(`http://localhost:3000/users/getmovie/${id}`);
    //    console.log("res",res); 
    //    setmoviedata(res.data.movie[0]);

    // }
    const selectCeats = (e) => {
        e.preventDefault();
        if (username === "" || moviename === "" || ticketcost === "" || bookingdate === "") {
            alert("please select booking date");
        } else {
            history.push({ pathname: '/pickceat', state: { profile: profile, email: email, movieimage: movieimage, username: username, mobile: mobile, moviename: moviename, ticketcost: ticketcost, bookingdate: bookingdate, password: password } })
        }

    }
    return (
       
        <div class="form-container sign-in-container" className="movie-container" >
            <form style={{ background: '#f6f5f7' }}>
                <h1 style={{marginTop: '25vh'}}>Book Your Ticket</h1>
                <span>One Ticket Cost : <b>${ticketcost}</b></span>
                <br />
                <input type="text" placeholder="Username" value={username} />
                <input type="text" placeholder="Movie name" value={moviename} />
                <input type="text" placeholder="Ticket Amount" value={ticketcost} />
                <input type="date" placeholder="Pick Booking Date" max={outdate} min={releasedate} value={bookingdate} onChange={(e) => setbookingdate(e.target.value)} />
                <br />
                <div style={{display:"flex"}}>
                    <div>
                <button onClick={selectCeats}>Select Ceats</button></div><div>
                <button style={{marginLeft:"30px",width:"200px"}} onClick={()=>{history.push("/homepage")}} >Cancel</button></div>
                </div>
            </form>
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
export default connect(mapStateToProps)(Bookingform)
