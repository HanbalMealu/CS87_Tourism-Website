import React from 'react';
import { Link } from 'react-router-dom'
class MyService extends React.Component {
 constructor() {
  super();
         this.state = {
          services: []
        }
      }
      componentDidMount(){
        this.getservice();
      }
      getservice(){
        fetch('http://localhost:5000/users/myservices')
        .then(results=>results.json())
        .then(results=>this.setState({'services':results}))
      }

  render() {
    return (
      <div>
        <div className="message">
          <table class="table">
          <thead>
              <tr>
                <th>SERVICES</th>
                <th>POST DATE</th>
                <th>BOOST</th>
                <th>OPEN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
          { this.state.services.map(service => 
                <tr>
                  <a className="firstCol"><td>{service.title}</td></a>
                  <td>{new Date(service.posted).toLocaleDateString()}</td>
                  <td>
                  <Link to= {{
                      pathname: "/pricingPage",
                      state:{
                        type:'service',
                        details:service
                    }
                    }}>
                    <button className="myPostCRUD"><i class="fas fa-eye"></i> Feature</button>
                    </Link>
                  </td>
                  <td>
                    <Link to= {{
                      pathname: "/serviceDetail",
                      state:{
                        service: service
                    }
                    }}>
                    <button className="myPostCRUD"><i class="fas fa-eye"></i> View</button>
                    </Link>
                    </td>
                  <td>
                  <Link to= {{
                      pathname: "/editService",
                      state:{
                        services: service
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    </Link>
                  </td>
                  <td><Link to= {{
                      pathname: "/deleteService",
                      state:{
                        services: service
                    }
                    }}><button className="myPostCRUD"><i class="fas fa-trash"></i> Delete</button></Link></td>
                </tr>

            )}      
          </table>
        </div>
      </div>
    
  );
  }
}
export default MyService;