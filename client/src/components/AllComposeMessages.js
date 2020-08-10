import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';

class AllComposeMessages extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      message: '',
      Email: {},
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
    if(localStorage.admintoken){
      const token = localStorage.admintoken
      const decoded = jwt_decode(token)
      this.setState({
       sender_id:decoded.id
        })
      }
      
    }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  
  }
  onSubmit(e) {
    e.preventDefault()
  

    const newMsg = {
      message: this.state.message,
      sender_id:this.state.sender_id,
      email:this.props.location.state.Email.email
    
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
      <div className="container">
          
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Compose a Message</h1>
            
              <div className="form-group">
                <a htmlFor="email">Recepient:</a>
                <input
                  type="email"
                  className="smallBox"
                  name="email"
                  placeholder="Enter email"
                  value={this.props.location.state.Email.email}
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

export default AllComposeMessages;
