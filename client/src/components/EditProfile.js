import axios,{post} from 'axios';
import FormData from "form-data";
import jwt_decode from 'jwt-decode'
import React, { Component } from 'react';
import './Register.css'
import SideBar from './Sidebar'
import {Link} from 'react-router-dom'
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

const validfirstNameRegex =RegExp(
  /^[a-zA-Z ]*$/
);  
const validPasswordRegex = RegExp(
  /^(?=.).{6,}$/
)

const validContactRegex = RegExp(
  /03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/ 
)

const validCnicRegex = RegExp(
  /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/
)
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};
class  EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          contact:null,
          cnic: null,
          users:[],
          errors: {
            first_name: "",
            last_name: "",
            email: "",
            cnic: "",
            contact: "",
            password: ""
          }
        };
      }

      
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          case "first_name":
            errors.first_name =
              validfirstNameRegex.test(value) ? "" : "First Name should be only alphabets*";
            break;
          case "last_name":
            errors.last_name =
              validfirstNameRegex.test(value) ? "" : "Last Name should be only alphabets*";
            break;
          case "email":
            errors.email = 
              validEmailRegex.test(value) ? "" : "Email is not valid*";
            break;
          case "password":
            errors.password =
              validPasswordRegex.test(value) ? "" : "Password should be of minimum 6 characters*";
            break;
        case "contact":
            errors.contact = 
              validContactRegex.test(value) ? "" : "Enter Valid Phone Number(03012345678)*";
        break;
        case "cnic":
            errors.cnic =
              validCnicRegex.test(value) ? "" : "Enter Valid Cnic No (99999-9999999-9)*";
            break;
          default:
            break;
        }
    
        this.setState({ errors, [name]: value });
      };

      componentDidMount() {
        this.getuser();
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          id:decoded.id,
          first_name:decoded.first_name,
          last_name:decoded.last_name,
          contact:decoded.contact,   
          cnic:decoded.cnic, 
          gender:decoded.gender,
          dp:decoded.dp
        })
      }
      getuser(){
        fetch('http://localhost:5000/users/profile')
        .then(results=>results.json())
        .then(results=>this.setState({'users':results}))
      }
      
    submitHandler = e =>{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
    e.preventDefault()
    if (validateForm(this.state.errors)) {
        const formData = new FormData();
            formData.append("file",  e.target.attachment.files[0])
            
            formData.append("first_name", e.target.first_name.value)
            
            formData.append("last_name", e.target.last_name.value)
          
            formData.append("contact", e.target.contact.value)
           
            formData.append("cnic", e.target.cnic.value)
            formData.append("gender", e.target.gender.value)
            formData.append("id",this.state.id)
            formData.append("dp",this.state.dp)
            formData.append("password", e.target.password.value)
           
            
  
            axios.post('/users/update',formData,
            {
                headers: {
                  'content-type':"'multipart/form-data';"
                }
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
            console.info("Valid Form");
          }
         
       else {
        console.error("Invalid Form");
      }
    }
    render() { 
        const { errors } = this.state;
        return (
          <div className="postPage">
            <div className="row">
              <div className="col-lg-3 col-xl-3 col-xs-12 col-md-12 col-sm-12">
                <SideBar /> 
              </div>
              <div className="col-lg-9 col-xl-9 col-xs-12 col-md-12 col-sm-12">
              <div className="container">
            <div class="registerCard">
            <div className="dashBoardHeadings">Edit Profile</div>
            
            <div className="innerContainer">
            { this.state.users.map(user=> 
            <form onSubmit={this.submitHandler}>
           
                <div className="row">
                    <div className="col-6">
                    <input type="text" onChange={this.handleChange} className="smallBox" name="first_name" defaultValue={user.first_name} />
                    </div>
                    <div className="col-6">
                    <input type="text" onChange={this.handleChange} className="smallBox" name="last_name" defaultValue={user.last_name}  />
                    </div>
                    
                  </div>
                  <br />
                <div className="row">
                    <input type="password" onChange={this.handleChange} className="smallBox" name="password" placeholder="Change Password" />
                </div>
                <br />
                <div className="row">        
                    <input type="text" onChange={this.handleChange} className="smallBox" name="contact" defaultValue={user.contact}  />
                </div>
                <br />
                <div className="row">
                        <div className="error">{errors.cnic}</div>
                    <input type="text" onChange={this.handleChange} className="smallBox" name="cnic" defaultValue={user.CNIC}  />
                </div>
                <br />
                <div className="row">
                  <select className="smallBox" name="gender" onChange={this.handleChange} >
                    <option value={user.gender} selected>{user.gender}</option>
                    <option value="Male"> Male </option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <br />
                <div className="row">
                    <span className="registerLabel">change Picture</span>
                    <input type="file"  name="attachment"/>
                    
                </div>
                <br />
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <Link to="/profile"><button type="submit" className="tourSubmit">Update</button></Link>
                  </div>
                  <div className="col-4">
                  <Link to="/profile"><button className="tourSubmit">Cancel</button></Link>
                  </div>
                </div>
    
            </form>
            )}
            </div>
        </div>
      </div>
              </div>
            </div>
          </div>
          
        )  
      
    }
}

          export default EditProfile;