import React, { Component } from 'react'
import "./ToursDetails.css";
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from '../Footer'
import {Link} from 'react-router-dom'
import Weather from '../weather/MainWeather'
class ToursDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip : {},
            IsSameId:'no'
               };
    }

    componentWillMount() {
        console.log(this.props);
        if(localStorage.usertoken){
            const token = localStorage.usertoken
    const decoded = jwt_decode(token)
   if(decoded.id===this.props.location.state.trip.touroperator_id)
   this.setState({
    IsSameId:'yes'     
    })
        }
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
    render() {
        let {IsSameId}=this.state;
        const msgloggedin=(
            <Link to= {{
                pathname: "/messageUser",
                state:{
                    users: this.props.location.state.trip
                }
                }}><button className="cardButton">
                Message User <i class='fas fa-comment-alt' />   
            </button></Link>
        ) 
        const rateloggedin=(
            <Link to= {{
                pathname: "/rateusertour",
                state:{
                    review: this.props.location.state.trip
                }
                }}><button className="cardButton">
                Rate This Tour <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const msgnotloggedin=(
            <Link to= {{
                pathname: "/login",
            }}>
                <button className="cardButton">
                Message User <i class='fas fa-comment-alt' />   
            </button></Link>
        )   
        const ratenotloggedin=(
            <Link to= {{
                pathname: "/login",
               
                }}><button className="cardButton">
                Rate This Tour <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const reportloggedin=(
            <Link to= {{
                pathname: "/reporttrip",
                state:{
                    ReportedTour: this.props.location.state.trip
                }
                }}>
            <button className="cardButton">
                Report This Tour <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const reportnotloggedin=(
            <Link to= {{
                pathname: "/login",
               
                }}><button className="cardButton">
                Report this Tour <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const adminlogin=(
            <a></a>
        )
        const sameid=(
            <a></a>
        )
        const verified=(
            <i class='fas fa-check-circle'></i>
          )
          const notverified=(
            <a></a>
          )
        return (
            
            <div className="tripDetailsPage">
                    <div class="imageBanner">
                             <h1>Go Around Pakistan</h1>
                    </div>

                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-xl-8 col-xs-12 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="container">
                                    <div className="description"><p>Trip Details</p></div>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.pic} alt=" " />
                                            </div>
                                        
                                    </div>
                                </div>
                                <div className="lineSided"></div>
                                <div className="row">
                                    <div className="description"><p>Description</p></div>
                                    <div className="descriptionDetails">
                                        <p>{this.props.location.state.trip.details}</p>
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className="col-lg-4 col-xl-4 col-xs-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="otherDetails">
                                    <div className="description"><p>{this.props.location.state.trip.days} Days Tour</p></div>
                                    
                                    Pricing: Rs.{this.props.location.state.trip.cost}
                                    <p>Departure City: {this.props.location.state.trip.departure_city}</p>
                                    <p>Departure Date: {new Date(this.props.location.state.trip.departure_date).toLocaleDateString()}</p>
                                    <div className="lineSided"></div>
                                    <p>Arrival City: {this.props.location.state.trip.arrival_city}</p>
                                    <p>Return Date: {new Date(this.props.location.state.trip.return_date).toLocaleDateString()}</p>
                                  
                                    {localStorage.usertoken&&IsSameId==='no'? rateloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?adminlogin:ratenotloggedin}
                                    <div className="lineSided"></div>
                                    {localStorage.usertoken&&IsSameId==='no'? reportloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?adminlogin:reportnotloggedin}
                                </div>
                            </div>
                            
                            <br />
                            <div className="row">
                            <div className="headerDashboard">
                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.dp} alt=" " />          
                                        <Link to= {{
                                            pathname: "/viewUser",
                                            state:{
                                                userPage: this.props.location.state.trip
                                            }
                                            }}><p><i class='far fa-user'></i> {this.props.location.state.trip.first_name} {this.props.location.state.trip.last_name}{this.props.location.state.trip.status==='verified'?verified:notverified}</p>
                                            </Link>
                                        <p>{this.props.location.state.trip.gender}<br />
                                        <i class='fas fa-envelope'></i> {this.props.location.state.trip.email}<br />
                                        <i class='fas fa-phone'></i> {this.props.location.state.trip.contact}<br />
                                        <i class='far fa-star'></i> {this.props.location.state.trip.rating}<br />
                                        </p>
                                        

                                        {localStorage.usertoken&&IsSameId==='no' ? msgloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?msgloggedin:msgnotloggedin}
                                        {<br></br>}
                                        <div className="lineSided"></div>
                                         <Link to= {{
                                            pathname: "/weatherreport",
                                            state:{
                                                arrival: this.props.location.state.trip
                                            }
                                            }}><button className='cardButton'><h6><i class='fa fa-cloud'></i>Check Weather</h6></button>
                                            </Link>
                                </div>
                            </div>       
                        </div>

                        <div className="lineSided"></div>
                      
                        
                    </div>
             
            </div>
           
            <Footer />
        </div>
        )
    }
}

export default ToursDetail;