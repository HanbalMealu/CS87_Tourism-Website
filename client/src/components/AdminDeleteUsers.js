import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class AdminDeleteUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            adminDeleteUser : {}
        }
            this.onSubmit = this.onSubmit.bind(this)
        }
        componentDidMount(){
          const token = localStorage.admintoken
        const decoded = jwt_decode(token)
        }

  
        onSubmit(e) {
          e.preventDefault()
            
          const del_id = {
              id:this.props.location.state.adminDeleteUser.id
          }
        
      
             
      
              axios.post('/users/admindelete',del_id,
              {
                  
              })
                  .then(res => {
                      this.props.history.push(`/adminusers`)
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
                   <a>Are you sure you want to delete this User?</a>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block"
                    >
                     YES,Remove This User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }
      }
      
export default AdminDeleteUsers;