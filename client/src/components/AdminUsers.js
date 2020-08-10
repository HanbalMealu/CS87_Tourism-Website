import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import baselineMessage from '@iconify/icons-ic/baseline-message';
import baselineVerified from '@iconify/icons-ic/baseline-verified';
import jwt_decode from 'jwt-decode'
class AdminUsers extends React.Component {
 constructor() {
  super();
         this.state = {
          users: [],
         
          

        }
      }
      
      componentDidMount(){
        const token = localStorage.admintoken
        const decoded = jwt_decode(token)
      this.getusers();
    }
      
      getusers(){
        fetch('http://localhost:5000/users/userlist')
        .then(results=>results.json())
        .then(results=>this.setState({'users':results}))
      }

      
  render() {
const verified=(
<button className="myPostCRUD">
  <i class="fas fa-times-circle"></i> UnVerify
  </button>
  )
  const notverified=(
    <button className="myPostCRUD">
      <Icon icon={baselineVerified} /> Verify-User
      </button>
      )
    return (
      <div className="row">
      <div className="col-12">
        <div className="container">
       <div className="adminHeaders">Users List</div>
       <div className="message">
       <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Contact</th>
                <th>Active</th>
                <th>View</th>
                <th>Delete</th>
                <th>Message</th>
                <th>Verify</th>
                
              </tr>
            </thead>
        { this.state.users.map(user => 
          <tr>
            <td>{user.id}</td>
            <td>{user.email}<br />{user.contact}</td>
            <td>{new Date(user.created).toLocaleDateString()}</td>
            <td>
                  <Link to= {{
                      pathname: "/adminlistviewUser",
                      state:{
                        userPage: user
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-eye"></i> View
                    </button>
                    </Link>
            </td>
            <td>
                    <Link to= {{
                      pathname: "/adminDeleteUser",
                      state:{
                        adminDeleteUser: user
                    }
                    }}>
                    <button className="myPostCRUD">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                    </Link>

            </td>
      
            <td>
                  <Link to= {{
                      pathname: "/messageUser",
                      state:{
                        users: user
                    }
                    }}>
                   { <button className="myPostCRUD">
                   <Icon icon={baselineMessage} /> Message
                    </button>}
                    </Link>
            </td>
            <td>
                   <Link to= {{
                      pathname: "/adminVerifyUser",
                      state:{
                        adminVerifyUser: user
                    }
                    }}>
                      {user.status==='verified'?verified:notverified}
                    </Link>

            </td>
          </tr>
          
           
          )}
        </table>
        </div>
        </div>
        </div>
      </div>
    
  )
  }
}
export default AdminUsers;