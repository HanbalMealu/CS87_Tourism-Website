import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class DeleteReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review : {}
        };
        this.onSubmit = this.onSubmit.bind(this)
      }

      onSubmit(e) {
        e.preventDefault()
          
        const id = {
            id:this.props.location.state.review.review_id
        }
      
    
           
    
            axios.post('/ratings/delete',id,
            {
                
            })
                .then(res => {
                    this.props.history.push(`/myreviews`)
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
                 <a>Are you sure you want to delete this reveiw?</a>
                  <button
                    type="submit"
                    className="register"
                  >
                   YES,DELETE REVIEW
                  </button><br />
                  
                </form>
                <Link to="myreviews">
                <button
                    type="submit"
                    className="register"
                  >
                   CANCEL
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    }
    
export default DeleteReview;