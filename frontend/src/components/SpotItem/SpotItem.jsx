// import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import './SpotItem.css'


const SpotItem = ({ spot }) => {
  // const dispatch = useDispatch()
  const ratingScore = spot.avgRating

  const roundedRatingScore = (ratingScore) => {
    if (ratingScore === "No reviews available") {
      return "NEW"
    } else {
    return Number.parseFloat(ratingScore).toFixed(2)
    }
  }


  return (

        <div className='spotTile'>
        <Link
          to={`/spots/${spot.id}`}
          key={spot.id}
          title={spot.name}
        >
          <div className='thumbnailImage'>
            <img
              className='spotPic'
              src={spot.previewImage}
              alt={spot.name}
              />
          </div>
          <div className='spotLocation'>
            <p>{`${spot.city}, ${spot.state}`}</p>
            <p><i className="fas fa-star" />
            {roundedRatingScore(ratingScore)}</p>
          </div>
          <div className='priceTextReview'>
            <p>{`$${spot.price} night`}</p>
            {/* <p><i className="fas fa-star" />
            {roundedRatingScore(ratingScore)}</p> */}
          </div>
          </Link>
        </div>

  )
}

export default SpotItem
