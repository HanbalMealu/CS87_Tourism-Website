
          import React, { Component } from 'react';
          import {Button, Form, InputGroup, FormControl} from "react-bootstrap"
          import axios,{post} from 'axios';
          import FormData from "form-data";
          import './Register.css'
          
          
          const validEmailRegex = RegExp(
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/i
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
          class  Register extends Component {
              constructor(props) {
                  super(props);
                  this.state = {
                    first_name: null,
                    last_name: null,
                    email: null,
                    password: null,
                    contact:null,
                    cnic: null,
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
          
          
              submitHandler = e =>{
              e.preventDefault()
              if (validateForm(this.state.errors)) {
                    if(e.target.cnic.value != "" &&
                    e.target.first_name.value != "" && 
                    e.target.email.value != "" && 
                    e.target.contact.value != "" && 
                    e.target.gender.value != "" &&
                    e.target.password.value != ""&&
                    e.target.gender.value != "")
                    {
                      const formData = new FormData();
                      formData.append("file",  e.target.attachment.files[0])
                      formData.append("first_name", e.target.first_name.value)
                      formData.append("last_name", e.target.last_name.value)
                      formData.append("email", e.target.email.value)
                      formData.append("contact", e.target.contact.value)
                      formData.append("cnic", e.target.cnic.value)
                      formData.append("gender", e.target.gender.value)
                      formData.append("password", e.target.password.value)
                      formData.append("rating", 0)
                      axios.post('/users/register',formData,
                      {
                          headers: {
                            'content-type':"'multipart/form-data';"
                          }
                      })
                          .then(res => {
                              this.props.history.push(`/login`)
                              if(res.data.status==="success"){
                                  this.props.toggle();
                          }
                      
                      })
                      .catch(function (error) {
                          console.log(error);
                      });
                      console.info("Valid Form");
                    }
                   
                } else {
                  console.error("Invalid Form");
                }
              }
              render() { 
                  const { errors } = this.state;
                  return (
                    <div className="container">
                       <div className="row">
            <div className="col-sm-0 col-xs-0 col-md-0 col-lg-2 col-xl-2"></div>
              <div className="col-sm-12 col-xs-12 col-md-12 col-lg-7 col-xl-7">
                    <div class="registerCard">
                    <div className="dashBoardHeadings">Register</div>
                      <div className="innerContainer">
                      <form onSubmit={this.submitHandler}>
                      
                          <div className="row">
                               <div className="col-6"> 
                                  <div className="error">{errors.first_name}</div>
                                  <input type="text" onChange={this.handleChange} className="smallBox" name="first_name" placeholder="First Name" />
                                </div>
                               <div className="col-6">
                               <div className="error">{errors.last_name}</div>  
                              <input type="text" onChange={this.handleChange} className="smallBox" name="last_name" placeholder="Last Name" />
                               </div>
                          </div>
                          <br />
                          <div className="row">
                              <div className="col-12">
                              <div className="error">{errors.email}</div>
                              <input type="email" onChange={this.handleChange} className="smallBox" name="email" placeholder="Enter You Email here" />
                              </div>
                           </div>
                           <br />
                          <div className="row">
                                  <div className="col-6">
                                    <div className="error">{errors.password}</div>
                                    <input type="password" onChange={this.handleChange} className="smallBox" name="password" placeholder="Enter Password" />
                                  </div>
                                  <div className="col-6">
                                    <div className="error">{errors.contact}</div>
                                    <input type="text" onChange={this.handleChange} className="smallBox" name="contact" maxlength="11" placeholder="Enter Phone no. here" />
                                  </div>
                          </div>
                          <br/>
                          <div className="row">
                              <div className="col-6">
                                <div className="error">{errors.cnic}</div>
                                <input type="text" onChange={this.handleChange} maxlength="15" className="smallBox" name="cnic" placeholder="CNIC" />
                              </div>
                              <div className="col-6">
                            <select className="smallBox" name="gender" onChange={this.handleChange}>
                              <option value="">Choose Gender</option>
                              <option value="Male"> Male </option>
                              <option value="Female">Female</option>
                            </select>
                            </div>
                          </div>
                          <div className="row">
                              <span className="registerLabel">Upload Picture</span>
                              <input type="file"  name="attachment"/>
                              
                          </div>
                          <br />
                          
                          <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4">
                              <button type="submit" className="tourSubmit">Register</button>
                            </div>
                          </div>
                                  
                      </form>
                      </div>
                  </div>
                </div></div></div>
                  )  
              }
          }
           
          export default Register;