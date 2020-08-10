import React, { Component } from 'react'
 import axios from 'axios'
 import jwt_decode from 'jwt-decode'
class AdminDeleteServiceReport extends Component {
    constructor(props){
        super(props);
        this.state = {
          admindeleteservicereport : {},
            sender_id:''
           
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
                          id:this.props.location.state.admindeleteservicereport.report_id
                      }
             
                          axios.post('/reportedservices/ignore',id,
                          {
                              
                          })
                              .then(res => {
                                  this.props.history.push(`/adminreportedservices`)
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
                               <a>Are you sure you want to Ignore this report?</a>
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary btn-block"
                                >
                                 YES,Ignore this Report
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default AdminDeleteServiceReport;