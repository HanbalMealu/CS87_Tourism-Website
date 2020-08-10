import React, { Component } from 'react';
import AdminSidebar from './AdminSidebar'
import {Link} from 'react-router-dom';
import AdminCards from './cardsAAdmin'
import jwt_decode from 'jwt-decode'
import AdminUsers from './AdminUsers'
class AdminDashboard extends Component {
    componentDidMount(){
        const token = localStorage.admintoken
      const decoded = jwt_decode(token)
      }
    adminlogOut(e) {
        e.preventDefault()
        localStorage.removeItem('admintoken')
        this.props.history.push(`/`)
      }
    render() {
        return (
            <div className="dashboardContainer">
                <div className="row">
                <div className="col-lg-3 col-xl-3">
                    <AdminSidebar />
                </div>
                    <div className="col-sm-12 col-xs-12 col-md-12 col-lg-9 col-xl-9">
                    <br/>
                
                        <div className="row">
                            <div className="container">
                            <AdminCards />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                        <div className="container">
                            <AdminUsers />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminDashboard;