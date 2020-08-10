import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Styling/navbar.css';

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }
  adminlogOut(e) {
    e.preventDefault()
    localStorage.removeItem('admintoken')
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <div className="list"><button className="jo">Login</button></div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <div className="list"><button className="jo">Register</button></div>
          </Link>
        </li>
      </ul>
    )
    const adminLink=(
    <ul className="navbar-nav">
      <li className="nav-item">
         <div className="nav-link">
          <div class="dropdown">
            <div className="list">
              Admin  <i class='fa fa-caret-down'></i>
            </div>
            <div class="dropdown-content">
                <a>
                  <Link to="/adminDashboard" className="nav-link">
                    <div className="list">
                      Dashboard
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/adminInbox" className="nav-link">
                    <div className="list">
                      Mail Box
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/adminservices" className="nav-link">
                    <div className="list">
                      Services
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/admintours" className="nav-link">
                    <div className="list">
                      Tours
                    </div> 
                  </Link>
                </a>
                
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/adminreportedtours" className="nav-link">
                    <div className="list">
                      Reported Tours
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/adminreportedservices" className="nav-link">
                    <div className="list">
                      Reported Services
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/adminhotels" className="nav-link">
                    <div className="list">
                      Manage Hotels
                    </div> 
                  </Link>
                </a>
                <div className="lineTITLE"></div>
                <a>
                  <Link to="/addhotel" className="nav-link">
                    <div className="list">
                      Add Hotel
                    </div> 
                  </Link>
                </a>
            </div>
          </div>
         </div>
      </li>
      <li className="nav-item">
          <a href="!#" onClick={this.adminlogOut.bind(this)} className="nav-link">
            <div className="list">Logout</div>
          </a>
        </li> 
    </ul>
    )
    
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link">
          <div class="dropdown">
            <div className="list">
              Profile  <i class='fa fa-caret-down'></i>
            </div>
            <div class="dropdown-content">
              <a>
                <Link to="/profile" className="nav-link">
                  <div className="list">
                    Dashboard
                  </div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
              <a>
                <Link to="/PostTour" className="nav-link">
                  <div className="list">Post Tour</div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
              <a>
                <Link to="/PostRentalServices" className="nav-link">
                  <div className="list">Provide Services</div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
              <a>
                <Link to="/Inbox" className="nav-link">
                  <div className="list">Messages</div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
              <a>
                <Link to="/myreviews" className="nav-link">
                  <div className="list">Reviews</div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
              <a>
                <Link to="/editprofile" className="nav-link">
                  <div className="list">Edit Profile</div>
                </Link>
              </a>
              <div className="lineTITLE"></div>
            </div>
           </div>
          </div>
        </li>
        <li className="nav-item">
          <a href="!#" onClick={this.logOut.bind(this)} className="nav-link">
            <div className="list">Logout</div>
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-md">
        <Link to="/"><div className ="Logo">Road<a>2</a>Pakistan</div></Link>
        <button
          className="navbar-toggler ml-auto custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="toggler-icon"><i class="fa fa-bars"></i></div>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
                
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link to="/forum" className="nav-link">
              <div className="list">Forum</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/filteredtours" className="nav-link">
                <div className="list">Tours</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/filteredtools" className="nav-link">
              <div className="list">Equipments</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AdminHotelsListPage" className="nav-link">
              <div className="list">Hotels</div>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/filteredcameraman" className="nav-link">
              <div className="list">Photography</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/filteredaccomodations" className="nav-link">
              <div className="list">Paying Guest</div>
              </Link>
            </li><li className="nav-item">
              <Link to="/filteredvehicles" className="nav-link">
              <div className="list">Vehicles</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/filteredguides" className="nav-link">
              <div className="list">Guides</div>
              </Link>
              
            </li>
          </ul>
          {localStorage.admintoken ? adminLink :localStorage.usertoken? userLink :  loginRegLink}
          

        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
