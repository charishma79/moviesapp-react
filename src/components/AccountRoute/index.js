import './index.css'

import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

const AccountRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="membership-container">
          <p className="member">Member ship</p>
          <div className="mail-card">
            <p className="mail">rahul@gmail.com</p>
            <p className="password">Password: ************</p>
          </div>
        </div>
        <hr className="line" />
        <div className="plan-details-container">
          <p className="plan">Plan Details</p>
          <p className="mail">Premium</p>
          <p className="quality">Ultra HD</p>
        </div>
        <hr className="line" />
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default AccountRoute
