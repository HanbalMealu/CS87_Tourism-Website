import React, { Component } from 'react'
import './Styling/dashboard.css';
import {Link} from 'react-router-dom'
import MyTours from './MyTours'
import MyServices from './MyServices'
import Cards from './cardsProfile'
import Sidebar from './Sidebar'
import { Icon, InlineIcon } from '@iconify/react';
import twotoneMailOutline from '@iconify/icons-ic/twotone-mail-outline';
import outlineContactPhone from '@iconify/icons-ic/outline-contact-phone';
import baselinePerson from '@iconify/icons-ic/baseline-person';
import baselineStarRate from '@iconify/icons-ic/baseline-star-rate';
import baselineVerified from '@iconify/icons-ic/baseline-verified';
class Profile extends Component {
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
      <div className="dashboardContainer">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-xs-12 col-sm-12">
              <div className="row">
              <div className="headerDashboard">
              { this.state.users.map(user=>
              <div>
                   <img src={`http://localhost:5000/uploads/`+user.dp} />          
                    <div className="row">
                      <div className="col-6">
                          <p><i class='far fa-user'></i> Name<br/>
                          <Icon icon={outlineContactPhone} /> Contact<br/>
                          <Icon icon={twotoneMailOutline} /> Email</p>
                      </div>
                      <div className="col-6">
                        <p>{user.first_name} {user.last_name}<br/>
                        {user.contact}<br/>
                        {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6"><Link to="/editprofile"><button className="myPostCRUD">Update Info</button></Link></div>
                      <div className="col-3"></div>
                    </div>
                    <br></br>
              </div>
              )}
              </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9">
                <br />
                <div className="cardDashboard">
                <div className="row">
                  <Cards />
                </div>
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-lg-3 col-xl-3 col-sm-12 col-md-12 col-xs-12">
                <Sidebar />
              </div>
                <div className="col-xl-9 col-lg-9 col-12">
                  <div className="container">
                  <div className="notifyDashBoard">
                    <MyTours /><br />
                    <MyServices />
                  </div>
                  </div>
                </div>
              
          </div>
      </div>
    )
  }
}

export default Profile
