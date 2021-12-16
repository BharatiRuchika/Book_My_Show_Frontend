import React from "react";
import {Route,Switch,useLocation,Redirect} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Signup1 from "./pages/signup1";
import Home from './pages/Home';
import HomePage from './component/home';
// import Admin from "./admin/admin";
import Dashboard from "./component/dashboard";
import MovieDetails from "./pages/movie_details";
import Bookingform from "./pages/booking_form";
import Ticketbookingform from './pages/ticket_booking_form';
import Successresponse from "./response/success_response";
import Booking from "./component/booking";
import  Userprofile  from "./component/user_profile";
import Feedback  from "./pages/feedback_page";
import Adminpage from "./admin/admin_page";
import  Movieupload  from './admin/movie_upload';
import MovieTheaterupload from './admin/movie_theater_upload';
import AddTheater from "./admin/theater_upload";
import AddMovie from "./admin/movie_upload";
import Movies from "./admin/movie";
import EditTheater from "./admin/edit_theater";
import EditMovie from "./admin/edit_movie";
import AdminBooking from './admin/admin_booking';
import Adminprofile from './admin/admin_profile';
import Retrievefeedback from './admin/retrieve_feedback';
import TheaterMovies from "./admin/theater_movies";
import Bookings from "./admin/bookings";
import HomeMovies from "./component/movies";
function PrivateRoute({ path, component: Comp }) {
  console.log(localStorage.getItem("token"));
  
  return (<Route exact path={path} render={(props) => {
    const isLoggedIn = localStorage.getItem("token");
    return isLoggedIn ? <Comp {...props} /> : <Redirect to={"/"}></Redirect>
  }} />)
}
function App() {
  
  return (
    <div>
      {/* <div style={{ padding: 50 }}></div> */}
      <BrowserRouter>
    
      <Switch>
        <Route exact path="/" component={Signup1}></Route>
        <PrivateRoute exact path="/homepage" component={HomePage}></PrivateRoute>
        <PrivateRoute exact path="/adminpage" component={Adminpage}></PrivateRoute>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/details" component={MovieDetails}></PrivateRoute>
        <PrivateRoute exact path="/bookingform" component={Bookingform}></PrivateRoute>
    <PrivateRoute exact path="/pickceat" component={Ticketbookingform}></PrivateRoute>
    <PrivateRoute exact path="/success" component={Successresponse}></PrivateRoute>
    <PrivateRoute exact path="/bookings" component={Booking}></PrivateRoute>
    <PrivateRoute exact path="/userprofile" component={Userprofile}></PrivateRoute>
    <PrivateRoute exact path="/feedback" component={Feedback}></PrivateRoute>
    
        <PrivateRoute exact path="/movieupload" component={Movieupload}></PrivateRoute>
        <PrivateRoute exact path="/movie_theater_upload" component={MovieTheaterupload}></PrivateRoute>
        <PrivateRoute exact path="/theater_upload" component={AddTheater}></PrivateRoute>
        <PrivateRoute exact path="/movie_upload/:id" component={AddMovie}></PrivateRoute>
        <PrivateRoute exact path="/movies/:id" component={HomeMovies}></PrivateRoute>
       {/* <Route exact path="/viewMovies" component={Movies}></Route> */}
       <PrivateRoute exact path="/viewMovies/:id" component={Movies}></PrivateRoute>
       <PrivateRoute exact path="/editTheater/:id" component={EditTheater}></PrivateRoute>
       <PrivateRoute exact path="/editMovie/:id/:theaterId" component={EditMovie}></PrivateRoute>
       <PrivateRoute exact path="/theater_movies/:id/" component={TheaterMovies}></PrivateRoute>
       <PrivateRoute exact path="/userbookings/:id/:thaterId/:moviename" component={Bookings}></PrivateRoute>
       <PrivateRoute exact path="/adminbooking" component={AdminBooking}>
         
          </PrivateRoute>
          <PrivateRoute exact path="/adminprofile" component={Adminprofile}>
            
          </PrivateRoute>
          <PrivateRoute exact path="/retrievefeedback" component={Retrievefeedback}>
          
          </PrivateRoute>
         
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
