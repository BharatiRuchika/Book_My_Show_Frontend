import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from "axios";
import '../movie_details.css';
const AdminBooking = () => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    const [progress, setprogress] = useState(false);
    const [bookingdate, setbookingdate] = useState('');
    const [username, setusername] = useState('');
    const [userbooking, setuserbooking] = useState([]);
    const [flag,setFlag] = useState(false);
    const getData = async(e) => {
        e.preventDefault();
        if (bookingdate === "" || username === "") {
            alert("please fill date and username");
        } else {
            setprogress(!progress);
            console.log("bookingdate",bookingdate);
            console.log("username",username)
            var response = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getbookings/${bookingdate}/${username}`,{
                headers:{
                    'auth-token':token
                }
            });
            console.log("response",response);
            if(response.data.length==0){
                setFlag(true)
            }else{
            setuserbooking(response.data);
            }
        }
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
                            <Link to={{ pathname: "/adminpage" }} className="nav-link">
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
                        <li className="nav-item active">
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
            <div className="main-panel">
                <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div class="container-fluid">
                        <div class="navbar-wrapper">
                        </div>
                        <button class="navbar-toggler" id="admin-book-nav" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>
                <div className="main-panel">
                    <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'auto', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                        <form className="retrieve-form">
                            <h2 className="retrieve-bookings" style={{ fontWeight: "bold" }}>Retrieve Bookings</h2>
                            <br />
                            <input type="date" placeholder="Pick Booking Date" value={bookingdate} onChange={(e) => setbookingdate(e.target.value)} />
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
                            <input type="button" style={{ background: "#ff4b2b", color: "white" }} value="Get Data" onClick={getData} />
                            <br />
                            {progress == true ? (<progress max="100" label={`${progress}%`} value={progress} />) : <p></p>}

                        </form>
                        <div >
                            {flag==true?<h1>User Not Available</h1>:<>
                            {
                                userbooking.map((bookingdata, index) => {
                                    return <div key={index} className="card" id="retrieve-card">
                                        <p>Booking Date : {bookingdata.bookingdate}</p>
                                        <p>Username : {bookingdata.username}</p>
                                        <p>Email : {bookingdata.email}</p>
                                        <p>Mobile : {bookingdata.mobile}</p>
                                        <p>Moviename : {bookingdata.moviename}</p>
                                        <p>Total Ceats : {bookingdata.totalceats}</p>
                                        <p>Ceat Names : {bookingdata.ceatnames}</p>
                                        <p>Movie Watchers : {bookingdata.moviewatchers}</p>
                                        <p>Total Cost : {bookingdata.totalcost}</p>
                                        {/* <p>Payment Status : {bookingdata.status}</p> */}
                                    </div>
                                })
                            }</>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminBooking;