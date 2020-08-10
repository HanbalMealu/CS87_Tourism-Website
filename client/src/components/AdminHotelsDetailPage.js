import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import Footer from './Footer'
import { Icon, InlineIcon } from '@iconify/react';
import parkingIcon from '@iconify/icons-fa-solid/parking';
import swimmerIcon from '@iconify/icons-fa-solid/swimmer';
import babyCarriage from '@iconify/icons-fa-solid/baby-carriage';
import airConditioner from '@iconify/icons-mdi/air-conditioner';
import roomServiceOutline from '@iconify/icons-mdi/room-service-outline';
import fridgeFill from '@iconify/icons-ri/fridge-fill';
import bedSingle from '@iconify/icons-mdi/bed-single';
import bedSharp from '@iconify/icons-ion/bed-sharp';
import "react-responsive-carousel/lib/styles/carousel.min.css";
class AdminHotelsDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service : {},
        };
    }

    componentWillMount() {
        console.log(this.props);
    
}
    render() {
    
        return (
            <div className="tripDetailsPage">
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-xl-8 col-sm-12 col-md-12 col-xs-12">
                                <div className="row">
                                    <div className="container">
                                    <div className="description"><p>Details</p></div>
                                    <div class="carousel-wrapper">
                                        <Carousel infiniteLoop useKeyboardArrows autoPlay>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.pic} alt=" " />
                                            </div>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.pic1}  alt=" " />
                                            </div>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.pic2}  alt=" " />
                                            </div>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.pic3}  alt=" " />
                                            </div>
                                            <div className="imgText">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.pic4}  alt="" />
                                            </div>
                                        </Carousel>
                                    </div>
                                        
                                    </div>
                                </div>
                                <div className="lineSided"></div>
                                <div className="row">
                                    <div className="description"><p>Description</p></div>
                                    <div className="descriptionDetails">
                                        <p><h6>Address and Other Details:</h6>{this.props.location.state.service.details}<br/><br/>
                                            <div className="row">
                                            <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12 col-xs-12">
                                            <table class="table">
                                            <thead>
                                            <tr>
                                                <th>Amenities</th>
                                                <th>Availability</th>
                                            </tr>
                                            </thead>
                                            <tr>
                                                <td><Icon icon={parkingIcon} /> Parking</td>
                                                <td>{this.props.location.state.service.free_parking}</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fa fa-wifi"></i> Internet</td>
                                                <td>{this.props.location.state.service.internet}</td>
                                            </tr>
                                            <tr>
                                                <td><i class='fas fa-shield-alt'></i> Security</td>
                                                <td>{this.props.location.state.service.security}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={swimmerIcon} />  Pool</td>
                                                <td>{this.props.location.state.service.pool}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={babyCarriage} /> Child Care</td>
                                                <td>{this.props.location.state.service.children_activities}</td>
                                            </tr>
                                            </table>
                                            </div>
                                            
                                            <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12 col-xs-12">
                                            <table class="table">
                                            <thead>
                                            <tr>
                                                <th>Amenities</th>
                                                <th>Availability</th>
                                            </tr>
                                            </thead>
                                            <tr>
                                                <td><Icon icon={airConditioner} /> Conditioner</td>
                                                <td>{this.props.location.state.service.air_conditioning}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={roomServiceOutline} /> Service</td>
                                                <td>{this.props.location.state.service.room_service}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={fridgeFill} /> Fridge</td>
                                                <td>{this.props.location.state.service.fridge}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={bedSingle} /> Single Bed</td>
                                                <td>{this.props.location.state.service.single_bed}</td>
                                            </tr>
                                            <tr>
                                                <td><Icon icon={bedSharp} /> Double Bed</td>
                                                <td>{this.props.location.state.service.double_bed}</td>
                                            </tr>
                                        </table>
                                        </div>    
                                            </div>      
                                        </p>
                                        
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className="col-lg-4 col-xl-4 col-sm-12 col-md-12 col-xs-12">
                            <div className="row">
                                <div className="otherDetails">
                                    <div className="description"><p>Pricing</p>
                                    <div className="cardBody">
                                        <h5>{this.props.location.state.service.name}</h5>
                                    </div>
                                    Location: {this.props.location.state.service.city}<br/>
                                    Pricing: Rs.{this.props.location.state.service.price}<br/>
                                    <div className="lineSided"></div>
                               
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <br />
                        </div>
                        <div className="lineSided"></div>
                        
                    </div>
                </div>
                <br/>
                <Footer/>
        </div>
        )
    }
}
export default AdminHotelsDetailPage;