import React, { Component } from 'react'
 import axios from 'axios'
 import jwt_decode from 'jwt-decode'
class AdminDeleteServices extends Component {
    constructor(props){
        super(props);
        this.state = {
            adminDeleteService : {},
           
            }
                this.onSubmit = this.onSubmit.bind(this)
            }
            componentDidMount() { 
              const token = localStorage.admintoken
              const decoded = jwt_decode(token)
              this.setState({
               sender_id:decoded.id
                })
            } 
                         
                    onSubmit(e) {
                      e.preventDefault()
                        
                      const id = {
                          id:this.props.location.state.adminDeleteService.id
                      }
                    
                  
                         
                  
                          axios.post('/rentalservices/delete',id,
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
                          const newMsg = {
                            message: 'Dear User your Service Titled: '+this.props.location.state.adminDeleteService.title+' has been deleted due to some reasons, contact Admin for more details',
                            sender_id:this.state.sender_id,
                            email:this.props.location.state.adminDeleteService.email
                          
                          }
                          axios.post('/messages/register',newMsg,
                          {
        
                                })
                                    .then(res => {
                                        this.props.history.push(`/adminsent`)
                                        if(res.data.status==="success"){
                                            this.props.toggle();
                                    }
                            
                                      })
                            .catch(function (error) {
                                console.log(error);
                            });

    if(this.props.location.state.adminDeleteService.reporter_email){
      const newMsg = {
        message: 'Dear User, a Service Titled: ' + this.props.location.state.adminDeleteService.title+' has been deleted after reviewing it on your report. your feedback is always helpful',
        sender_id:this.state.sender_id,
        email:this.props.location.state.adminDeleteService.reporter_email
      
      }
      axios.post('/messages/register',newMsg,
                          {
        
                                })
                                    .then(res => {
                                        this.props.history.push(`/adminsent`)
                                        if(res.data.status==="success"){
                                            this.props.toggle();
                                    }
                            
                                      })
                            .catch(function (error) {
                                console.log(error);
                            });

    }

                       
                    }
                
              
                  render() {
                      return (
                        <div className="container">
                          <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                              <form noValidate onSubmit={this.onSubmit}>
                               <a>Are you sure you want to delete this Post?</a>
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary btn-block"
                                >
                                 YES,Remove This Post
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default AdminDeleteServices;