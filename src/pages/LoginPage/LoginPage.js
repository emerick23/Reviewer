import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './LoginPage.css'

class LoginPage extends Component {

  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      //Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show jobsIndex
      this.props.history.push('/movies');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Incorrect Credentials');
    }
  }

  isFormInvalid() {
    return !(this.state.email && this.state.pw);
  }

  render() {
    return (
      <div className="container LoginPage">
        <div className='section'>
          <h4>Login</h4>
          <div className='divider divideLine'></div>
        </div>
        <div className='row'>
          <form className="col s12" onSubmit={this.handleSubmit} autoComplete='off'>
            <div className="row">
              <div className="input-field col s12">
                <input id='loginEmail' type="email" value={this.state.email} name="email" onChange={this.handleChange} />
                <label htmlFor='loginEmail'>Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id='loginPassword' type="password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                <label htmlFor='loginPassword'>Password</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="btn" disabled={this.isFormInvalid()}>Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
