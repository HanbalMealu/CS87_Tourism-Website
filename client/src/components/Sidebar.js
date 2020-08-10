import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import roundClose from '@iconify/icons-ic/round-close';

class Sidebar extends Component {
 
  operation(){
      document.getElementById("a").style.display = 'block'
  }
  operation1(){
    document.getElementById("a").style.display = 'none'
  }
      
      render() {

        return (
                <div>
                  <br />
                
                <div className="dashboardSmallMenu">
                  <div className="row">
                    <div className="col-10">
                      <h6>Dashboard Navigation</h6>
                    </div>
                    <div className="col-2">
                        <div className="dashboardBaricon"
                      onClick={()=> this.operation()}>
                      <i className="fa fa-bars"></i></div>
                    </div>
                  </div>
                  </div>
                <div class="topnav" id="a">
                <div className="menuList">
                  <div className="closeSmallMenu">
                      <a href="#home">
                        <div className="dashboardBaricon" onClick={()=> this.operation1()}>
                          <Icon icon={roundClose} /> Close
                        </div>
                      </a>
                    </div>
                <Link to='/'>
                  <a href="#home"><i class="fa fa-fw fa-home"></i> Main Page</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/profile'>
                  <a href="#home"><i class="far fa-sun"></i> Dashboard</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/Inbox'>
                  <a href="#home"><i class="far fa-sun"></i> Mail Box</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to="/PostRentalServices">
                  <a href="#postServices"><i class="fa fa-cog"></i> Post Services</a>
                </Link> 
                <div className="lineFullss"></div>
                <Link to="/PostTour">
                  <a href="#postingTour"><i class="fas fa-plane"></i>  Post Tour</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to="/editprofile">
                  <a href="#contact"><i class="fas fa-edit"></i> Edit Profile</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to="/myreviews"><a href="#contact"><i class="fas fa-star"></i> Reviews</a></Link>
                <div className="lineFullss"></div>
                </div></div>
                <br />
                
              </div>
        )
    }
}
export default Sidebar;