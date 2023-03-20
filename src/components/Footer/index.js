import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-card" testid="footer">
    <div className="icons-container">
      <button type="button" className="icon-btn" testid="Google Icon">
        <FaGoogle size={20} color="#ffffff" />
      </button>
      <button type="button" className="icon-btn" testid="Twitter Icon">
        <FaTwitter size={20} color="#ffffff" />
      </button>
      <button type="button" className="icon-btn" testid="Instagram Icon">
        <FaInstagram size={20} color="#ffffff" />
      </button>
      <button type="button" className="icon-btn" testid="Youtube Icon">
        <FaYoutube size={20} color="#ffffff" />
      </button>
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
