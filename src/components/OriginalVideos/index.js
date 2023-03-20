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
  state = {apiStatus: apiStatusConstants.initial, originalMoviesList: []}

  componentDidMount() {
    this.getOriginalVideoDetails()
  }

  getOriginalVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedOriginalData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      console.log(updatedOriginalData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        originalMoviesList: updatedOriginalData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOriginalSuccessView = () => {
    const {originalMoviesList} = this.state
    return (
      <ul className="trending-container">
        <TrendingCard movieDetails={originalMoviesList} />
      </ul>
    )
  }

  renderOriginalLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderOriginalFailureView = () => (
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
        onClick={this.getOriginalVideoDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalItemView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderOriginalLoaderView()
      case apiStatusConstants.failure:
        return this.renderOriginalFailureView()
      case apiStatusConstants.success:
        return this.renderOriginalSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderOriginalItemView()}</div>
  }
}

export default TrendingVideos
