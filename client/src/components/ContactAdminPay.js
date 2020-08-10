import React, { Component } from 'react'
 import axios from 'axios'
class ContactAdminPay extends Component {
    constructor(props){
        super(props);
        this.state = {
            details : {},
            type:{},
            package:{},
            price:{},
            message:'',
            response_message:''
           
            }
                this.onSubmit = this.onSubmit.bind(this)
                this.onChange = this.onChange.bind(this)
              }
              componentDidMount(){
                if(this.props.location.state.type==='service'){
                this.setState({
                  message:'I would like to add my Following Ad in Featured ads. Type: '+this.props.location.state.type+' ,Title: '+this.props.location.state.details.title+', ID: '+this.props.location.state.details.id+', Package: '+this.props.location.state.package,
                  response_message :'Your Request to Feature your ad has been recieved. your purchase details are Type: '+this.props.location.state.type+' ,Title: '+this.props.location.state.details.title+', ID: '+this.props.location.state.details.id+', Package: '+this.props.location.state.package+'. Kindly Share your payment details along with the screenshot of your Request Message at road2pakistan.service@gmail.com to complete this purchase.' 
                })
                  }
                  if(this.props.location.state.type==='trip'){
                    this.setState({
                      message:'I would like to add my Following Ad in Featured ads. Type: '+this.props.location.state.type+' ,Title: '+this.props.location.state.details.departure_city+', to '+this.props.location.state.details.arrival_city+' , ID: '+this.props.location.state.details.id+', Package: '+this.props.location.state.package,
                      response_message :'Your Request to Feature your ad has been recieved. your purchase details are Type: '+this.props.location.state.type+' ,Title: '+this.props.location.state.details.departure_city+', to '+this.props.location.state.details.arrival_city+' , ID: '+this.props.location.state.details.id+', Package: '+this.props.location.state.package+' .Kindly Share your payment details along with the screenshot of your Request Message at road2pakistan.service@gmail.com to complete this purchase.' 
                
                    })
                      }
                    }
              onChange(e) {
                this.setState({ [e.target.name]: e.target.value }) 
              }          
                    onSubmit(e) {
                      e.preventDefault()
                     
                      const Request = {
                        sender_id:this.props.location.state.details.touroperator_id,
                        email:'road2pakistan@support.com',
                        message:this.state.message
                      }
                        
                     const Response={
                      
                        sender_id:132,
                        email:this.props.location.state.details.email,
                        message:this.state.response_message
                        
                     }
                        
                  
                         
                  
                          axios.post('/messages/register',Request,
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
                          axios.post('/messages/register',Response,
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
                    const Service=(
                      <div>
                      <h6>Title:<a> {this.props.location.state.details.title}</a></h6>
                      <h6>Package:<a> {this.props.location.state.package}</a></h6>
                      <h6>Price:<a> {this.props.location.state.price}</a></h6>
                      </div>
                    )
                    const Trip=(
                      <div>
                      <h6>Title:<a> {this.props.location.state.details.departure_city} to {this.props.location.state.details.arrival_city}</a></h6>
                      <h6>Package:<a> {this.props.location.state.package}</a></h6>
                      <h6>Price:<a> {this.props.location.state.price}</a></h6>
                      </div>
                    )
                      return (
                        <div className="postPage">
                          <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                              <form noValidate onSubmit={this.onSubmit}>
                              <div className="col-sm-6 col-lg-6 col-xl-6">
                              <h3>Purchase Details:</h3>
                                {this.props.location.state.type==='service'?Service:this.props.location.state.type==='trip'?Trip:<a></a>}
                             
                               <div className="myPostCRUD">
                                <button
                                  type="submit"
                                  className="myPostCRUD"
                                >
                                 Confirm Request!
                                </button>
                                </div>
                                </div>
                              </form>
                            
                              </div>
                              </div>
                        </div>
                        
                      )
                    }
                  }
 export default ContactAdminPay;