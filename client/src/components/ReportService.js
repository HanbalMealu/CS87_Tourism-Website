import React, { Component } from 'react'
 import axios from 'axios'
 import jwt_decode from 'jwt-decode'
class ReportService extends Component {
    constructor(props){
        super(props);
        this.state = {
            ReportedService : {},
            reporter_email:'',
            reason:''
            }
                this.onSubmit = this.onSubmit.bind(this)
                this.onChange = this.onChange.bind(this)
            }
            componentDidMount() {
                const token = localStorage.usertoken
                const decoded = jwt_decode(token)
                this.setState({
                 reporter_email:decoded.email
                  })
                
            }

            onChange(e) {
              this.setState({ [e.target.name]: e.target.value })
            
            }
                         
                    onSubmit(e) {
                      e.preventDefault()
                        
                      const trip = {
                          id:this.props.location.state.ReportedService.s_id,
                          reporter_email:this.state.reporter_email,
                          reason:this.state.reason
                      }
                    
                  
                        if(trip.reason!=''){                  
                          axios.post('/reportedservices/register',trip,
                          {
                              
                          })
                              .then(res => {
                                  this.props.history.push(`/filteredtours`)
                                  if(res.data.status==="success"){
                                      this.props.toggle();
                              }
                          
                          })
                          .catch(function (error) {
                              console.log(error);
                          });
                       
                        }
                        else
                        {
                          console.log('Please Enter a Reason')
                          }
                       
                    }
                
              
                  render() {
                      return (
                        <div className="container">
                          <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                              <form noValidate onSubmit={this.onSubmit}>
                              <div className="form-group">
                               <a htmlFor="reason">reason:</a>
                                        <textarea
                  type="text"
                  className="smallBox"
                  name="reason"
                  placeholder="Reason to report"
                  value={this.state.reason}
                  onChange={this.onChange}
                />
                </div>
                               <div className="col-sm-6 col-lg-6 col-xl-6">
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary btn-block"
                                >

                                
                                 Yes,Report this Service
                                </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default ReportService;