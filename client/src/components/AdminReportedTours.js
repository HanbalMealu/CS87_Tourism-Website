import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Icon, InlineIcon } from '@iconify/react';
import diffIgnored from '@iconify/icons-octicon/diff-ignored';
import AdminSidebar from './AdminSidebar'
import jwt_decode from 'jwt-decode'
class AdminReportedTours extends React.Component {
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
        fetch('http://localhost:5000/reportedtrips/tourlist')
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
      <div className="adminHeaders">Reported Tours List</div>
      <div className="message">
       <table class="table">

            <thead>
              <tr>
                <th>Tour ID</th>
                <th>Reporter</th>
                <th>reason</th>
                <th>View</th>
                <th>Delete</th>
                <th>Ignore</th>
                
                
              </tr>
            </thead>
        
        { this.state.trips.map(trip => 
          <tr>
            <td>{trip.id}</td>
            <td>{trip.reporter_email}</td>
            <td>{trip.reason}</td>
            <td>
                  <Link to= {{
                      pathname: "/toursDetail",
                      state:{
                        trip: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-eye"></i> View Tour
                    </button>
                    </Link>
            </td>
            <td>
                    <Link to= {{
                      pathname: "/adminDeletetrip",
                      state:{
                        adminDeleteTrip: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                    </Link>

            </td>
            <td>       <Link to= {{
                      pathname: "/admindeletetourreport",
                      state:{
                        adminDeleteTrip: trip
                    }
                    }}>
                    <button className="myPostCRUD">
                      <Icon icon={diffIgnored} /> Ignore
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
export default AdminReportedTours;
