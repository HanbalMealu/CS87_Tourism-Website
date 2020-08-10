import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Join from './components/Join'
import ToursDetail from './components/Tours/ToursDetail'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import PostTour from './components/PostTour'
import Profile from './components/Profile'
import AdminServices from './components/AdminServices'
import AdminUsers from './components/AdminUsers'
import AdminHotelsListPage from './components/AdminHotelsListPage'
import AdminTours from './components/AdminTours'
import AdminDashboard from './components/AdminDashboard'
import ToolsDetail from './components/Services/ToolsDetail'
import ServiceDetails from './components/Service/ServiceDetails'
import CameramanDetails from './components/Services/CameramanDetails';
import AccomodationsDetails from './components/Services/AccomodationsDetails';
import VehiclesDetails from './components/Services/VehiclesDetails';
import GuidesDetails from './components/Services/GuidesDetails'
import Tours from './components/Tours'
import Accomodations from './components/Accomodations'
import Tools from './components/Tools'
import Inbox from './components/Inbox'
import Sent from './components/Sent'
import NewMsg from './components/NewMsg'
import PostRentalServices from './components/PostRentalServices'
import Cameraman from './components/Cameraman'
import Vehicles from './components/Vehicles'
import RateUserService from './components/RateUserService'
import RateUserTour from './components/RateUserTour'
import AddFeaturedTour from './components/AddFeaturedTour'
import AddFeaturedService from './components/AddFeaturedService'
import AdminListUserPage from './components/UserPageFromAdminList'
import EditTour from './components/EditTour'
import EditService from './components/EditService'
import MyReviews from './components/MyReviews'
import Guides from './components/Guides'
import MYTOUR from './components/MyTours'
import MYSERVICE from './components/MyServices'
import EDITPROFILE from './components/EditProfile'
import FILCam from './components/FilteredCameraman'
import FILAcc from './components/FilteredAccomodations'
import FILGuide from './components/FilteredGuides'
import FILTOOL from './components/FilteredTools'
import FITTour from './components/FilteredTours'
import FILVehicle from './components/FilteredVehicles'
import AdminReportedTours from './components/AdminReportedTours'
import AdminReportedServices from './components/AdminReportedServices'
import ReportService from './components/ReportService'
import AdminDeleteTourReport from './components/AdminDeleteTourReport'
import AdminDeleteServiceReport from './components/AdminDeleteServiceReport'
import EditReview from './components/EditReview'
import DeleteReview from './components/DeleteReview'
import DeleteTour from './components/DeleteTour'
import ReportTrip from './components/ReportTrip'
import AdminVerifyUser from './components/AdminVerifyUser'
import DeleteService from './components/DeleteService'
import AdminDeleteUsers from './components/AdminDeleteUsers'
import AdminDeleteServices from './components/AdminDeleteServices'
import AdminDeleteTours from './components/AdminDeleteTours'
import WebUsers from './components/UserPage'
import MessageUser from './components/MessageUser'
import AdminNew from './components/AdminNew'
import AdminInbox from './components/AdminInbox'
import AdminSent from './components/AdminSent'
import AllComposeMessages from './components/AllComposeMessages'
import Forum from './components/Forum'
import PostDetails from './components/PostDetails'
import pricingPage from './components/pricingPage'
import AddHotel from './components/AddHotel'
import AdminHotels from './components/AdminHotels'
import Hotels from './components/Hotels'
import EditHotel from './components/EditHotel'
import DeleteHotel from './components/DeleteHotel'
import hotelsDetail from './components/AdminHotelsDetailPage' 
import MainWeather from './components/weather/MainWeather'
import ForumNew from './components/ForumNew'
import contactAdminPay from './components/ContactAdminPay'
import NotFoundPage from './components/NotFoundPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/contactAdminPay" component={contactAdminPay} />
          <Route exact path="/pricingPage" component={pricingPage} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/hotelsDetail" component={hotelsDetail} />
            <Route exact path="/AdminHotelsListPage" component={AdminHotelsListPage} />
            <Route exact path="/allMessages" component={AllComposeMessages} />
            <Route exact path="/adminNew" component={AdminNew} />
            <Route exact path="/adminInbox" component={AdminInbox} />
            <Route exact path="/adminSent" component={AdminSent} />
            <Route exact path="/messageUser" component={MessageUser} />
            <Route exact path="/" component={Landing} />
            
            <Route exact path="/viewUser" component={WebUsers} />
            <Route exact path="/reporttrip" component={ReportTrip} />
            <Route exact path="/reportservice" component={ReportService} />
            <Route exact path="/weatherreport" component={MainWeather} />
            <Route exact path="/editReview" component={EditReview} />
            <Route exact path="/deleteReview" component={DeleteReview} />
            <Route exact path="/addfeaturedtour" component={AddFeaturedTour} />
            <Route exact path="/addfeaturedservice" component={AddFeaturedService} />
            <Route exact path="/deleteService" component={DeleteService} />
            <Route exact path="/deleteTour" component={DeleteTour} />
            <Route exact path="/toursEdit" component={EditTour} />
            <Route exact path="/adminlistviewUser" component={AdminListUserPage} />
            <Route exact path="/editService" component={EditService} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/postTour" component={PostTour} />
            <Route exact path="/hotels" component={Hotels} />\
            <Route exact path="/adminhotels" component={AdminHotels} />
            <Route exact path="/PostRentalServices" component={PostRentalServices} />
            <Route exact path="/tours" component={Tours} />
            <Route exact path="/addhotel" component={AddHotel} />
            <Route exact path="/toursDetail" component={ToursDetail} />
            <Route exact path="/serviceDetail" component={ServiceDetails} />    
            <Route exact path="/accomodations" component={Accomodations}/>
            <Route exact path="/tools" component={Tools} />
            <Route exact path="/cameraman" component={Cameraman} />  
            <Route exact path="/myreviews" component={MyReviews} />  
            <Route exact path="/rateuserservice" component={RateUserService} />  
            <Route exact path="/rateusertour" component={RateUserTour} /> 
            <Route exact path="/vehicles" component={Vehicles} />  
            <Route exact path="/guides" component={Guides} />    
            <Route exact path="/newMsg" component={NewMsg} />       
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/postdetails" component={PostDetails} />
            <Route exact path="/adminDashboard" component={AdminDashboard} />
            <Route exact path="/adminservices" component={AdminServices} />
            <Route exact path="/admintours" component={AdminTours} />
            <Route exact path="/adminreportedtours" component={AdminReportedTours} />
            <Route exact path="/adminreportedservices" component={AdminReportedServices} />
            <Route exact path="/admindeletetourreport" component={AdminDeleteTourReport} />
            <Route exact path="/admindeleteservicereport" component={AdminDeleteServiceReport} />
            <Route exact path="/adminusers" component={AdminUsers} />
            <Route exact path="/adminDeleteService" component={AdminDeleteServices} />
            <Route exact path="/adminverifyuser" component={AdminVerifyUser} />
            <Route exact path="/adminDeleteTrip" component={AdminDeleteTours} />
            <Route exact path="/adminDeleteUser" component={AdminDeleteUsers} />
            <Route exact path="/filteredcameraman" component={FILCam} />
            <Route exact path="/filteredaccomodations" component={FILAcc} />
            <Route exact path="/filteredguides" component={FILGuide} />
            <Route exact path="/filteredtools" component={FILTOOL} />
            <Route exact path="/filteredtours" component={FITTour} />
            <Route exact path = "/filteredvehicles" component={FILVehicle} />
            <Route exact path="/mytours" component={MYTOUR} />
            <Route exact path="/myservices" component={MYSERVICE} />
            <Route exact path="/editprofile" component={EDITPROFILE} />  
            <Route exact path="/sent" component={Sent} />         
            <Route exact path="/toolDetails" component={ToolsDetail} />
            <Route exact path="/accomodationDetails" component={AccomodationsDetails} />
            <Route exact path="/guideDetails" component={GuidesDetails} />
            <Route exact path="/vehicleDetails" component={VehiclesDetails} />
            <Route exact path="/cameramanDetails" component={CameramanDetails} />
            <Route exact path="/edithotel" component={EditHotel} />
            <Route exact path="/deletehotel" component={DeleteHotel} />
            <Route exact path="/newpost" component={ForumNew} />
            <Route path='/youtube' component={() => { 
                window.location.href = 'https://www.youtube.com/channel/UCBJKzXZ7fOgAi9nXosbA8KQ/featured'; 
                return null;
            }}/>          
            <div className="lineFull"></div>
        </div>
      </Router>
    )
  }
}

export default App
