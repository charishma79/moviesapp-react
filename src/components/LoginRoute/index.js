import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitError: true, errorMsg: errorMessage})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  renderInputContainer = () => {
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <>
        <div className="input-container">
          <label htmlFor="name" className="label">
            USERNAME
          </label>
          <input
            type="text"
            className="user-name"
            placeholder="Enter Username"
            id="name"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="input-2-container">
          <label htmlFor="pass-word" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            className="user-name"
            placeholder="Enter Password"
            id="pass-word"
            value={password}
            onChange={this.onEnterPassword}
          />
        </div>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="page-bg-container" testid="login-item">
        <img
          className="website-logo"
          src="https://res.cloudinary.com/dtavdtwof/image/upload/v1678986920/Group_7399_1x__1_hroaps.png"
          alt="login website logo"
        />

        <div className="login-form-container">
          <h1 className="login">Login</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            {this.renderInputContainer()}
            <button type="submit" className="log-btn">
              Login
            </button>
            <button type="submit" className="sign-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
