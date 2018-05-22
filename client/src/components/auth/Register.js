import React, { Component } from 'react';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DeveLink account
              </p>
              <form>
                <div className="form-group">
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;