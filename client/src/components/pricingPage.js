import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import roundCheck from '@iconify/icons-ic/round-check';
import twotoneFeaturedPlayList from '@iconify/icons-ic/twotone-featured-play-list';
class pricingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            details : {},
            type:{}
           
            }
              
              }
    render() {
        return (
            <div className="postPage">
                <div className="container">
                    <div className="row">
                            
                        <div className="container">
                        <div className="dashBoardHeadings">Pricing Plans</div>
                    
                        <div className="planPrice">
                            <br/>
                            <div className="row">
                                <div className="col-12"><Icon icon={roundCheck} /> Get your post on Home Page </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-12"><Icon icon={roundCheck} /> Packages Available for multiple days</div>
                            </div>
                            <br/>
                            <div className="lineFull"></div>
                            <div className="container">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12"><h5><Icon icon={twotoneFeaturedPlayList} /> Feature Ads Packages</h5></div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-lg-10 col-xl-10 col-sm-12 col-md-12 col-sm-12">
                                        <div className="discussCard">
                                            <div className="row">
                                                <h6>Gold Deal</h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-10"><p>Feature Ad for 10 days</p></div>
                                                <div className="col-2"><p>Rs 1,500</p></div> 
                                            </div>
                                            <div className="lineFull"></div>
                                            <div className="row">
                                            <div className="col-12"><a><Icon icon={roundCheck} /> Reach up to 10 times more audience</a>   
                                            <Link to= {{
                pathname: "/ContactAdminPay",
                    state:{
                      type:this.props.location.state.type,
                      details:this.props.location.state.details,
                      package:'Gold Deal (10 Days)',
                      price: 'PKR 1,500'
                      }
                }}><button className="cardButton">
                Request this Deal <i class='fas fa-comment-alt' />   
            </button></Link></div><br/>
                                            
                                            </div>
                                        </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                    <div className="col-lg-10 col-xl-10 col-sm-12 col-md-12 col-sm-12">
                                        <div className="discussCard">
                                            <div className="row">
                                                <h6>Silver Deal</h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-10"><p>Feature Ad for 7 days</p></div>
                                                <div className="col-2"><p>Rs 1,000</p></div> 
                                            </div>
                                            <div className="lineFull"></div>
                                            <div className="row">
                                            <div className="col-12"><a><Icon icon={roundCheck} /> Reach up to 6 times more audience</a>
                                            <Link to= {{
                pathname: "/ContactAdminPay",
                    state:{
                      type:this.props.location.state.type,
                      details:this.props.location.state.details,
                      package:'Silver Deal (7 Days)',
                      price: 'PKR 1,000'
                      }
                }}><button className="cardButton">
                Request this Deal <i class='fas fa-comment-alt' />   
            </button></Link></div><br/>
                                            </div>
                                        </div>
                                        </div>
                                        
                                    </div>


                                    <div className="row">
                                    <div className="col-lg-10 col-xl-10 col-sm-12 col-md-12 col-sm-12">
                                        <div className="discussCard">
                                        <div className="row">
                                                <h6>Bronze Deal</h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-10"><p>Feature Ad for 3 days</p></div>
                                                <div className="col-2"><p>Rs 750</p></div> 
                                            </div>
                                            <div className="lineFull"></div>
                                            <div className="row">
                                            <div className="col-12"><a><Icon icon={roundCheck} /> Reach up to 2 times more audience</a>
                                            <Link to= {{
                pathname: "/ContactAdminPay",
                    state:{
                      type:this.props.location.state.type,
                      details:this.props.location.state.details,
                      package:'Bronze Deal (3 Days)',
                      price:'PKR 750'
                      }
                }}><button className="cardButton">
                Request this Deal <i class='fas fa-comment-alt' />   
            </button></Link></div><br/>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default pricingPage;
