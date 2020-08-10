import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {Link} from 'react-router-dom'
class ForumNew extends Component {
  constructor() {
    super()
    this.state = {
        posts:[],
        place:'',
        members:'',
        budget:'',
        month:'',
        description:'',
        sender_id:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
   if(localStorage.usertoken){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
     sender_id:decoded.id
      })
    }

  }

onChange(e) 
{
    this.setState({ [e.target.name]: e.target.value })
  
  }
  onSubmit(e) {
    e.preventDefault()
    const newPost = {
        post_user_id:this.state.sender_id,
        query:"I am planning to go to "+this.state.place+" in a group of "+this.state.members+" poeple in the month of "+this.state.month+" with a budget of "+this.state.budget,
        description:this.state.description
      
      }
  if(this.state.place!==''&& this.state.members!==''&&this.state.month!==''&&this.state.budget!==''&&newPost.description!==''){      
      axios.post('/forums/post',newPost,
      {
          
      })
          .then(res => {
              this.props.history.push(`/forum`)
              if(res.data.status==="success"){
                  this.props.toggle();
          }
      
      })
      .catch(function (error) {
          console.log(error);
      });
      
    }
    else{
        console.log('Please Fill All Fields')
    }
    }

render(){
return (
  <div className="postPage">
    <div className="container">
      <div className="row">
        <div className="planTour">
         <form noValidate onSubmit={this.onSubmit}>
          <div className="dashBoardHeadings">Plan Your Tour</div>
            <div className="container">
              <br/>
            <div className="row">
              <div className="col-12">
              <input
                  type="text"
                  className="smallBox"
                  name="place"
                  placeholder="Enter Place you want to visit"
                  value={this.state.place}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-6">
                      <input
                  type="number"
                  className="smallBox"
                  name="budget"
                  placeholder="Enter your budget"
                  value={this.state.budget}
                  onChange={this.onChange}
                />    
                </div>
                <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-6">
                <input
                  type="number"
                  className="smallBox"
                  name="members"
                  placeholder="Number of people"
                  value={this.state.members}
                  onChange={this.onChange}
                />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                <select name="month" className="smallBox" onChange={this.onChange} > 
                    <option value=""selected>Select The Month when you want to visit</option>
                    <option value="January">January</option> 
                    <option value="February">February</option>
                  <option value="March">March</option> 
                  <option value="April">April</option> 
                  <option value="May">May</option> 
                  <option value="June">June</option> 
                  <option value="July">July</option> 
                  <option value="August">August</option> 
                  <option value="September">September</option> 
                  <option value="October">October</option> 
                  <option value="November">November</option> 
                  <option value="December">December</option> 
                  </select>
                </div>
            </div>
          
            <br/>

              <div className="row">
                <div className="col-12">
                <textarea
                type="text"
                className="smallBox"
                name="description"
                placeholder="Enter desired details regarding services etc for your tour..."
                value={this.state.description}
                onChange={this.onChange}
              />
                </div>
              </div>
        </div>
        <div className="row">
        <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12"></div>
        <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12">
        <button
        type="submit"
        className="myPostCRUD"
        >POST</button>
        </div>
      <div className="lineSided"></div>
      </div>
     
            
          </form>
          </div>
          </div>
        </div>
        </div>
  )

}
}

export default ForumNew
