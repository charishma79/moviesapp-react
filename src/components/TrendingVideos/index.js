import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import TrendingCard from '../TrendingCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingVideos extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingVideoDetails()
  }

  getTrendingVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedTrendingData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      console.log(updatedTrendingData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingList: updatedTrendingData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <ul className="trending-container">
        <TrendingCard movieDetails={trendingList} />
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679230553/alert-triangle_1x__fxeax6.png"
        alt="failure view"
        className="failure-logo"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        className="try-btn"
        type="button"
        onClick={this.getTrendingVideoDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTrendingDetails()}</div>
  }
}

export default TrendingVideos
