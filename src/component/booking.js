import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import '../movie_details.css';
export const Booking = (props) => {
    const token = localStorage.getItem("token");
    const profile = props.profile;
    const name = props.name;
    const email = props.email;
    const mobile = props.mobile;
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
                            <Link to={{ pathname: "/homepage",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/dashboard",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item active ">
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
                            <Link to={{ pathname: "/feedback",state:{ profile: profile, name: name, email: email, mobile: mobile }}} className="nav-link" >
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
                        <button class="navbar-toggler" id="table-nav" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Bookings</h4>
                                        <p className="card-category" id="card-category">Movie Bookings Appear Here</p>
                                    </div>
                                    {userbookings.length==0?<h1>No bookings Available</h1>:<>
                                    <div className="card-body" id="movie-table-card">
                                        <div className="table-responsive" id="movie-table">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <th>
                                                        Booking Date
                                                    </th>
                                                    <th>
                                                        Movie Name
                                                    </th>
                                                    <th>
                                                        Ceats Available
                                                    </th>
                                                    <th>
                                                        Movie Date
                                                    </th>

                                                </thead>
                                                <tbody>
                                                    {
                                                        userbookings.map((data, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    {data.currentdate}
                                                                </td>
                                                                <td>
                                                                    {data.moviename}
                                                                </td>
                                                                <td>
                                                                    {data.totalceats}
                                                                </td>
                                                                <td>
                                                                    {data.bookingdate}
                                                                </td>

                                                            </tr>
                                                        })
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
export default connect(mapStateToProps)(Booking);