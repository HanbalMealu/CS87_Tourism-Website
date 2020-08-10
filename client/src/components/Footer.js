import React, { Component } from 'react'
import './Styling/footer.css'
import {Link} from 'react-router-dom'
class Footer extends Component {
    render() {
        return (
            <div className="footerBackground">
                <div className="container">
                    <div className="bodyFooter">
                    <div className="row">
                   
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                       <div className="firstCol">
                           <h5>Road<a>2</a>Pakistan</h5>
                           <p>This website is developed to promote tourism. The purpose to make this website thus was to make different tourism lovers weather they are from this country or not to get almost all the gadgets required for the tourism from this tourism website</p>
                           <p><div className="footerIcons"></div><i class='fas fa-map-marker-alt'></i> Lahore</p>
                           <p><i class='fas fa-phone'></i> 03001234567</p>
                           <p><i class='far fa-envelope'></i> road2pakistan@support.com</p>
                           
                           
                       </div>
                   </div>
                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                   
                   </div>
                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                   <div className="thirdCol">
                           <h5>Pages</h5>
                           <Link to="/filteredtours"><p>Tours</p></Link>
                           <Link to="/filteredtools"><p>Rent a Tool</p></Link>
                           <Link to="/filteredaccomodations"><p>Rent a Guest House</p></Link>
                           <Link to="/filteredcameraman"><p>Rent a Photographer</p></Link>
                           <Link to="/filteredvehicles"><p>Rent a Vehicle</p></Link>
                           <Link to="/filteredguides"><p>Rent a Guide</p></Link>
                       </div>
                   </div>
               </div>
               <div className="lineFull"></div>
               <br/>
               <div className="row">
                           
                            <div className="col-lg-1 col-xl-1">
                            <Link to="/youtube">
                            <a class="btn-floating btn-lg btn-fb" type="button" role="button"><i class="fab fa-youtube"></i></a>
                            </Link>
                            </div>
                            <div className="col-lg-8 col-xl-8">
                            
                            </div>
                            <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
                                <button className="btn btn-danger btn-block" onClick={() => window.scrollTo(0,0)}>Move to Top</button>
                            </div>
                           
               </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Footer;