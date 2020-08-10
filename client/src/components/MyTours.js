import React from 'react';
import { Link } from 'react-router-dom'
class MyTours extends React.Component {
  constructor() {
    super();
           this.state = {
            mytrips: []
          }
        }
        componentDidMount(){
          this.gettrips();
        }
        gettrips(){
          fetch('http://localhost:5000/users/mytours')
          .then(results=>results.json())
          .then(results=>this.setState({'mytrips':results}))
        }

  render() {
   
    return (
   
    <div>
      <div className="message">
        <table class="table">
            <thead>
              <tr>
                <th>TOURS</th>
                <th>POST DATE</th>
                <th>BOOST</th>
                <th>OPEN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            { this.state.mytrips.map(trip => 
                <tr>
                  <a className="firstCol"><td>{trip.departure_city} to {trip.arrival_city}</td></a>
                  <td>{new Date(trip.posted).toLocaleDateString()}</td>
                  <td>
                  <Link to= {{
                      pathname: "/pricingPage",
                      state:{
                        type:'trip',
                        details:trip
                    }
                    }}>
                    <button className="myPostCRUD"><i class="fas fa-eye"></i> Feature</button>
                    </Link>
                  </td>
                  <td>
                    <Link to= {{
                      pathname: "/toursDetail",
                      state:{
                        trip: trip
                    }
                    }}>
                    <button className="myPostCRUD"><i class="fas fa-eye"></i> View</button>
                    </Link>
                    </td>
                  <td>
                    <Link to= {{
                      pathname: "/toursEdit",
                      state:{
                        trip: trip
                    }
                    }}>
                      <button className="myPostCRUD"><i class="fas fa-edit"></i> Edit</button>
                      </Link>  
                    </td>
                  <td>
                  <Link to= {{
                      pathname: "/deleteTour",
                      state:{
                        trip: trip
                    }
                    }}>
                      <button className="myPostCRUD"><i class="fas fa-trash"></i> Delete</button>
                     </Link> 
                  </td>
                </tr>

            )}  
        </table> 
        </div>                
        </div>        
  );
  }
}
export default MyTours;
