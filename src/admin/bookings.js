import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect,useState} from "react";
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function Bookings() {
    var params = useParams();
    var history = useHistory();
    const token = localStorage.getItem("token");
    const [shows,setShows] = useState([]);
    const [users,setUsers] = useState([]);
    useEffect(()=>{
       getUsers();
    },[])
    const getUsers = async()=>{
      var id = params.id;
      var movie_name = params.moviename;
      var show_res = await axios.get(`https://bookmyshowback.herokuapp.com/show/getshows/${id}`,{
        headers:{
          'auth-token':token
        }
      });
      console.log("res",show_res);
      setShows(show_res.data);
      var users = await axios.get(`https://bookmyshowback.herokuapp.com/movies/getuserbookings/${movie_name}`,{
        headers:{
          'auth-token':token
        }
      });
      console.log("users",users);
      setUsers(users.data);

    }
  return (
    <>
    <h1 style={{color:"red",marginLeft:"300px",marginTop:'30vh',marginBottom:"20px"}}>User Bookings</h1>
      {shows.map((show)=>{
        return(
          <>
         <span style={{fontSize:"20px",fontWeight:"bold",}}>{show.startTime}</span>-<span style={{fontSize:"20px",fontWeight:"bold"}}>{show.endTime}</span><br/><br/>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>UserName</TableCell>
               <TableCell align="right">Mobile</TableCell>
               <TableCell align="right">Movie Name</TableCell>
               <TableCell align="right">Booking Date</TableCell>
               <TableCell align="right">Movie Watchers</TableCell>
               <TableCell align="right">Ceat Names</TableCell>
               <TableCell align="right">Total Cost</TableCell>
             </TableRow>
           </TableHead>
           {users.map((user)=>{
              if(user.show==show.startTime){
                return(
                    <TableBody>
                       <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
               <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.mobile}</TableCell>
              <TableCell align="right">{user.moviename}</TableCell>
              <TableCell align="right">{user.bookingdate}</TableCell>
              <TableCell align="right">{user.moviewatchers}</TableCell>
              <TableCell align="right">{user.ceatnames}</TableCell>
              <TableCell align="right"><b>${user.totalcost}</b></TableCell>
            </TableRow> 
          </TableBody>)}})}
     </Table></TableContainer></>)})}
     <input type="button" style={{width:"200px",marginLeft:"300px"}} onClick={()=>{history.push("/adminpage")}} value="Back"  id="con-select" />
     </>)
  }
