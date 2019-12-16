import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm'
import './SignupPage.css'


class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='container SignupPage'>
        <div className='section'>
          <h4>SignUp</h4>
          <div className='divider divideLine'></div>
        </div>
        <SignupForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default SignupPage;