import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import baselineReport from '@iconify/icons-ic/baseline-report';
import baselineAddCircleOutline from '@iconify/icons-ic/baseline-add-circle-outline';
import baselineMessage from '@iconify/icons-ic/baseline-message';
import roundClose from '@iconify/icons-ic/round-close';
class AdminSidebar extends Component {
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
                      <div className="dashboardBaricon" onClick={()=> this.operation()}>
                        <i className="fa fa-bars"></i>
                      </div>
                    </div>
                  </div>
                  </div>
             <div class="topnav" id="a">
                  <div className="closeSmallMenu">
                    <a href="#home">
                      <div className="dashboardBaricon" onClick={()=> this.operation1()}>
                        <Icon icon={roundClose} /> Close
                      </div>
                    </a>
                  </div>
                  
              <Link to='/adminDashboard'>
                  <a href="#home"><i class="far fa-sun"></i> Dashboard</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to="/adminInbox">
                <a href="#home"><Icon icon={baselineMessage} /> MailBox</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/'>
                  <a href="#home"><i class="fa fa-fw fa-home"></i> Main Page</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to="/admintours">
                  <a><i class="fa fa-eye"></i> View Tours</a>
                </Link> 
                <div className="lineFullss"></div>
                <Link to="/adminservices">
                  <a><i class="fas fa-eye"></i> View Services</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/adminreportedtours'>
                  <a href="#home"><Icon icon={baselineReport} /> Reported Tours</a>
                </Link><div className="lineFullss"></div>
                <Link to='/adminreportedservices'>
                  <a href="#home"><Icon icon={baselineReport} /> Reported Services</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/adminhotels'>
                  <a href="#home"><i class="fa fa-eye"></i> View Hotels</a>
                </Link>
                <div className="lineFullss"></div>
                <Link to='/addhotel'>
                  <a href="#home"><Icon icon={baselineAddCircleOutline} /> Add Hotel</a>
                </Link>
                

                
              </div>

                
            </div>
        )
    }
}
export default AdminSidebar;