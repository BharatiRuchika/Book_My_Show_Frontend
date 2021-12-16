import axios from 'axios';
import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import '../movie_details.css';
import { connect } from 'react-redux';
const Feedback = (props) => {
    // const profile = props.profile;
    // const password = props.password;
    const token = localStorage.getItem("token");
    console.log("props",props);
    const name1 = props.name;
    const mobile1 = props.mobile;
    const email1 = props.email;
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = props.email;
    const mobile = location.state.mobile;
    const [feedback, setfeedback] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name1 === "" || email1 === "" || feedback === "") {
            alert("please enter feedback");
        } else {
            var res = await axios.post("https://bookmyshowback.herokuapp.com/theater/feedback",{name1,email,feedback},{
                headers:{
                    'auth-token':token
                }
            });
            console.log("res",res);
if(res.status==200){
    alert("feedback submitted successfully");
    setfeedback("");
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
                            <Link to={{ pathname: "/homepage",state:{ profile: profile, name: name, email: email, mobile: mobile1 } }} className="nav-link">
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
                        <li className="nav-item active">
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
                        <button className="navbar-toggler" id="navbar" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>
                <div class="form-container sign-in-container" className="feedback-form" style={{
                    position: "absolute",
                    top: "0px", height: 'inherit', left: '-110px', width: '32%', zIndex: 2, marginLeft: '10%', marginTop: '9%'
                }}>
                    <form className="feedback" style={{
                        background: '#f6f5f7', display: "flinline flow-root list-item",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "0 50px",
                        height: "100%",
                        textAlign: "center",
                        width: "max-content"
                    }}>
                        <h1 style={{
                            fontWeight: "bold",
                            marginTop: "150px",
                            fontSize: "2em",
                            color:"red"
                        }}>Give Your Feedback</h1>
                        <span></span>
                        <br />
                        <input type="text" placeholder="Username" value={name} style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin: "8px 0",
                            width: "100%"
                        }} />
                        <input type="text" placeholder="email" value={email} style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin: "8px 0",
                            width: "100%"
                        }} />
                        <textarea placeholder="Give feedback" value={feedback} onChange={(e) => setfeedback(e.target.value)} style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin: "8px 0",
                            width: "100%"
                        }} />
                        <br />
                        <button style={{
                            borderRadius: "100px",
                            border: "1px solid #ff4b2b",
                            backgroundColor: "#ff4b2b",
                            color: "#ffffff",
                            fontSize: "12px",
                            fontWeight: "bold",
                            padding: "12px 45px",
                            letterSpacing: "1px",
                            textTransform: "uppercase"
                        }} onClick={handleSubmit}>Submit</button>
                    </form>
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
        password:state.password,
        mobile:state.mobile
    }
}
export default connect(mapStateToProps)(Feedback);