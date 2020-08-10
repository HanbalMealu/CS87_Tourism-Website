import React, { Component } from 'react'
import SignUp from './Register'
import SignIn from './Login'
import Footer from './Footer'
class Join extends Component {
    render() {
        return (
            <div className="postPage">
                <div className="container">
                <br/>
                    
                <div className="row">
                    <div className="col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-md-12">
                        <SignUp />
                    </div>
                    <div className="col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-md-12">
                        <SignIn />
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}
export default Join;;