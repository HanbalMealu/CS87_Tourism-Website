import React from 'react';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
class MyReviews extends React.Component {
 constructor() {
  super();
         this.state = {
          reviews: [],
          sentreviews:[]
        }
      }
      componentDidMount(){
        this.getreview();
        this.getsentreview();
      }
      getreview(){
        fetch('http://localhost:5000/users/myreviews')
        .then(results=>results.json())
        .then(results=>this.setState({'reviews':results}))
      }
      getsentreview(){
        fetch('http://localhost:5000/users/sentreviews')
        .then(results=>results.json())
        .then(results=>this.setState({'sentreviews':results}))
      }

  render() {
    return (
    <div className="dashboardContainer">
      <div className="row">
          <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
            <Sidebar />
          </div>
          <div className="col-lg-9 col-xl-9 col-sm-12 col-xs-12 col-md-12">
                
               <div className="reviewContainer">
               <div className="dashBoardHeadings">All Reviews</div>
                 <div className="reviewBody">
                 <div className="row">
                   <div className="col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-md-12">
                     <div className="reviewHeadings">
                       Visitor's Reviews
                     </div>
                     { this.state.reviews.map(review => 
                      <div className="reviewsText">
                          <div className="row">
                            <div className="col-4"><img src={`http://localhost:5000/uploads/`+review.dp} class="rounded-circle" alt=" "  height="80" width='80'/></div>
                            <div className="col-6"> 
                              <div className="row"><h5> From: {review.first_name} {review.last_name}</h5> <p>wrote on {new Date(review.posted).toLocaleDateString()}:</p></div>
                              <div className="row"><h5> For: {review.title}</h5> <p> on {new Date(review.post_time).toLocaleDateString()}:</p></div>
                              <div className="row"><h6>{review.review}</h6>  </div>
                              <div className="row"><h6>Rating:{review.rating}</h6>  </div>
                              <div className="row">
                                <div className="col-6">
                               
                                </div>
                                <div className="col-6">
                                
                                </div>
                                  </div>
                            </div> 
                          </div>  
                      </div>
                      )}

                   </div>
                   <div className="col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-md-12">
                     <div className="reviewHeadings">
                       My Reviews
                     </div>
                     { this.state.sentreviews.map(sentreview => 
                      <div className="reviewsText">
                          <div className="row">
                            <div className="col-4"> <img src={`http://localhost:5000/uploads/`+sentreview.dp} class="rounded-circle" alt=" "  height="80" width='80'/> </div>
                            <div className="col-6"> 
                              <div className="row"><h5> To: {sentreview.first_name} {sentreview.last_name}</h5> <p>wrote on {new Date(sentreview.posted).toLocaleDateString()}:</p></div>
                              <div className="row"><h5> For: {sentreview.title}</h5> <p> on {new Date(sentreview.post_time).toLocaleDateString()}:</p></div>
                              <div className="row"><h6>{sentreview.review}</h6>  </div>
                              <div className="row"><h6>Rating:{sentreview.rating}</h6>  </div>
                              
                            </div> 
                          </div>  
                      </div>
                      )}
                    </div>
                 </div>
                 </div>
               
               </div> 
          </div>
      </div>
    </div>
  );
  }
}
export default MyReviews;