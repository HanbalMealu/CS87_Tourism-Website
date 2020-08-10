import React, { Component } from 'react'
import axios from 'axios'
import FormData from "form-data"
class EditReview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        review : {},
        edit_review:null,
        edit_rating:null
            };
            this.onChange = this.onChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this);
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  
  }
  submitHandler = e =>{
    e.preventDefault()
  
    
    if(e.target.edit_review.value!='' && e.target.edit_rating.value!=''){
      console.log('form submited')
  
      
    const formData = new FormData();  
    formData.append("id", this.props.location.state.review.review_id)
    formData.append("review", e.target.edit_review.value)
    formData.append("rating", e.target.edit_rating.value)
  
    
      axios.post('/ratings/editreview',formData,
          
          {
              headers: {
    
                  'content-type':"'multipart/form-data';"
              }
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
   else{
      console.log('form errors')
  }
  
  }



render() { 
    return (
        <div className = "postTourCard">
        <form onSubmit={this.submitHandler}>
            
              <div className="formData">
              <div className="container">
                <div className = "row">
                   <div className="col-sm-2 col-md-3 col-xl-4"></div>
                   <h3>Edit Your Review</h3>
               </div>    
            <div className="container">
    
            
              
            
                <div className="row">
                  <div className="col-sm-12 col-lg-12 col-xl-12">
                  <span className="registerLabel">Review</span>
                    <textarea type="text" className="smallBox" onChange={this.onChange} minLength="5" name="edit_review" defaultValue={this.props.location.state.review.review} />
                  </div>
                </div>
                
                    </div>
           
              
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12">
                <span className="registerLabel">Rating</span>
                  <select name="edit_rating" className="smallBox" onChange={this.onChange}> 
                    <option value={this.props.location.state.review.rating} selected>{this.props.location.state.review.rating}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
               </div>
                <br />
                    <div className="row">
                        <div className="col-sm-12 col-lg-12 col-xl-12">
                          <button type="submit" className="tourSubmit">Edit Review</button>
                        </div>
                  </div>
              </div>
              </div>
              
             </form>
          </div>            
        
    )  
  }
  }
export default EditReview;




