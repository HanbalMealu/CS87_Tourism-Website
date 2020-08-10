import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AdminSidebar from './AdminSidebar' 
import jwt_decode from 'jwt-decode'
class AdminHotels extends Component {
  constructor() {
    super()
    this.state = {
        Hotels:[],
       
      errors: {}
    }


  }
  componentDidMount() {
  
      const token = localStorage.admintoken
    const decoded = jwt_decode(token)
    
    this.gethotels()
  }
  gethotels(){
    fetch('http://localhost:5000/hotels/hotellist')
    .then(results=>results.json())
    .then(results=>this.setState({'Hotels':results}))
  }

    

render(){

return (
    <div>
      <div className="row">
      <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
          <AdminSidebar />
      </div>
      <div className="col-lg-9 col-xl-9 col-sm-12 col-xs-12 col-md-12">
          <br/>
          <div className="container">
        <div className="adminHeaders">
          Hotels
        </div>
        <div className="message">
         <table class="table">

            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Price</th>
                <th>View</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
       
       { this.state.Hotels.map(hotel=> 
                    
                    <tr>
                     <td><a >{hotel.name} </a>
                     </td>
                     <td>
                     <a >{hotel.city}</a></td>
                   
                     <td><a >Rs {hotel.price}/-</a>
                     </td>
                     
                     <td>
                     <Link to= {{
          pathname: "/hotelsDetail",
          state:{
            service: hotel
          }
          }}><button className="myPostCRUD">View</button></Link>
                     </td>
                     
                     <td>
                     <Link to= {{
          pathname: "/deletehotel",
          state:{
            Hotel: hotel
          }
          }}><button className="myPostCRUD">Delete</button></Link>
                     </td>

                      <td><Link to= {{
          pathname: "/edithotel",
          state:{
            Hotel: hotel
          }
          }}><button className="myPostCRUD">Edit</button></Link></td>
             
                     </tr>
                  
                   )}
           
           </table>
           </div>
           </div>
        </div>
      </div>
    </div>
  )

}
}

export default AdminHotels
