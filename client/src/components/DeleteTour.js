import React, { Component } from 'react'
import axios from 'axios'
class DeleteTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip : {}
        };
        
        this.onSubmit = this.onSubmit.bind(this)
      }

      onSubmit(e) {
        e.preventDefault()
          
        const id = {
            id:this.props.location.state.trip.id
        }
      
    
           
    
            axios.post('/trips/delete',id,
            {
                
            })
                .then(res => {
                    this.props.history.push(`/profile`)
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
                 <a>Are you sure you want to delete this post?</a>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                   YES,DELETE TRIP
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
      }
    }
    
    
export default DeleteTour;