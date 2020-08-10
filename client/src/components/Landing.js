import React, { Component } from 'react'
import Tools from './Tools'
import Tours from './Tours'
import Cameraman from './Cameraman'
import Accomodation from './Accomodations'
import Guide from './Guides'
import Vehicle from './Vehicles'
import './Styling/landing.css'
import Footer from './Footer'
class Landing extends Component {
  render() {
    return (
        <div className="tripDetailsPage">
          <div className="bodyLand">
          <div class="webBanner">
            
          </div>
            <div className="bannerButtons">
              <p>We had left the ground</p>
            </div>
                <Tours />
                <Tools />
                <Cameraman />        
                <Accomodation />
                <Guide />
                <Vehicle />
          </div>
          
        <Footer />
        </div> 
    )
  }
}

export default Landing
