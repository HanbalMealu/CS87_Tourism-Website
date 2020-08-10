import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';

class RateUserService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      review:{},
      email: '',
      review: '',
      sender_id:'',
      rating:'',
      title:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
     sender_id:decoded.id
      })
    }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  
  }
  onSubmit(e) {
    e.preventDefault()
  

    const ratingData = {
      review: this.state.review,
      sender_id:this.state.sender_id,
      email:this.props.location.state.review.email,
      title:this.props.location.state.review.title,
      rating:this.state.rating,
      post_time:this.props.location.state.review.posted,
    }
if(ratingData.rating!='' && ratingData.review!=''&& ratingData.email!=''){
    axios.post('/ratings/register',ratingData,
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
    else
    (console.log('You need to fill every field'))
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Rate a User</h1>
            
              <div className="form-group">
                <a htmlFor="email">email of user to be rated:</a>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.props.location.state.review.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
              <a htmlFor="review">review:</a>
                <textarea
                  type="text"
                  className="form-control"
                  name="review"
                  placeholder="Type your views about user"
                  value={this.state.review}
                  onChange={this.onChange}
                />
              </div>
              <a htmlFor="rating">rating:</a>
                <select name="rating" className="form-control" onChange={this.onChange} > 
                <option value="">rate user</option>            
                <option value='0'>0</option>
                <option value="1">1</option>                
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
             
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
               Send
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RateUserService
