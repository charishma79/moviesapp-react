import {Component} from 'react'

import './index.css'

import {Link} from 'react-router-dom'

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

class PopularRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularDetailsList: []}

  componentDidMount() {
    this.getPopularDetails()
  }

  getPopularDetails = async () => {
    const popularUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const popularResponse = await fetch(popularUrl, options)
    if (popularResponse.ok) {
      const popularData = await popularResponse.json()
      const popularUpdatedData = popularData.results.map(eachPopularItem => ({
        id: eachPopularItem.id,
        backdropPath: eachPopularItem.backdrop_path,
        posterPath: eachPopularItem.poster_path,
        title: eachPopularItem.title,
      }))
      this.setState({
        popularDetailsList: popularUpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  popularSuccessView = () => {
    const {popularDetailsList} = this.state

    return (
      <ul className="popular-container">
        {popularDetailsList.map(eachList => (
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
    )
  }

  popularFailureView = () => (
    <div className="movie-failure-container">
      <img
        src="https://res.cloudinary.com/dtavdtwof/image/upload/v1679129230/Background-Complete_1x__npqe7e.png"
        alt="failure view"
        className="movie-fail-img"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.getPopularDetails}
      >
        Try Again
      </button>
    </div>
  )

  popularLoaderView = () => (
    <div className="loader-card" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.popularLoaderView()
      case apiStatusConstants.failure:
        return this.popularFailureView()
      case apiStatusConstants.success:
        return this.popularSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movies-bg-container" testid="popular-item">
        <Header />
        {this.renderPopularDetailsView()}
        <Footer />
      </div>
    )
  }
}

export default PopularRoute
