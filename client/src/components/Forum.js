import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Forum extends Component {
  constructor() {
    super()
    this.state = {
        posts:[],
      errors: {}
    }

  }
  componentDidMount() {
       
    this.getposts()
  }
  getposts(){
    fetch('http://localhost:5000/forums/posts')
    .then(results=>results.json())
    .then(results=>this.setState({'posts':results}))
  }



render(){
    const loggedin=(
        <div>
          <Link to= {{
                pathname: "/newpost",
              
                }}>
                    <button className="myPostCRUD1">
                    <div className="row">
                      <div className="col-2"><i class='fas fa-comment-alt' /></div><div className="col-8">Start Topic</div>
                    </div>
                    </button></Link>
      </div>
      
    )
    const notloggedin=(
      <div>
      <Link to= {{
            pathname: "/login",
         
            }}>
                <button className="myPostCRUD1">
                  <div className="row">
                  <div className="col-2"><i class='fas fa-comment-alt' /></div><div className="col-8">Start Topic</div>
                  </div>
                </button></Link>
  </div>
    )
return (
  <div className="postPage">
      <div className="row">
      <div className="headForum">
          <div className="row">
              <div className="col-lg-3 col-xl-3 col-md-12 col-xs-12 col-sm-12"><h6>Tourism Community</h6></div>
            <div className="col-lg-4 col-xl-4 col-md-0 col-xs-0 col-sm-0"></div>
            <div className="col-lg-3 col-xl-3 col-md-12 col-xs-12 col-sm-12">{localStorage.usertoken?loggedin:notloggedin}</div>
          </div>
      </div>
         
      </div>
      <br/>
      <div className="row">
        <br/>
           <div className="container">
              <div className="row">
              <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
              <form noValidate onSubmit={this.onSubmit}>
                { this.state.posts.map(post=> 
                  <div className="discussCard">
                      <div className="row">
                        <div className="col-2">
                          <img src={`http://localhost:5000/uploads/`+post.dp} class="rounded-circle" alt=" "  height="60" width='60'/></div>
                      <div className="col-8">
                        <div className="row"><a>{post.first_name} {post.last_name}</a></div>
                        <div className="row">
                        <Link to= {{
                            pathname: "/postdetails",
                            state:{
                                post: post
                            }
                            }}><p>{post.query}</p>
                            </Link></div>
                      </div>
                      <div className="col-lg-2 col-xl-2 col-md-12 col-xs-12 col-sm-12">
                        <div className="row">
                          <div className="col-3"><a><i class='fas fa-comment-alt' /></a></div>
                          <div className="col-6"><a>{post.comments_count}</a></div>   
                        </div>
                        <div className="lineFull"></div>
                        <div className="row">
                        <div className="col-3"><a><i class='fas fa-clock'></i></a></div>
                        <div className="col-6"><a>{new Date(post.post_posted).toLocaleDateString()}</a></div>
                           
                        </div>

                        </div>
                      </div>
                  </div>
                    )}
              
            </form>
            </div>
              </div>
           </div>   
        </div>
        </div>
  )

}
}

export default Forum
