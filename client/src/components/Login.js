import React, { Component } from 'react'
import { login } from './UserFunctions'
import { adminlogin } from './UserFunctions'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import './Register.css'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ password: e.target.value });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  onSubmit(e) {
    e.preventDefault()
      
    const user = {
      email: this.state.email,
      password: this.state.password
    }
if(user.email=='road2pakistan@support.com'){
  adminlogin(user).then(res => {
    if (res) {
      this.props.history.push(`/`)
      const token = localStorage.admintoken
      const decoded = jwt_decode(token)
      const newMsg = {

        id:decoded.id
      
      
      }
      axios.post('/users/getid',newMsg,
      {
          
      })
          .then(res => {
              if(res.data.status==="success"){
                  this.props.toggle();
          }
      
      })
      .catch(function (error) {
          console.log(error);
      });
    axios.post('/messages/getid',newMsg,
      {
          
      })
          .then(res => {
              if(res.data.status==="success"){
                  this.props.toggle();
          }
      
      })
      .catch(function (error) {
          console.log(error);
      });
      axios.post('/ratings/update',newMsg,
      {
          
      })
          .then(res => {
              if(res.data.status==="success"){
                  this.props.toggle();
          }
      
      })
      .catch(function (error) {
          console.log(error);
      });
      
  
    }else{
      alert("Email or Password does not match!");
    }
  })
}
else{
    login(user).then(res => {
      if (res) {
        this.props.history.push(`/`)
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const newMsg = {

          id:decoded.id
        
        
        }
        axios.post('/users/getid',newMsg,
        {
            
        })
            .then(res => {
                if(res.data.status==="success"){
                    this.props.toggle();
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
      axios.post('/messages/getid',newMsg,
        {
            
        })
            .then(res => {
                if(res.data.status==="success"){
                    this.props.toggle();
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.post('/ratings/update',newMsg,
        {
            
        })
            .then(res => {
                if(res.data.status==="success"){
                    this.props.toggle();
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
        
    
      }else{
        alert("Email or Password does not match!");
      }
    })
  }
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }
  render() {
    return (
      <div className="container">
            <div className="row">
            <div className="col-sm-0 col-xs-0 col-md-0 col-lg-2 col-xl-2"></div>
              <div className="col-sm-12 col-xs-12 col-md-12 col-lg-7 col-xl-7">
              <div class="registerCard">
            <div className="dashBoardHeadings">Login</div>
              <div className="innerContainer">
                <p>Register if you don't have an account: </p><Link to="/register">Click here</Link>
                 
              <form noValidate onSubmit={this.onSubmit}>
               
                  <div className="row">
                     <div className="col-12">  
                       <input
                        type="email"
                        className="smallBox"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}
                        />
                        </div>
                  </div>
                    <br />
                    <div className="row">
                      <div className="col-12">
                      <div class="input-container">
                        <input
                        type={this.state.hidden ? "text" : "password"}
                        className="smallBox"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                       />
                       <img onClick={this.toggleShow} src={"https://cdn2.iconfinder.com/data/icons/flaticons-solid/18/eye-1-512.png"} id="input_img"/>
                       </div>
                       </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col-9"></div>
                      <div className="col-3">
                        <button
                            type="submit"
                            className="tourSubmit"
                        >
                            Login
                        </button>
                        </div>
                    </div>
                    <br/>
                  </form>
          </div>
        </div>
              </div>
            </div>
      </div>
    )
  }
}

export default Login
