import React,{useState} from "react";
import axios from "axios";
import { useHistory, useLocation, Link } from 'react-router-dom'
function AddTheater(){
    const history = useHistory();
    const [theatername, settheatername] = useState('');
    const [theaterstate, settheaterstate] = useState('');
    const [theatercity, settheatercity] = useState('');
    const [theaterowner, settheaterowner] = useState('');
   
    const theaterUpload = async()=>{
        console.log(theatername,theaterowner);
        const token = localStorage.getItem("token");
        var res = await axios.post("https://bookmyshowback.herokuapp.com/theater/addtheater",{
            theatername,theaterowner,theaterstate,theatercity
        },{
            headers:{
                'auth-token':token
            }
        })
        // console.log("res",res);
        if(res.status==200){
            settheaterowner("");
            settheatername("");
            settheatercity("");
            settheaterstate("");
            console.log("res",res);
            history.push("/movie_theater_upload");
            // history.push(`/movie_upload/${res.data._id}`)
        }
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
                        <Link to={{ pathname: "/adminpage" }} className="nav-link">
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
                        <Link to={{ pathname: "/adminbooking"}} className="nav-link">
                            <i className="material-icons">content_paste</i>
                            <p>Retrieve Bookings</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link to={{ pathname: "/adminprofile"}} className="nav-link">
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
                    <button class="navbar-toggler" id="upload" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                    </button>

                </div>
            </nav>
           
            <div className="main-panel">
           
                <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'max-content', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-50%", marginTop: "inherit" }}>
                <h2 className="upload-font" style={{ fontWeight: "bold" }}>Upload Theater</h2>
                <br />
                <input type="text" placeholder="Theater name" value={theatername} onChange={(e) => settheatername(e.target.value)} />
                <input type="text" placeholder="Theater Owner Name" value={theaterowner} onChange={(e) => settheaterowner(e.target.value)} />
                <input type="text" placeholder="Theater City Name" value={theatercity} onChange={(e) => settheatercity(e.target.value)} />
                <input type="text" placeholder="Theater State Name" value={theaterstate} onChange={(e) => settheaterstate(e.target.value)} />
              <input type="button" style={{ background: "#ff4b2b", color: "white" }} value="Upload Theater" onClick={theaterUpload} />  
                      
                    </form>
                </div>
            </div>
        </div>
    </div>
)

    
       
               
                /* <input type="text" placeholder="Theater name" value={theatername} onChange={(e) => settheatername(e.target.value)} />
                <input type="text" placeholder="Theater Owner Name" value={theaterowner} onChange={(e) => settheaterowner(e.target.value)} />
                <input type="text" placeholder="Theater Location" value={theaterlocation} onChange={(e) => settheaterlocation(e.target.value)} />
              <input type="button" style={{ background: "#ff4b2b", color: "white" }} value="Upload Theater" onClick={theaterUpload} /> */
           

    
}
export default AddTheater;