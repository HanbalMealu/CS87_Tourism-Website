import React from 'react';
import { Link } from 'react-router-dom'
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
class Sent extends React.Component {
 constructor() {
  super();
         this.state = {
          sent: [],
          id:'',
        }
      }
      componentDidMount(){
       
        this.getSent();
      }
     
      getSent(){
        fetch('http://localhost:5000/messages/sent',{
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(results=>results.json())
        .then(results=>this.setState({'sent':results}))
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
        <div className="adminHeaders"><i class="fas fa-paper-plane"></i> Sent</div>
        <div className="message">
        <table className="table">
        
          <thead>
              <tr>
                <th>User</th>
                <th>Message</th>
                <th>Date/Time</th>
              </tr>
            </thead>
        { this.state.sent.map(inbox=> 
                    
          <tr>
            <td><a className="messageName">{inbox.first_name} {inbox.last_name}</a>
            <a className="messageEmail">({inbox.email})</a><br />          </td>
            <td><a className="messagE">{inbox.message}</a></td>
            <td><a className="messageDate">{new Date(inbox.created).toLocaleDateString()}</a>,
            <a className="messageTime">{inbox.time}</a></td>
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
export default Sent;
