import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/movies');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='row'>
        <form className="col s12" onSubmit={this.handleSubmit} autoComplete='off' >
          <div className="row">
            <div className="input-field col s6">
              <input id='email' type="email" value={this.state.email} name="email" onChange={this.handleChange} />
              <label htmlFor='email'>Email</label>
            </div>
            <div className="input-field col s6">
              <input id='name' type="text" value={this.state.name} name="name" onChange={this.handleChange} />
              <label htmlFor='name'>Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id='password' type="password" value={this.state.password} name="password" onChange={this.handleChange} />
              <label htmlFor='password'>Password</label>
            </div>
            <div className="input-field col s6">
              <input id='confirmPassword' type="password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>
          </div>
          <div className="row">
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
