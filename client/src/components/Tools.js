  import React from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios'
  class Tools extends React.Component {
    constructor() {
            super();
                   this.state = {
                    tools: [],
                    location:'',
                    cost:'',
                    keyword:'',
                    sort:''
                  }
                  this.onChange = this.onChange.bind(this)
                  this.onSubmit = this.onSubmit.bind(this)
                }
                onChange(e) {
                  this.setState({ [e.target.name]: e.target.value })
                
                }
               
                onSubmit(e) {
                 
                  e.preventDefault()
             
                
                
                
              
                  const filter = {
                      
                    location:this.state.location,
                    keyword:this.state.keyword,
                    cost:this.state.cost,
                    sort:this.state.sort
                  }
                  axios.post('/rentalservices/filter',filter,
                  {
                      
                  })
                      .then(res => {
                          this.props.history.push(`/tours`)
                          if(res.data.status==="success"){
                              this.props.toggle();
                      }
                  
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
                }
                
                componentDidMount(){
                  this.gettools();
                }
                gettools(){
                  fetch('http://localhost:5000/rentalservices/featuredtoollist')
                  .then(results=>results.json())
                  .then(results=>this.setState({'tools':results}))
                }
    render(){
      function refreshpage() {
        window.location.reload(false)
      }
      return(
        <div className="listPage">
        <div className="description1"><p>Featured Tools</p></div>                  
        <div className="container">
          <div className="row">
            
              { this.state.tools.map(accomodation => 
              <div className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 col-md-3">
                <div className="PostAll">
                  <div className="cardHead">
                    <img src={`http://localhost:5000/uploads/`+accomodation.pic}  alt="" />
                  </div>

                  <div className="container">
                    <div className="cardBody">
                    <div className="postDate"><i class='fas fa-clock'></i> Posted On: {new Date(accomodation.posted).toLocaleDateString()}</div>
                      <h5>{accomodation.title}</h5>
                      <div className="dashboardCardsLine"></div>
                      <div className="row">
                        <div className="col-6">
                          <p>
                          Location<br/>
                            Price<br/>
                            Contact<br/>
                            Rating<br/>
                          </p>
                        </div>
                        <div className="col-6">
                          <p>{accomodation.location}<br/>
                            Rs. {accomodation.price}/- <br />
                          {accomodation.contact}<br />
                          {accomodation.rating}</p>  
                        </div>
                        
                      </div>
                    </div>          
                  </div>   

                   <div className="cardBottom">
                   <Link to= {{
                      pathname: "/serviceDetail",
                      state:{
                        service: accomodation
                      }
                      }}>
                        <button className="cardButton">Details</button>
                    </Link>
                   </div>   
          </div>
         
          </div>
           
          )}
            </div>
      </div>
    </div>
      );
    }
            
  } 
export default Tools;