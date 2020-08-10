import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {Link} from 'react-router-dom'
class UserHotels extends Component {
  constructor() {
    super()
    this.state = {
        Hotels:[],
       
      errors: {}
    }


  }
  componentDidMount() {

    this.gethotels()
  }
  gethotels(){
    fetch('http://localhost:5000/hotels/hotellist')
    .then(results=>results.json())
    .then(results=>this.setState({'Hotels':results}))
  }

    

render(){

return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          
            <h1 className="h3 mb-3 font-weight-normal">Hotels</h1>
            
       { this.state.Hotels.map(hotel=> 
                    
                    <tr>
                     <td><a >{hotel.name} </a>
                     </td>
                     <td><a >{hotel.price}</a>
                     </td>
                     
                     <td>
                     <a >{hotel.city}</a></td>
                   
                 
                
             
                     </tr>
                  
                   )}
           
          
        </div>
      </div>
    </div>
  )

}
}

export default UserHotels
