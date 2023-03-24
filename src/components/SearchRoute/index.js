import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const searchPath = true

class SearchRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchResultsList: [],
    searchText: '',
  }

  getSearchDetails = async searchInput => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    console.log(searchUrl)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const searchResponse = await fetch(searchUrl, options)
    if (searchResponse.ok) {
      const searchResultsData = await searchResponse.json()
      const updatedSearchData = searchResultsData.results.map(eachSearch => ({
        id: eachSearch.id,
        backdropPath: eachSearch.backdrop_path,
        overview: eachSearch.overview,
        posterPath: eachSearch.poster_path,
        title: eachSearch.title,
      }))
      console.log(updatedSearchData)
      this.setState({
        searchResultsList: updatedSearchData,
        apiStatus: apiStatusConstants.success,
        searchText: searchInput,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        searchText: searchInput,
      })
    }
  }

  renderSearchSuccessView = () => {
    const {searchResultsList} = this.state
    return (
      <>
        {searchResultsList.length > 0 ? (
          <ul className="popular-container">
            {searchResultsList.map(eachList => (
              <li className="popular-list-item" key={eachList.id}>
                <Link to={`/movies/${eachList.id}`}>
                  <img
                    src={eachList.posterPath}
                    alt={eachList.title}
                    className="popular-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          this.renderNoSearchResultsView()
        )}
      </>
    )
  }

  renderNoSearchResultsView = () => {
    const {searchText} = this.state
    console.log(searchText)
    return (
      <div className="no-results-card">
        <img
          src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679226945/Group_7394_1x__hqarst.png"
          alt="no movies"
          className="no-movie-img"
        />
        <p className="no-results">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSearchLoaderView = () => (
    <div className="loader-card" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  getSearchPages = () => {
    const {searchText} = this.state
    this.getSearchDetails(searchText)
  }

  renderSearchFailureView = () => (
    <div className="movie-failure-container">
      <img
        src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679129230/Background-Complete_1x__npqe7e.png"
        alt="failure view"
        className="movie-fail-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.getSearchPages}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderSearchLoaderView()
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      case apiStatusConstants.success:
        return this.renderSearchSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movies-bg-container" testid="search-item">
        <Header
          getSearchDetails={this.getSearchDetails}
          searchPath={searchPath}
        />
        {this.renderSearchDetails()}
        <Footer />
      </div>
    )
  }
}

export default SearchRoute
