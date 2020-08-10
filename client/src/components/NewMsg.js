import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
class newMsg extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      message: '',
      sender_id:'',
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
  

    const newMsg = {
      message: this.state.message,
      sender_id:this.state.sender_id,
      email:this.state.email
    
    }

    axios.post('/messages/register',newMsg,
    {
        
    })
        .then(res => {
            this.props.history.push(`/sent`)
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
      <div className="container-fluid">
      <div className="row">
      <div className="col-sm-12 col-xs-12 col-md-12 col-lg-3 col-xl-3">
      <br/>
          <div className="messageSidebarFixing">
          <div className="adminHeaders"><Icon icon={baselineMessage}/> Mail Box</div>
      <div class="AdminsidebarMessage">
          <Link to='/newMsg'>
            <a><i class="fa fa-edit"></i> Compose</a>
          </Link>
          <div className="lineFullss"></div>
          <Link to='/Inbox'>
            <a><i class="fa fa-inbox"></i> Inbox</a>
          </Link>
          <div className="lineFullss"></div>
          <Link to='/sent'>
            <a><i class="fas fa-paper-plane"></i> Sent</a>
          </Link>
          <div className="lineFullss"></div>
          <Link to='/adminDashboard'>
            <a><i class="fas fa-undo"></i> Go Back To Dashboard</a>
          </Link>
        </div>
          </div>
      </div>
        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-6">
          <br/>
          <br/>
          <div className="adminHeaders"><i class="fas fa-paper-plane"></i> Compose</div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <a htmlFor="email">Recepient:</a>
                <input
                  type="email"
                  className="smallBox"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
              <a htmlFor="email">Message body:</a>
                <textarea
                  type="text"
                  className="smallBox"
                  name="message"
                  placeholder="Type your message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
              </div>
             
              <div className="row">
                <div className="col-lg-6 col-xl-6"></div>
                <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
                    
                    <button
                    type="submit"
                    className="myPostCRUD"
                  >
                  Send
                  </button>
                    
                </div>
                <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
                  <Link to="/profile">
                  <button
                      type="submit"
                      className="myPostCRUD"
                    >
                    Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>    
          </div>
        </div>
      </div>
    )
  }
}

export default newMsg
