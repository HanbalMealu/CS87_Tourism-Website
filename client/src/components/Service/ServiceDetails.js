import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from '../Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service : {},
            IsSameId:'no'
        };
    }

    componentWillMount() {
        console.log(this.props);
        if(localStorage.usertoken){
            const token = localStorage.usertoken
    const decoded = jwt_decode(token)
   if(decoded.id===this.props.location.state.service.touroperator_id)
   this.setState({
    IsSameId:'yes'     
    })
}
        const op_id={
            od:this.props.location.state.service.touroperator_id
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
        let{IsSameId}=this.state;
        const msgloggedin=(
            <Link to= {{
                pathname: "/messageUser",
                state:{
                    users: this.props.location.state.service
                }
                }}><button className="cardButton">
                Message User <i class='fas fa-comment-alt' />   
            </button></Link>
        ) 
        const rateloggedin=(
            <Link to= {{
                pathname: "/rateuserservice",
                state:{
                   review: this.props.location.state.service
                }
                }}><button className="cardButton">
                Rate This service <i class='fas fa-comment-alt' />   
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
                Rate This service <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const reportloggedin=(
            <Link to= {{
                pathname: "/reportservice",
                state:{
                    ReportedService: this.props.location.state.service
                }
                }}>
            <button className="cardButton">
                Report This Service <i class='fas fa-comment-alt' />   
            </button></Link>
        )
        const reportnotloggedin=(
            <Link to= {{
                pathname: "/login",
               
                }}><button className="cardButton">
                Report this Service <i class='fas fa-comment-alt' />   
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
                    <h1>Services</h1>
                </div>

                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="row">
                                    <div className="container">
                                    <div className="description"><p>Service Details</p></div>
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
                                        <p>{this.props.location.state.service.details}</p>
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-4 col-xl-4">
                            <div className="row">
                                <div className="otherDetails">
                                    <div className="description"><p>Pricing</p>
                                    <div className="cardBody">
                                        <h5>{this.props.location.state.service.title}</h5>
                                    </div>
                                    Location: {this.props.location.state.service.location}<br/>
                                    Pricing: Rs.{this.props.location.state.service.price}<br/>
                                    {localStorage.usertoken&&IsSameId==='no'? rateloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?adminlogin:ratenotloggedin}
                                    <div className="lineSided"></div>
                                    {localStorage.usertoken&&IsSameId==='no'? reportloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?adminlogin:reportnotloggedin}
                               
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <br />
                            <div className="row">
                                <div className="headerDashboard">
                                        
                                            <img src={`http://localhost:5000/uploads/`+this.props.location.state.service.dp} alt="Card image" />          
                                            <Link to= {{
                                            pathname: "/viewUser",
                                            state:{
                                                userPage: this.props.location.state.service
                                            }
                                            }}><p><i class='far fa-user'></i> {this.props.location.state.service.first_name} {this.props.location.state.service.last_name}{this.props.location.state.service.status==='verified'?verified:notverified}</p></Link>
                                            
                                            <p><i class='fas fa-envelope'></i> {this.props.location.state.service.email}<br />
                                            {this.props.location.state.service.gender}<br />
                                            
                                            <i class='fas fa-phone'></i> {this.props.location.state.service.contact}<br />
                                            <i class='far fa-star'></i> {this.props.location.state.service.rating}<br />
                                            </p>
                                            {localStorage.usertoken&&IsSameId==='no' ? msgloggedin:localStorage.usertoken&&IsSameId==='yes'? sameid:localStorage.admintoken?msgloggedin:msgnotloggedin}
                                        
                                       
                                </div>
                                
                            </div>       
                        </div>
                        <div className="lineSided"></div>
                        
                    </div>
                </div>
            <br />
            <Footer />
        </div>
        )
    }
}
export default ServiceDetails;