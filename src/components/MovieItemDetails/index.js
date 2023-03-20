import {Component} from 'react'

import getYear from 'date-fns/getYear'
import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieItemDetails: {}}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const moviesUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const movieResponse = await fetch(moviesUrl, options)
    if (movieResponse.ok) {
      const movieData = await movieResponse.json()
      const updatedMovieData = {
        adult: movieData.movie_details.adult,
        backdropPath: movieData.movie_details.backdrop_path,
        budget: movieData.movie_details.budget,
        id: movieData.movie_details.id,
        overview: movieData.movie_details.overview,
        posterPath: movieData.movie_details.poster_path,
        releaseDate: movieData.movie_details.release_date,
        runtime: movieData.movie_details.runtime,
        title: movieData.movie_details.title,
        voteAverage: movieData.movie_details.vote_average,
        voteCount: movieData.movie_details.vote_count,
        genres: movieData.movie_details.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        similarMovies: movieData.movie_details.similar_movies.map(
          eachMovie => ({
            id: eachMovie.id,
            backdropPath: eachMovie.backdrop_path,
            posterPath: eachMovie.poster_path,
            title: eachMovie.title,
          }),
        ),
        spokenLanguages: movieData.movie_details.spoken_languages.map(
          eachLanguage => ({
            id: eachLanguage.id,
            englishName: eachLanguage.english_name,
          }),
        ),
      }
      console.log(updatedMovieData)
      this.setState({
        movieItemDetails: updatedMovieData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  movieSuccessView = () => {
    const {movieItemDetails} = this.state
    const {
      title,
      runtime,
      adult,
      releaseDate,
      overview,
      backdropPath,
      voteCount,
      voteAverage,
      budget,
    } = movieItemDetails
    const hour = Math.floor(runtime / 60)
    const minute = runtime % 60
    console.log(releaseDate)
    const releasedYear = getYear(new Date(releaseDate))
    const day = getDate(new Date(releaseDate))
    let dateWord
    switch (day) {
      case 1:
        dateWord = 'st'
        break
      case 2:
        dateWord = 'nd'
        break
      case 3:
        dateWord = 'rd'
        break
      default:
        dateWord = 'th'
        break
    }
    const month = getMonth(new Date(releaseDate))
    let releasedMonth
    switch (month) {
      case 0:
        releasedMonth = 'January'
        break
      case 1:
        releasedMonth = 'February'
        break
      case 2:
        releasedMonth = 'March'
        break
      case 3:
        releasedMonth = 'April'
        break
      case 4:
        releasedMonth = 'May'
        break
      case 5:
        releasedMonth = 'June'
        break
      case 6:
        releasedMonth = 'July'
        break
      case 7:
        releasedMonth = 'August'
        break
      case 8:
        releasedMonth = 'September'
        break
      case 9:
        releasedMonth = 'October'
        break
      case 10:
        releasedMonth = 'November'
        break
      default:
        releasedMonth = 'null'
        break
    }

    const {genres, spokenLanguages, similarMovies} = movieItemDetails
    return (
      <>
        <div
          className="movie-top-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            height: '100%',
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="movie-details-card">
            <h1 className="movie-title">{title}</h1>
            <div className="release-info-container">
              <p className="duration">
                {hour}h {minute}m
              </p>
              {adult ? (
                <p className="adult">A</p>
              ) : (
                <p className="not-adult">U/A</p>
              )}
              <p className="release-date">{releasedYear}</p>
            </div>
            <p className="movie-overview">{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-card-container">
          <div className="genre-card">
            <h1 className="genre-title">Genres</h1>
            <ul className="genre-container">
              {genres.map(eachItem => (
                <li className="list-item" key={eachItem.id}>
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-card">
            <h1 className="genre-title">Audio Available</h1>
            <ul className="genre-container">
              {spokenLanguages.map(eachAudio => (
                <li className="list-item" key={eachAudio.id}>
                  <p> {eachAudio.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-card">
            <h1 className="genre-title">Rating Count</h1>
            <p className="list-item">{voteCount}</p>
            <h1 className="genre-title">Rating Average</h1>
            <p className="list-item">{voteAverage}</p>
          </div>
          <div className="genre-card">
            <h1 className="genre-title">Budget</h1>
            <p className="list-item">{budget}</p>
            <h1 className="genre-title"> Release Date</h1>
            <p className="list-item">
              {day}
              {dateWord} {releasedMonth} {releasedYear}
            </p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="similar-heading">More like this</h1>
          <ul className="similar-list-container">
            {similarMovies.map(eachSimilar => (
              <li className="similar-movies-image" key={eachSimilar.id}>
                <img
                  src={eachSimilar.posterPath}
                  alt={eachSimilar.title}
                  className="more-img"
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  movieFailureView = () => (
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
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  movieLoaderView = () => (
    <div className="loader-card" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovieDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.movieLoaderView()
      case apiStatusConstants.failure:
        return this.movieFailureView()
      case apiStatusConstants.success:
        return this.movieSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movies-bg-container" testid="movie-item">
        {/* <Header /> */}
        {this.renderMovieDetailsView()}
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
