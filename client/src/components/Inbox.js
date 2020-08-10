import React from 'react';
import './Styling/Message.css'
import { Link } from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
class Inbox extends React.Component {
 constructor() {
  super();
         this.state = {
          inbox: [],
          id:'',
        }
      }
      componentDidMount(){
        
      
        this.getInbox();
      }
      getInbox(){
        fetch('http://localhost:5000/messages/inbox',{
          headers: {
            'Content-Type': 'application/json'
          } 
      })
        .then(results=>results.json())
        .then(results=>this.setState({'inbox':results}))
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
          <Link to='/profile'>
            <a><i class="fas fa-undo"></i> Go Back To Dashboard</a>
          </Link>
        </div>
          </div>
      </div>
      <div className="col-sm-12 col-xs-12 col-md-12 col-lg-9 col-xl-9">
          <br/>
        <div className="adminHeaders"><i class="fa fa-inbox"></i> Inbox</div>
        <div className="message">
        <table className="table">
        
          <thead>
              <tr>
                <th>User</th>
                <th>Message</th>
                <th>Date/Time</th>
                <th>Reply</th>
              </tr>
            </thead>
        { this.state.inbox.map(inbox=> 
                    
          <tr>
            <td><a className="messageName">{inbox.first_name} {inbox.last_name}</a>
            <a className="messageEmail">({inbox.email})</a><br />          </td>
            <td><a className="messagE">{inbox.message}</a></td>
            <td><a className="messageDate">{new Date(inbox.created).toLocaleDateString()}</a>,
            <a className="messageTime">{inbox.time}</a></td>
            <td>
              <Link to= {{
                      pathname: "/messageUser",
                      state:{
                        users: inbox
                    }
              }}>
                  <button className="myPostCRUD"><i class="fa fa-reply"></i> Reply</button>
              </Link>
              </td>
            </tr>
        
          )}
            </table>
            </div>
      </div>
      </div>
    </div>  
  );
  }
}
export default Inbox;
