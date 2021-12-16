import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import '../movie_details.css'
import Card from "react-bootstrap/Card";
const Retrievefeedback = (props) => {
    const history = useHistory();
    // const location = useLocation();
    // const profile = location.state.profile;
    const name = props.name;
    const email = props.email;
    const mobile = props.mobile;
   
    const [data, setdata] = useState([]);
    useEffect(() => {
      getFeedback();
    }, [])
    const getFeedback = async()=>{
        const token = localStorage.getItem("token");
        var res =  await axios.get("https://bookmyshowback.herokuapp.com/movies/feedback",{
            headers:{
                "auth-token":token
            }
        });
        console.log("res",res);
        console.log(res.data);
       
        setdata(res.data);
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
                        <li className="nav-item active">
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
                        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>

                <div>
                   {Object.keys(data).length===0 ? <h1>No Feedback Available</h1>:<>
                    <h2 style={{ fontWeight: "bold", marginTop: '10vh',color:"red"}}>User Feedback</h2>
                    
                       {
                        data.map((datas) => {
                            return <div className="card" style={{ padding: "56px",minWidth: '500px',marginRight:"200px" }}>
                                <p>Username : {datas.name}</p>
                                <p>Email : {datas.email}</p>
                                <p>Feedback : {datas.feedback}</p>
                            </div>
                        })}
                        </>
                    }
                    
                </div>
            </div>
        </div>
    );
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
export default connect(mapStateToProps)(Retrievefeedback);