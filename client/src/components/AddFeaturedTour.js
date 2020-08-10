import React, { Component } from 'react'
 import axios from 'axios'
 import jwt_decode from 'jwt-decode'
class AddFeaturedTour extends Component {
    constructor(props){
        super(props);
        this.state = {
            FeaturedTour : {},
            until:''
            }
                this.onSubmit = this.onSubmit.bind(this)
                this.onChange = this.onChange.bind(this)
            }
            componentDidMount(){
              const token = localStorage.admintoken
            const decoded = jwt_decode(token)
            }
            onChange(e) {
              this.setState({ [e.target.name]: e.target.value })
            
            }
                         
                    onSubmit(e) {
                      e.preventDefault()
                      
                        
                      const trip = {
                          id:this.props.location.state.FeaturedTour.id,
                          until:this.state.until   
                      }
                    
                  
                         if(trip.until!=''){
                  
                          axios.post('/featuredtrips/add',trip,
                          {
                              
                          })
                              .then(res => {
                                  this.props.history.push(`/admintours`)
                                  if(res.data.status==="success"){
                                      this.props.toggle();
                              }
                          
                          })
                          .catch(function (error) {
                              console.log(error);
                          });
                        }
                          else{
                            console.log('Please Enter Date!')
                          }

                       
                    }
                
              
                  render() {
                      return (
                        <div className="container">
                          <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                              <form noValidate onSubmit={this.onSubmit}>
                              <div className="col-sm-6 col-lg-6 col-xl-6">
                <h4 className="registerLabel">Add this tour to premium until</h4>
                <input type="date" name="until" value={this.state.until} onChange={this.onChange}  />
                </div>
                               <a></a>
                               <div className="col-sm-6 col-lg-6 col-xl-6">
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary btn-block"
                                >

                                
                                 Add this Tour
                                </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default AddFeaturedTour;