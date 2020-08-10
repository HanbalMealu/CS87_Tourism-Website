import React, { Component } from 'react'
import './ToolsServicesDetails.css';
class AccomodationsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tool : {}
        };
    }

    componentWillMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <div class="imageBannerTools">
                   <h1>Accomodation</h1>
                </div>
                    <br />
                
                    <div>
    <div class="carousel">
        <ul class="slides">
            <input type="radio" name="radio-buttons" id="img-1" checked />
            <li class="slide-container">
                <div class="slide-image">
                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.pic1} alt="" />
                </div>
                <div class="carousel-controls">
                    <label for="img-3" class="prev-slide">
                        <span>&lsaquo;</span>
                    </label>
                    <label for="img-2" class="next-slide">
                      <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <input type="radio" name="radio-buttons" id="img-2" />
            <li class="slide-container">
                <div class="slide-image">
                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.pic2} alt="" />
                </div>
                <div class="carousel-controls">
                    <label for="img-1" class="prev-slide">
                        <span>&lsaquo;</span>
                    </label>
                    <label for="img-3" class="next-slide">
                        <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <input type="radio" name="radio-buttons" id="img-3" />
            <li class="slide-container">
                <div class="slide-image">
                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.pic3} alt="" />
                </div>
                <div class="carousel-controls">
                    <label for="img-2" class="prev-slide">
                        <span>&lsaquo;</span>
                    </label>
                    <label for="img-1" class="next-slide">
                        <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <div class="carousel-dots">
                <label for="img-1" class="carousel-dot" id="img-dot-1"></label>
                <label for="img-2" class="carousel-dot" id="img-dot-2"></label>
                <label for="img-3" class="carousel-dot" id="img-dot-3"></label>
            </div>
        </ul>
    </div>
</div>
<br />
                            
   

            <div className="container-fluid">
                <div className="row">
                <div className="col-xl-8 col-lg-8 col-sm-12 col-xs-12 col-md-12">
                    <div className="About">
                        <h2>About</h2>
                        <div className="container">
                        {this.props.location.state.trip.details}
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12 col-md-12">
                    <div className="row">
                        <div className="tripProfile">
                                <h4>Pricing: Rs.{this.props.location.state.trip.price}</h4>
                                <div className="line"></div>

                                    
                                    <div class="contactFlex">
                                            <div className="userPic">
                                                <img src={`http://localhost:5000/uploads/`+this.props.location.state.trip.dp} alt="" />
                                            </div>
                                            <div class="content">
                                                {this.props.location.state.trip.first_name} {this.props.location.state.trip.first_name}<br />
                                                <i class="fa fa-phone"></i> {this.props.location.state.trip.contact}<br />
                                                <span class="fa fa-star checked"></span> {this.props.location.state.trip.rating}
                                            </div>
                                    </div>
                                        <button className="chatNow">
                                        Chat Now <i class='fas fa-comment-alt' />   
                                        </button>
                                </div>
                    </div>

                            </div>
                        </div>
                    </div>
                    
            </div>
        )
    }
}
export default AccomodationsDetails;