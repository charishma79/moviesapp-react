import './index.css'

const HomePoster = props => {
  const {posterDetails} = props
  const {title, overview} = posterDetails
  return (
    <div className="poster-details">
      <h1 className="name"> {title}</h1>
      <p className="content">{overview}</p>
      <button type="button" className="play-btn">
        Play
      </button>
    </div>
  )
}

export default HomePoster
