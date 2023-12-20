import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import './SpotItem.css'


const SpotItem = ({ spot }) => {
  const dispatch = useDispatch()
  const ratingScore = spot.avgRating

  const roundedRatingScore = (ratingScore) => {
    return Number.parseFloat(ratingScore).toFixed(2)
  }


  return (
    <ul>
      <Link
        className='allSpotTiles'
        to={`/spots/${spot.id}`}
        key={spot.id}
        title={spot.name}
      >
        <div className='spotTile'>
          <div className='thumbnailImage'>
            <img
              className='spotPic'
              src={spot.previewImage}
              alt={spot.name}
              />
          </div>
          <div className='spotLocation'>
            {`${spot.city}, ${spot.state}`}
          </div>
          <div className='priceTextReview'>
            <p>{`$${spot.price} night`}</p>
            <p><i className="fas fa-star" />
            {roundedRatingScore(ratingScore)}</p>
          </div>
        </div>
      </Link>
    </ul>
  )
}

export default SpotItem
