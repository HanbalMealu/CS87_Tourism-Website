import React, { Component } from 'react'
 import axios from 'axios'
class AddFeaturedService extends Component {
    constructor(props){
        super(props);
        this.state = {
            FeaturedService : {},
            until:''
           
            }
                this.onSubmit = this.onSubmit.bind(this)
                this.onChange = this.onChange.bind(this)
              }
              onChange(e) {
                this.setState({ [e.target.name]: e.target.value }) 
              }          
                    onSubmit(e) {
                      e.preventDefault()
                        
                      const Service = {
                          id:this.props.location.state.FeaturedService.id,
                          until:this.state.until  
                      }
                    
                  
                         
                  
                          axios.post('/featuredrentalservices/add',Service,
                          {
                              
                          })
                              .then(res => {
                                  this.props.history.push(`/adminservices`)
                                  if(res.data.status==="success"){
                                      this.props.toggle();
                              }
                          
                          })
                          .catch(function (error) {
                              console.log(error);
                          });
                       
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
                                 YES,Add this Service
                                </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default AddFeaturedService;