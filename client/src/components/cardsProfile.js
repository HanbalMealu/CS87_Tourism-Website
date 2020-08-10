import React, { Component } from 'react'

 class cardsProfile extends Component {
    constructor() {
    
        super();
             this.state = {
              users: [],
      }
      }
      componentDidMount() {
       this.getuser();
      }
      getuser(){
        fetch('http://localhost:5000/users/profile')
        .then(results=>results.json())
        .then(results=>this.setState({'users':results}))
      }
    render() {
        return (
            <div className="container">
                { this.state.users.map(user=> 
                <div className="row">
                <div className="col-3">
                <div className="card1">
                <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Total Reviews
                      </div>
                      <div className="col-lg-4 col-xl-4 col-md-12 col-xs-12 col-sm-12">
                      <i class="far fa-star"></i>
                      <h4>{user.total_reviews} </h4>
                      </div>   
                      </div>
                      <div className="dashboardCardsLine"></div>
                      <div className="row">
                        <div className="cardsPara"><p>Someone left reviews about you</p></div>
                    </div>
                  
                </div>
              </div>
                  
              </div>
              <div className="col-3">
                <div class="card2">
                  <div class="container">
                    <div className="row">
                    <div className="col-8">
                    Average Rating
                    </div>
                    <div className="col-lg-4 col-xl-4 col-md-12 col-xs-12 col-sm-12">
                    <i class="far fa-heart"></i>
                    <h4>{user.rating}</h4>
                    </div>
                       
                    </div>
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"> <p>Someone give ratings to you</p></div>
                    </div>
                  </div>
                </div>
                  
              </div>
              <div className="col-3">
              <div class="card3">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                      Total Tours
                      </div>
                      <div className="col-lg-4 col-xl-4 col-md-12 col-xs-12 col-sm-12">
                        <i class="fa fa-list"></i>
                        <h4>{user.total_tours}</h4>
                      </div>
                    </div>
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>You have posted some tours</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
              <div class="card4">
                  <div class="container">
                    <div className="row">
                      <div className="col-8">
                        Total Services
                      </div>
                      <div className="col-lg-4 col-xl-4 col-md-12 col-xs-12 col-sm-12">
                        <i class="fas fa-check"></i>
                        <h4>{user.total_services}</h4>
                      </div> 
                    </div>
                    
                    <div className="dashboardCardsLine"></div>
                    <div className="row">
                    <div className="cardsPara"><p>You have posted some services</p></div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
                )}
                
            </div>
        )
    }
}
export default cardsProfile