import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Icon, InlineIcon } from '@iconify/react';
import twotoneMailOutline from '@iconify/icons-ic/twotone-mail-outline';
import outlineContactPhone from '@iconify/icons-ic/outline-contact-phone';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import baselineStarRate from '@iconify/icons-ic/baseline-star-rate';
import baselineVerified from '@iconify/icons-ic/baseline-verified';
import './Styling/admindashboard.css'
class UserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userPage: {},
            trips:[],
            services:[],
            reviews:[]
        }
    };
    componentWillMount(){
        console.log(this.props);
        this.getusertours();
        this.getuserservices();
        this.getuserreviews();
      }
      sendid(){
         const op_id={
            od:this.props.location.state.trip.touroperator_id
        }
        axios.post('/users/getopid',op_id,
        {
            
        })
            .then(res => {
                if(res.data.status==="success"){
                    this.props.toggle();
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      getusertours(){
        fetch('http://localhost:5000/users/usertours')
        .then(results=>results.json())
        .then(results=>this.setState({'trips':results}))
      }
      getuserservices(){
        fetch('http://localhost:5000/users/userservices')
        .then(results=>results.json())
        .then(results=>this.setState({'services':results}))
      }
      getuserreviews(){
        fetch('http://localhost:5000/users/userreviews')
        .then(results=>results.json())
        .then(results=>this.setState({'reviews':results}))
      }
    
    render() {
      const msgloggedin=(
        <Link to= {{
          pathname: "/messageUser",
          state:{
            users: this.props.location.state.userPage
          }
          }}><button className="myPostCRUD">Contact Now</button></Link>
      )
     
      const msgnotloggedin=(
        <Link to= {{
          pathname: "/login",
          
          }}><button className="myPostCRUD">Contact Now</button></Link>
      )
      const verified=(
        <Icon icon={baselineVerified} />
      )
      const notverified=(
        <a></a>
      )
     
        return (
            <div>
                <div className="lineFull"></div>
                <br/>
                <div className="container">
                    <div className="row">
                      <div className="col-lg-4 col-xl-4 col-xs-12 col-sm-12 col-md-12">
                        <div className="row">
                          <div className="userInfoSection">
                           <div className="row">
                              <div className="userDp">
                                  <img src={`http://localhost:5000/uploads/`+this.props.location.state.userPage.dp} class="rounded-circle" alt=" " />        
                              </div>
                           </div>
                             
                                <div className="userPageName">
                                <h6>{this.props.location.state.userPage.first_name}{this.props.location.state.userPage.last_name} {this.props.location.state.userPage.status==='verified'?verified:notverified}</h6>
                                </div>
                                <div className="lineFull"></div>
                              
                                {localStorage.usertoken?msgloggedin:localStorage.admintoken?msgloggedin:msgnotloggedin}
                                
                                <div className="container">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="row"><div className="userPageInfo"><Icon icon={baselinePerson} />  Active Since</div></div>
                                      <div className="row"><div className="userPageInfo"><Icon icon={twotoneMailOutline}/>  Email</div></div>
                                      <div className="row"><div className="userPageInfo"><Icon icon={outlineContactPhone}/>  Mobile Number</div> </div>
                                      <div className="row"><div className="userPageInfo"><Icon icon={baselineStarRate}/>  Rating</div></div>
                                    </div>
                                    <div className="col-6">
                                      <div className="row"><div className="userPageInfo">{new Date(this.props.location.state.userPage.created).toLocaleDateString()}</div>     </div>
                                      <div className="row"><div className="userPageInfo">{this.props.location.state.userPage.email}</div></div>
                                      <div className="row"><div className="userPageInfo">{this.props.location.state.userPage.contact}</div></div>
                                      <div className="row"><div className="userPageInfo">{this.props.location.state.userPage.rating}</div></div>
                                    </div>
                                  </div>
                                </div>
                              
                              
                          </div>
                        </div>
                      </div>
                      
                        { this.state.trips.map(trip => 
                        <div className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 col-md-4">
                        <div className="PostAll">
                            <div className="cardHead">
                                <img src={`http://localhost:5000/uploads/`+trip.pic} alt=" " />
                            </div>
                            <div className="container">
                              <div className="cardBody">
                                <div className="postDate"><i class='fas fa-clock'></i> {trip.days} Days Tour</div>
                                <h5>{trip.departure_city} to {trip.arrival_city}</h5>
                                <div className="dashboardCardsLine"></div>
                                <p>{trip.cost}<br />
                                    {trip.contact}<br />
                                    {trip.rating}</p>
                              </div>          
                            </div>
                            
                            <div className="cardBottom">
                            <Link to= {{
                                pathname: "/toursDetail",
                                state:{
                                    trip: trip
                                }
                                }}>
                                    <button className="cardButton">Details</button>
                                </Link>
                            </div>

                        
                        </div>
                        </div>    
                        )}
                        
                                      
                        
           { this.state.services.map(service => 
                <div className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 col-md-4">
                <div className="PostAll">
                  <div className="cardHead">
                    <img src={`http://localhost:5000/uploads/`+service.pic} alt=" " />
                  </div>

                  <div className="container">
                    <div className="cardBody">
                    <div className="postDate"><i class='fas fa-clock'></i> Posted On: {new Date(service.posted).toLocaleDateString()}</div>
                      <h5>{service.title}</h5>
                      <div className="dashboardCardsLine"></div>
                      <p>{service.location}<br />
                         {service.price}<br />
                         {service.contact}<br />
                         {service.rating}<br /></p>

                          </div>          
                        </div>   

                        <div className="cardBottom">
                        <Link to= {{
                            pathname: "/serviceDetail",
                            state:{
                              service: service
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
                            
                            <br/>

                        <div className="row">
                            <div className="container">
                            <div className="userReviewSection">
                              <h6>Reviews of Audience </h6><Icon icon={baselineStarRate}/>{this.props.location.state.userPage.rating} (1843)
                            <br />
                            </div>
                              {this.state.reviews.map(review => 
                                    <div className="reviewBox">
                                      <div className="lineFull"></div>
                                      <img class="rounded-circle" src={`http://localhost:5000/uploads/`+review.dp} alt=""/><h6> {review.first_name} {review.last_name}</h6> <Icon icon={baselineStarRate}/>{review.rating}
                                      <br/>{review.review}
                                    <p>Published on {new Date(review.posted).toLocaleDateString()}</p>
                                    <br/>
                                    </div>
                                  )}
                            </div>
                        </div>
                              </div>

        )
    }
}
export default UserPage;