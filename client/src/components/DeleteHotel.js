import React, { Component } from 'react'
 import axios from 'axios'
 import jwt_decode from 'jwt-decode'
class DeleteHotel extends Component {
    constructor(props){
        super(props);
        this.state = {
            Hotel : {},
         
           
            }
                this.onSubmit = this.onSubmit.bind(this)
            }
           
                    onSubmit(e) {
                      e.preventDefault()
                        
                      const id = {
                          hotel_id:this.props.location.state.Hotel.hotel_id
                      }
                    
                  
                         
                  
                          axios.post('/hotels/hoteldelete',id,
                          {
                              
                          })
                              .then(res => {
                                  this.props.history.push(`/adminhotels`)
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
                               <a>Are you sure you want to delete this Hotel?</a>
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary btn-block"
                                >
                                 YES,Remove This Hotel
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
 export default DeleteHotel;