import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
import jwt_decode from 'jwt-decode'

class AdminTours extends React.Component {
 constructor() {
  super();
         this.state = {
          trips: [],
        }
      }
      
      componentDidMount(){
        const token = localStorage.admintoken
        const decoded = jwt_decode(token)

      this.gettrips();
    }
      
      gettrips(){
        fetch('http://localhost:5000/trips/tourlist')
        .then(results=>results.json())
        .then(results=>this.setState({'trips':results}))
      }

      
  render() {
   
    return (
   
    <div className="postPage">
        <div className="row">
        <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
          <AdminSidebar />
      </div>
      <div className="col-lg-9 col-xl-9 col-sm-12 col-xs-12 col-md-12">
      <br />
      <div className="container">
      <div className="adminHeaders">Tours List</div>
      <div className="message">
       <table class="table">

            <thead>
              <tr>
                <th>Tour ID</th>
                <th>Email</th>
                <th>Post Added</th>
                <th>View</th>
                <th>Delete</th>
                <th>Message</th>
                <th>Premium      </th>
                
              </tr>
            </thead>
        
        { this.state.trips.map(trip => 
          <tr>
            <td>{trip.id}</td>
            <td>{trip.email}</td>
            <td>{new Date(trip.posted).toLocaleDateString()}</td> 
            <td>
                  <Link to= {{
                      pathname: "/toursDetail",
                      state:{
                        trip: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-eye"></i>View
                    </button>
                    </Link>
            </td>
            <td>
                    <Link to= {{
                      pathname: "/adminDeleteTrip",
                      state:{
                        adminDeleteTrip: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                    </Link>

            </td>
            <td>
                  <Link to= {{
                      pathname: "/messageUser",
                      state:{
                        users: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <Icon icon={baselineMessage} /> Message
                    </button>
                    </Link>
            </td>
            <td>
                  <Link to= {{
                      pathname: "/addfeaturedtour",
                      state:{
                        FeaturedTour: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-credit-card "></i>  Premium
                    </button>
                    </Link>
            </td>
            </tr>
          )}
        </table>
        </div>
      </div>
                    </div>
        </div>
    </div>
  );
  }
}
export default AdminTours;
