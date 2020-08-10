import React, { Component } from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import baselineMiscellaneousServices from '@iconify/icons-ic/baseline-miscellaneous-services';
import baselineVerified from '@iconify/icons-ic/baseline-verified';
class cardsAAdmin extends Component {
  constructor() {
    super();
           this.state = {
            trips: [],
          users:[],
          services:[],
          feattrips:[],
          featservices:[]
            
  
          }
        }
        
        componentDidMount(){
          this.gettotalusers();
          this.gettotalservices();
          this.gettotaltrips();
          this.gettotalfeattrips();
          this.gettotalfeatservices();
        }
          gettotaltrips(){
            fetch('http://localhost:5000/trips/tripcount')
            .then(results=>results.json())
            .then(results=>this.setState({'trips':results}))
          }
          gettotalusers(){
            fetch('http://localhost:5000/users/usercount')
            .then(results=>results.json())
            .then(results=>this.setState({'users':results}))
          }
            gettotalservices(){
        fetch('http://localhost:5000/rentalservices/servicescount')
        .then(results=>results.json())
        .then(results=>this.setState({'services':results}))
      }
      gettotalfeatservices(){
        fetch('http://localhost:5000/featuredrentalservices/featservicecount')
        .then(results=>results.json())
        .then(results=>this.setState({'featservices':results}))
      }
      gettotalfeattrips(){
        fetch('http://localhost:5000/featuredtrips/feattourcount')
        .then(results=>results.json())
        .then(results=>this.setState({'feattrips':results}))
      }
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-4">
                <div className="card1">
                <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Total Users
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <i class="far fa-user"></i>
                      { this.state.users.map(user => 
                      <h4>{user.totalusers}</h4>
                      )}
                      </div>   
                      </div>
                      <div className="dashboardCardsLine"></div>
                      <div className="row">
                      <div className="cardsPara"><p>Total Users on Website</p></div>
                    </div>
                  
                </div>
              </div>
                  
              </div>
              
              <div className="col-4">
              <div class="card4">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                      Total Tours
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <i class="fa fa-plane"></i>
                      { this.state.trips.map(user => 
                      <h4>{user.totaltrips}</h4>
                      )}
                      </div>
                    </div>
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>List of All Tours</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
              <div class="card2">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Total Services
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <Icon icon={baselineMiscellaneousServices} />
                        { this.state.services.map(user => 
                      <h4>{user.totalservices}</h4>
                      )}
                      </div> 
                    </div>
                    
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>List of All Services</p></div>
                    </div>
                  </div>
                </div>
              </div>  
              </div>
              <br />
                    <div className="row">
                    <div className="col-4">
                <div className="card1">
                <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Premium Tours
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <i class="fas fa-credit-card "></i>
                      { this.state.feattrips.map(user => 
      <h4>{user.feattours}</h4>
      )}
                      </div>   
                      </div>
                      <div className="dashboardCardsLine"></div>
                      <div className="row">
                      <div className="cardsPara"><p>Total Premium Tour ads</p></div>
                    </div>
                  
                </div>
              </div>
                  
              </div>
              <div className="col-4">
              <div class="card4">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Premium Services
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <i class="fas fa-credit-card "></i>
                        { this.state.featservices.map(user => 
                      <h4>{user.featservices}</h4>
                      )}
                      </div> 
                    </div>
                    
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>Total premium Services</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
              <div class="card2">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Verified Users
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <Icon icon={baselineVerified} />
                        { this.state.featservices.map(user => 
                      <h4>{user.featservices}</h4>
                      )}
                      </div> 
                    </div>
                    
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>Total Verified Users</p></div>
                    </div>
                  </div>
                </div>
              </div>
            
                    </div> 
                    </div>
          
        )
    }
  
}
export default cardsAAdmin;