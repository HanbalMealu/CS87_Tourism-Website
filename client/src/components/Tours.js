import React from 'react';
import { Link } from 'react-router-dom'
class Tours extends React.Component {
 constructor() {
  super();
         this.state = {
          trips: [],
         
          

        }
      }
      
      componentDidMount(){
      this.gettrips();
    }
      
      gettrips(){
        fetch('http://localhost:5000/trips/featuredtourlist')
        .then(results=>results.json())
        .then(results=>this.setState({'trips':results}))
      }

      
  render() {
   
    return (
      <div className="tripDetailsPage">
        <div className="description1"><p>Featured Tours</p></div>
        <div className="container">
          <div className="row">
            
              { this.state.trips.map(accomodation => 
              <div className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 col-md-3">
                <div className="PostAll">
                  <div className="cardHead">
                     <img src={`http://localhost:5000/uploads/`+accomodation.pic} alt=" " />
                  </div>

                  <div className="container">
                    <div className="cardBody">
                    <div className="postDate"><i class='fas fa-clock'></i> {accomodation.days} Days Tour</div>
                      <h5>{accomodation.departure_city} to {accomodation.arrival_city}</h5>
                      <div className="dashboardCardsLine"></div>
                      <div className="row">
                        <div className="col-6">
                          <p>
                            Price<br/>
                            Contact<br/>
                            Rating<br/>
                          </p>
                        </div>
                        <div className="col-6">
                          <p>Rs. {accomodation.cost}/- <br />
                          {accomodation.contact}<br />
                          {accomodation.rating}</p>  
                        </div>
                        
                      </div>
 
                    </div>          
                  </div>   

                   <div className="cardBottom">
                   <Link to= {{
                      pathname: "/toursDetail",
                      state:{
                        trip: accomodation
                      }
                      }}>
                        <button className="cardButton">Details</button>
                    </Link>
                   </div>   
          </div>
         
          </div>
           
          )}
            </div>
      </div>
      </div>
  
  );
  }
}
export default Tours;
