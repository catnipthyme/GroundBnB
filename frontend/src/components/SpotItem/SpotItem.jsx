import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'


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
              style={{ height: 200, width: 200, padding: 20, borderRadius: '10%' }}
              src={spot.previewImage}
              alt={spot.name}
              />
          </div>
          <div className='locationText'>
            {`${spot.city}, ${spot.state}`}
          </div>
          <div className='priceText'>
            {`$${spot.price} night`}
          </div>
          <div className='reviewText'>
            <i className="fas fa-star" />
            {roundedRatingScore(ratingScore)}
          </div>
        </div>
      </Link>
    </ul>
  )
}

export default SpotItem
