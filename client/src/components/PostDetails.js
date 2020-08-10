import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {Link} from 'react-router-dom'
class PostDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            post:{},
            comments:[],
            comment:'',
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
                 this.sendpostId();
                 setTimeout(() => {
                    this.getcomments() 
                  }, 1000);
                }
  sendpostId(){
      const id_details={
          post_id:this.props.location.state.post.post_id
      }
    axios.post('/forums/comm_id',id_details,
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
  }
  getcomments(){
  
        fetch('http://localhost:5000/forums/comments')
        .then(results=>results.json())
        .then(results=>this.setState({'comments':results}))
  }
  
           
onChange(e) 
{
    this.setState({ [e.target.name]: e.target.value })
  
  }
  onSubmit(e) {
    e.preventDefault()
    const newcomment = {
        comment_user_id:this.state.sender_id,
        comment:this.state.comment,
        post_id:this.props.location.state.post.post_id
      
      }
     
      axios.post('/forums/comment',newcomment,
      {
          
      })
          .then(res => {
            window.location.reload(false)
              if(res.data.status==="success"){
       
                  this.props.toggle();
          }
      
      })
      .catch(function (error) {
          console.log(error);
      });
      
      axios.post('/forums/comment_count',newcomment,
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
      
   
    
    }
render(){
    const loggedin=(
        <div>
        <a htmlFor="comment">Comment:</a>
          <textarea
            type="text"
            className="smallBox"
            name="comment"
            placeholder="Write a comment"
            value={this.state.comment}
            onChange={this.onChange}
          />
        
        <button
        type="submit"
        className="myPostCRUD"
> 
     Comment
      </button>
      <div className="lineSided"></div>
      </div>
      
    )
    const notloggedin=(
      <div>
        
        <div className="lineFull"></div>
        <a><Link to="/login">Login</Link> to Comment</a>
      </div>
    )
    return(
      <div className="postPage">
          <div className="row">
          <div className="headForum">
              <div className="row">
                  <div className="col-lg-3 col-xl-3 col-md-12 col-xs-12 col-sm-12"><h6>Tourism Community</h6></div>
              </div>
          </div>
          </div>
          <div className="row">
               <div className="container">
                  <div className="row">
                      <div className="col-lg-8 col-xl-8 col-sm-12 col-md-12 col-xs-12">
                      <div className="discussCard">
                        <div className="row">
                          <div className="container">
                          <div className="row">
                              <div className="col-2">
                                  <img src={`http://localhost:5000/uploads/`+this.props.location.state.post.dp} class="rounded-circle" alt=" "  height="60" width='60'/>
                              </div>
                              <div className="col-lg-10 col-xl-10 col-sm-12 col-xs-12 col-md-12">
                                  <a>{this.props.location.state.post.first_name} {this.props.location.state.post.last_name}</a>  
                                  <p>{this.props.location.state.post.query}</p>
                                  <a>{this.props.location.state.post.description}</a>
                              </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="discussCard">
                      <h6>Comment</h6>
                      <form noValidate onSubmit={this.onSubmit}>
                        { this.state.comments.map(post=> 
                          <div className="row">
                            <div className="col-2">
                              <img src={`http://localhost:5000/uploads/`+post.dp} class="rounded-circle" alt=" "  height="60" width='60'/>
                            </div>
                            <div className="col-10">
                              <a >{post.first_name} {post.last_name}</a>
                              <p >   {post.comment}   </p>
                              <a >{new Date(post.comment_posted).toLocaleDateString()}</a>
                              
                            </div>
                            <div className="lineSided"></div>
                          </div>
                        )
                        }
                        
                        {localStorage.usertoken?loggedin:notloggedin}
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xl-4 col-sm-12 col-md-12 col-xs-12">
                      <div className="discussCard">
                        Related Posts
                      </div>
                    </div>
                  </div>
               </div>
          </div>
          
      </div>
    
    )

}
}

export default PostDetails