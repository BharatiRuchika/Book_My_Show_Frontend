
    import React, { useEffect, useState } from 'react'
    import { useHistory, useLocation, Link } from 'react-router-dom';
    import '../profile.css';
    import TimePicker from 'react-time-picker';
    
    import { connect } from 'react-redux';
    // import fire from '../files/firebase';
    import { useParams } from 'react-router';
    import Button from '@mui/material/Button';
    import '../movie_details.css';
    import axios from "axios";
import { ConstructionOutlined } from '@mui/icons-material';
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
        const [inputList, setInputList] = useState([]);
        const [previousinputList, setPreviousInputList] = useState([]);
        const history = useHistory();
        const params = useParams();
        const profile = props.profile;
        const name = props.name;
        const email = props.email;
        const mobile = props.mobile;
        useEffect(()=>{
            getMovie();
        },[])
        useEffect(()=>{
           console.log("inputList",inputList);
        },[inputList])
      
        async function getMovie(){
            const token = localStorage.getItem("token");
              var id = params.id;
              var res = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getmovie/${id}`,{
                  headers:{
                      'auth-token':token
                  }
              });
              console.log("res",res);
            if(res.status==200){
                var movieId = res.data[0]._id;
                var showres = await axios.get(`https://bookmyshowback.herokuapp.com/show/getshows/${movieId}`,{
                    headers:{
                        'auth-token':token
                    }
                });
                console.log("showres",showres);
                 setInputList(showres.data);
                 setPreviousInputList(showres.data);
                console.log("inputList",inputList);
             }
            setimage(res.data[0].movieimage);
            setmoviename(res.data[0].moviename);
            setticketcost(res.data[0].ticketcost);
            setdescription(res.data[0].description);
            setactorname(res.data[0].actorname);
            setdirectorname(res.data[0].directorname);
            setreleasedate(res.data[0].releasedate);
            setoutdate(res.data[0].outdate);
            setvideo(res.data[0].videourl);
            setformat(res.data[0].movieimage);
            }
        const showTimingUpload = ()=>{
            console.log("upload time");
        }
        const handleRemoveClick = index => {
            const list = [...inputList];
            list.splice(index, 1);
            setInputList(list);
          };
        
          const handleAddClick = () => {
            setInputList([...inputList,{}]);
          };
        const movieUpload = async(e) => {
            const token = localStorage.getItem("token");
            e.preventDefault();
            console.log("in[putList",inputList.length);
            if (image === "" || video === "" || moviename === "" || description === "" || actorname === "" || directorname === "" || releasedate === "" || outdate === "",inputList.length<1) {
                alert("please fill all fields");
            } else {
                var id = params.id;
                var theaterId = params.theaterId
                var res = await axios.put("https://bookmyshowback.herokuapp.com/movies/editmovie",{
                    id,theaterId,image,video,moviename,description,actorname,directorname,releasedate,outdate,ticketcost
                },{
                    headers:{
                        'auth-token':token
                    }
                })
                console.log("response",res);
                if(res.status==200){
                    var movieId = params.id;;
                    // console.log(res.data.response._id);
                    console.log("inpulist",inputList)
                    var showres = await axios.put("https://bookmyshowback.herokuapp.com/show/editshows",{
                        inputList:inputList,movieId:movieId,previousinputList:previousinputList
                    },{
                        headers:{
                            'auth-token':token
                        }
                    })
                    console.log("showres",showres);
                    if(showres.data==="success"){
                        alert("Movie Updated Successfully");
                        history.push("/movie_theater_upload")
                    }
                }
        }
        }
        return (
        <div class="form-container sign-in-container" className="movie-container" style={{ height: 'auto', left: '0', width: 'max-content', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                      
        <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-50%", marginTop: "inherit" }}>
        <h2 className="upload-font" style={{ fontWeight: "bold", background: "#ff4b2b", color: "white" }}>Upload Theater Movies</h2>
            <br />
        <input type="text" placeholder="movie image url" value={image} onChange={(e) => setimage(e.target.value)} />
         <input type="text" placeholder="movie viedo url" value={video} onChange={(e) => setvideo(e.target.value)} />
         <input type="text" placeholder="Movie name" value={moviename} onChange={(e) => setmoviename(e.target.value)} />
                                <input type="text" placeholder="Ticket Cost" value={ticketcost} onChange={(e) => setticketcost(e.target.value)} />
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
                                <input type="text" placeholder="Actor Name" value={actorname} onChange={(e) => setactorname(e.target.value)} />
                                 <input type="text" placeholder="Director Name" value={directorname} onChange={(e) =>{
                                    console.log(e.target.value);
                                    setdirectorname(e.target.value)}} />
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
                       value={x.startTime}
                       onChange={(value) =>{ console.log('New time is: ', value)
                       const list = [...inputList];
                       list[i]["startTime"] = value;
                       setInputList(list); 
                 }}
                      />
                      <b>To</b>
                      <TimePicker
                       id="firststarttime"
                       inputReadOnly
                       showSecond={false}
                       use24Hours
                       value={x.endTime}
                       onChange={(value) =>{ console.log('New time is: ', value)
                       const list = [...inputList];
                       list[i]["endTime"] = value; 
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
             <input type="button" style={{ background: "#ff4b2b", color: "white",marginTop:"10px" }} value="Update Movie" onClick={movieUpload} />
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
    export default connect(mapStateToProps)(Movieupload);  