import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import DateRange from "@material-ui/icons/DateRange";
import WeekendSharpIcon from "@material-ui/icons/WeekendSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import { connect } from 'react-redux';
import axios from "axios";
import '../movie_details.css';

const Dashboard = (props) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const profile = location.state.profile;
    const name = location.state.name;
    const email = props.email;
    // const password = location.state.password;
    const mobile = location.state.mobile;
    const [userbookings, setuserbookings] = useState([]);

    useEffect(async() => {
        var res = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getbookings/${email}`,{
            headers:{
                'auth-token':token
            }
        });
        console.log("res",res);
        setuserbookings(res.data);

    }, [])
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
                            <Link to={{ pathname: "/homepage",state:{ profile: profile, name: name, email: email, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={{ pathname: "/dashboard",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/bookings",state:{ profile: profile, name: name, email: email, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Bookings</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/userprofile",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
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
            <div className="main-panel">
                <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div class="container-fluid">
                        <div class="navbar-wrapper">

                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>
                <div class="content">
                    <div class="container-fluid" id="dashboard">
                       {userbookings.length==0?<h1>No Bookings Available</h1>:<>
                        {
                            userbookings.map((data, index) => {
                                return <div class="row" key={index}>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="card card-stats">
                                            <div class="card-header card-header-warning card-header-icon">
                                                <div class="card-icon">
                                                    <i class="material-icons"><LocalMoviesIcon /></i>
                                                </div>
                                                <p class="card-category">Movie Name</p>
                                                <h3 class="card-title">{data.moviename}

                                                </h3>
                                            </div>
                                            <div class="card-footer">
                                                <div class="stats">
                                                    <i class="material-icons text-danger">warning</i>
                                                    Movie Name
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="card card-stats">
                                            <div class="card-header card-header-success card-header-icon">
                                                <div class="card-icon">
                                                    <i class="material-icons"><DateRange /></i>
                                                </div>
                                                <p class="card-category">Movie Date</p>
                                                <h3 class="card-title">{data.bookingdate}</h3>
                                            </div>
                                            <div class="card-footer">
                                                <div class="stats">
                                                    <i class="material-icons">date_range</i> Movie Date
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="card card-stats">
                                            <div class="card-header card-header-danger card-header-icon">
                                                <div class="card-icon">
                                                    <i class="material-icons"><WeekendSharpIcon /></i>
                                                </div>
                                                <p class="card-category">Ceat Number</p>
                                                <h3 class="card-title">{data.ceatnames}</h3>
                                            </div>
                                            <div class="card-footer">
                                                <div class="stats">
                                                    <i class="material-icons">local_offer</i> Ceat Number
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="card card-stats">
                                            <div class="card-header card-header-info card-header-icon">
                                                <div class="card-icon">
                                                    <i class="material-icons"><AttachMoneySharpIcon /></i>
                                                </div>
                                                <p class="card-category">Total Amount</p>
                                                <h3 class="card-title">{data.totalcost}</h3>
                                            </div>
                                            <div class="card-footer">
                                                <div class="stats">
                                                    <i class="material-icons">update</i> Total Amount
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }</>}
                    </div></div>
            </div>
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
export default connect(mapStateToProps)(Dashboard);