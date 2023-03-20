import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import HomePoster from '../HomePoster'
import Header from '../Header'
import TrendingVideos from '../TrendingVideos'
import OriginalVideos from '../OriginalVideos'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, originalsBackDrop: {}}

  componentDidMount() {
    this.getOriginalDataView()
  }

  getOriginalDataView = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        originalsBackDrop: {...updatedData},
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  trendingLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  PosterFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679230553/alert-triangle_1x__fxeax6.png"
        alt="failure view"
        className="failure-logo"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        className="try-btn"
        type="button"
        onClick={this.getOriginalDataView}
      >
        Try Again
      </button>
    </div>
  )

  posterSuccessView = () => {
    const {originalsBackDrop} = this.state
    return <HomePoster posterDetails={originalsBackDrop} />
  }

  getPosterDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.trendingLoaderView()
      case apiStatusConstants.failure:
        return this.PosterFailureView()
      case apiStatusConstants.success:
        return this.posterSuccessView()
      default:
        return null
    }
  }

  render() {
    const {originalsBackDrop} = this.state
    const {backdropPath} = originalsBackDrop
    return (
      <div className="home-bg-container" testid="home-item">
        <div
          className="home-top-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            height: '100%',
            backgroundSize: 'cover',
          }}
        >
          <Header />
          {this.getPosterDetails()}
        </div>
        <div className="movies-container">
          <h1 className="trending">Trending Now</h1>
          <TrendingVideos />
        </div>
        <div className="movies-container">
          <h1 className="trending">Originals</h1>
          <OriginalVideos />
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomeRoute
