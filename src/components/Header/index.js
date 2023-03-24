import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'

import {AiFillCloseCircle} from 'react-icons/ai'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {showMenu: false, searchInput: ''}

  onClickMenuIcon = () => {
    this.setState({
      showMenu: true,
    })
  }

  onClickHideMenu = () => {
    this.setState({
      showMenu: false,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchMovies = () => {
    const {getSearchDetails} = this.props
    const {searchInput} = this.state
    if (searchInput !== '') {
      getSearchDetails(searchInput)
    }
    // this.setState({searchInput: ''})
  }

  render() {
    const {showMenu, searchInput} = this.state
    const {match, searchPath} = this.props
    const {path} = match
    const searchContainer = searchPath
      ? 'search-input-card'
      : 'search-container'
    let homeStyle
    let popularStyle
    let accountStyle
    let searchStyle
    switch (path) {
      case '/popular':
        homeStyle = 'not-active'
        popularStyle = 'active'
        accountStyle = 'not-active'
        searchStyle = 'search-icon'
        break
      case '/account':
        homeStyle = 'not-active'
        popularStyle = 'not-active'
        accountStyle = 'active'
        searchStyle = 'search-icon'

        break
      case '/search':
        homeStyle = 'active'
        popularStyle = 'not-active'
        accountStyle = 'not-active'
        searchStyle = 'search-active'
        break
      default:
        homeStyle = 'active'
        popularStyle = 'not-active'
        accountStyle = 'not-active'
        searchStyle = 'search-icon'

        break
    }
    return (
      <>
        <nav className="header-bg-container">
          <Link to="/">
            <img
              className="logo"
              src="https://res.cloudinary.com/dtavdtwof/image/upload/v1678986920/Group_7399_1x__1_hroaps.png"
              alt="website logo"
            />
          </Link>
          <ul className="unordered-list">
            <Link to="/" className="nav-link">
              <li className={`list-item-1 ${homeStyle}`}>Home</li>
            </Link>
            <Link to="/popular" className="nav-link">
              <li className={`list-item-2 ${popularStyle}`}>Popular</li>
            </Link>
          </ul>
          <>
            <div className={searchContainer}>
              {searchPath && (
                <input
                  type="search"
                  className="search"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              )}
              <Link to="/search" className="nav-link">
                <button
                  className={searchStyle}
                  type="button"
                  testid="searchButton"
                  onClick={this.getSearchMovies}
                >
                  <HiOutlineSearch size={20} color="#ffffff" />
                </button>
              </Link>
            </div>
            <Link to="/account" className="nav-link">
              <img
                src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679164197/Avatar_1x__1_r8maej.png"
                alt="profile"
                className="avatar-img"
              />
            </Link>

            <button
              type="button"
              className="menu-btn"
              onClick={this.onClickMenuIcon}
            >
              <img
                src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679053740/add-to-queue_1_1x__szejyr.png"
                alt="menu-icon"
              />
            </button>
          </>
        </nav>
        {showMenu && (
          <ul className="small-list-container">
            <Link to="/" className="nav-link">
              <li className={`list-item-1 ${homeStyle}`}>Home</li>
            </Link>
            <Link to="/popular" className="nav-link">
              <li className={`list-item-2 ${popularStyle}`}>Popular</li>
            </Link>
            <Link to="/account" className="nav-link">
              <li className={`list-item-2 ${accountStyle}`}>Account</li>
            </Link>
            <button
              className="close-btn"
              type="button"
              onClick={this.onClickHideMenu}
            >
              <AiFillCloseCircle size={25} color="#ffffff" />
            </button>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
