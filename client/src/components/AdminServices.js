import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
import jwt_decode from 'jwt-decode'
class AdminServices extends React.Component {
 constructor() {
  super();
         this.state = {
          services: []
        }
      }
      componentDidMount(){
        const token = localStorage.admintoken
        const decoded = jwt_decode(token)
        this.getservices();
      }
      getservices(){
        fetch('http://localhost:5000/rentalservices/allserviceslist')
        .then(results=>results.json())
        .then(results=>this.setState({'services':results}))
      }

  render() {
    return (
    <div className="postPage">
        <div className="row">
        <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
            <AdminSidebar />
          </div>
          <div className="col-lg-9 col-xl-9 col-sm-12 col-xs-12 col-md-12">
            <br/>
            <div className="container">
          <div className="adminHeaders">Services List</div>
          <div className="message">
       <table class="table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Title</th>
                <th>Email</th>
                <th>Post Added</th>
                <th>View      </th>
                <th>Delete</th>
                <th>Message</th>
                <th>Premium   </th>
                
              </tr>
            </thead>
        { this.state.services.map(service => 
          <tr> 
             <td>{service.id}</td> 
            <td>{service.title}</td>
            <td>{service.email}</td>          
            <td>{new Date(service.posted).toLocaleDateString()}</td>
            <td>
                  <Link to= {{
                      pathname: "/serviceDetail",
                      state:{
                        service: service
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-eye"></i> View
                    </button>
                    </Link>
            </td>
                  <td>
                    <Link to= {{
                      pathname: "/adminDeleteService",
                      state:{
                        adminDeleteService: service
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
                        users: service
                    }
                    }}>
                    <button className="myPostCRUD">
                    <Icon icon={baselineMessage} /> Message
                    </button>
                    </Link>
            </td>
            <td>
            <Link to= {{
                      pathname: "/addfeaturedservice",
                      state:{
                        FeaturedService: service
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-credit-card "></i>  premium
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
export default AdminServices;