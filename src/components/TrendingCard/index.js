import './index.css'

import Slider from 'react-slick'

import {Link} from 'react-router-dom'

const TrendingCard = props => {
  const {movieDetails} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider {...settings}>
      {movieDetails.map(each => {
        const {posterPath, title, id} = each
        return (
          <li className="movie-item" key={id}>
            <Link to={`/movies/${id}`}>
              <img src={posterPath} alt={title} className="poster-img" />
            </Link>
          </li>
        )
      })}
    </Slider>
  )
}

export default TrendingCard
