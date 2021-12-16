import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import { connect } from 'react-redux';
// import fire from '../files/firebase';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import '../movie_details.css';
import axios from "axios";
 const Movieupload = (props) => {
    const [image, setimage] = useState('');
    const [moviename, setmoviename] = useState('');
    const [ticketcost, setticketcost] = useState('')
    const [description, setdescription] = useState('');
    const [actorname, setactorname] = useState('');
    const [directorname, setdirectorname] = useState('');
    const [releasedate, setreleasedate] = useState('');
    const [outdate, setoutdate] = useState('');
    const [video, setvideo] = useState('');
    const [value, onChange] = useState('10:00');
    const [format, setformat] = useState('');
    const [next, setnext] = useState(false);
   
    const [inputList, setInputList] = useState([{ starttime: "",endtime:""}]);
    const [showList,setShowList] = useState([]);
    const history = useHistory();
  const params = useParams();
  console.log("params",params);
  const id = params.id;
  console.log("id",id);
    const profile = props.profile;
    const name = props.name;
    const email = props.email;
    const mobile = props.mobile;
    const showTimingUpload = ()=>{
        console.log("upload time");
    }
   useEffect(()=>{
      getShows();
   },[])
   const getShows = async()=>{
    const token = localStorage.getItem("token");
       var response = await axios.get(`https://bookmyshowback.herokuapp.com/show/getallshows/${params.id}`,{
           headers:{
               'auth-token':token
           }
       })
       console.log("res",response);
       setShowList(response.data);
   }
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
    
      const handleAddClick = () => {
        setInputList([...inputList, { starttime:"",endtime:""}]);
      };
    const movieUpload = async(e) => {
        e.preventDefault();
        console.log("inputList",inputList.length);
        if (image === "" || video === "" || moviename === "" || description === "" || actorname === "" || directorname === "" || releasedate === "" || outdate === "",inputList.length<1) {
            alert("please fill all fields");
        } else 
            if(releasedate<outdate){
               alert("release date should be greater than outdate");
            }
        else{
           
            var flag = 0;
            inputList.map((shows)=>{
                showList.map((show)=>{
                    if(shows.starttime==show){
                        flag=1;
                        alert(`${shows.starttime} is already assign to one of the movie.`)
                    }
                })
            })
            if(flag==0){
            const token = localStorage.getItem("token");
            console.log("token",token);
            var res = await axios.post("https://bookmyshowback.herokuapp.com/movies/postmovies",{
                id,image,video,moviename,description,actorname,directorname,releasedate,outdate,ticketcost
            },{
                headers:{
                    'auth-token':token
                }
            })
            console.log("response",res);
            if(res.status==200){

                var movieId = res.data.response._id;
                console.log(res.data.response._id);
                var showres = await axios.post("https://bookmyshowback.herokuapp.com/show/postshows",{
                    inputList:inputList,movieId
                },{
                    headers:{
                        'auth-token':token
                    }
                })
                console.log("showres",showres);
                if(showres.data==="success"){
                    alert("Movie Added Successfully");
                    history.push("/movie_theater_upload")
                }
            }
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
               
                    <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'min-content', zIndex: 2, marginLeft: '33%', marginTop: '5%' }}>
                  
                        <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-90%", marginTop: "inherit" }}>
                            <h2 className="upload-font" style={{ fontWeight: "bold" }}>Upload Theater Movies</h2>
                            <br />
                            <input type="text" placeholder="movie image url" value={image} onChange={(e) => setimage(e.target.value)} />
                            <input type="text" placeholder="movie viedo url" value={video} onChange={(e) => setvideo(e.target.value)} />
                            <input type="text" placeholder="Movie name" value={moviename} onChange={(e) => setmoviename(e.target.value)} />
                            <input type="number" placeholder="Ticket Cost" value={ticketcost} onChange={(e) => setticketcost(e.target.value)} />
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
                            <input type="text" placeholder="Actor Name" value={actorname} onChange={(e) => setactorname(e.target.value)} />
                            <input type="text" placeholder="Director Name" value={directorname} onChange={(e) => setdirectorname(e.target.value)} />
                            <label style={{color:"black"}}>Select Release Date</label>
                            <input type="date" placeholder="Pick release Date" value={releasedate} onChange={(e) => setreleasedate(e.target.value)} />
                            <label style={{color:"black"}}>Select Out Date</label>
                            
                            <input type="date" placeholder="Pick out Date" value={outdate} onChange={(e) => setoutdate(e.target.value)} />
                         <label style={{color:"black"}}>Format</label>   
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" name="format"placeholder="select format" value={format} onChange={(e)=>setformat(e.target.value)}>
            <option value="2d">2D</option>
            <option value="3d">3D</option>
            </select>
            {inputList.map((x, i) => {
           return (<div className="box">
            <label style={{color:"black",marginLeft:"100px"}}>Select Show's Times</label><br/>
           <b>From</b>
                <TimePicker
                   id="firststarttime"
                   inputReadOnly
                   showSecond={false}
                   use24Hours
                   onChange={(value) =>{ console.log('New time is: ', value)
                   const list = [...inputList];
                   list[i]["starttime"] = value;
                   setInputList(list);
                   }}
                  />
                  <b>To</b>
                  <TimePicker
                   id="firststarttime"
                   inputReadOnly
                   showSecond={false}
                   use24Hours
                   onChange={(value) =>{ console.log('New time is: ', value)
                   const list = [...inputList];
                   list[i]["endtime"] = value;
                   setInputList(list);
                   }}
                  />
                    <div className="btn-box">
                    {inputList.length - 1 === i && <button  onClick={handleAddClick} className="mr10">Add</button>}
                 {inputList.length !== 1 && <button
                  style={{marginLeft:"10px"}} 
                   onClick={() => handleRemoveClick(i)}>Remove</button>}
               <br/>
                
               </div>
                </div>
               
                 );
                })}
         <input type="button" style={{ background: "#ff4b2b", color: "white",marginTop:"10px" }} value="Upload Movie" onClick={movieUpload} />
                        </form>
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
            password:state.password,
            mobile:state.mobile
        }
    }
export default connect(mapStateToProps)(Movieupload);