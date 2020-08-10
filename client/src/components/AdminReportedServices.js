import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import diffIgnored from '@iconify/icons-octicon/diff-ignored';
import AdminSidebar from './AdminSidebar';
import jwt_decode from 'jwt-decode'
class AdminReportedServices extends React.Component {
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
        fetch('http://localhost:5000/reportedservices/servicelist')
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
            <br />
            <div className="container">
          <div className="adminHeaders">Reported Services List</div>
          <div className="message">
       <table class="table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Title</th>
                <th>Reporter</th>
                <th>View      </th>
                <th>Delete</th>
                <th>Ignore</th>
              </tr>
            </thead>
        { this.state.services.map(service => 
          <tr> 
             <td>{service.id}</td> 
            <td>{service.title}</td>
            <td>{service.reporter_email}</td>          
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
                      pathname: "/admindeleteservicereport",
                      state:{
                        admindeleteservicereport: service
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
export default AdminReportedServices;