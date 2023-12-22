import{ useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { thunkReceiveSpot } from '../../store/spots';


const SpotDetail = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()
  // console.log(spotId)
  const session = useSelector(state => state.session)
  // console.log(session)
  // const reviews = useSelector(state => state.reviews)
  // console.log('review list time: ', reviews)
  const spot = useSelector(state => state.spots)
  console.log("spot results: ", spot)
  // const owner = useSelector(state => spot.Owner)
  console.log('spot owner data maybe: ', spot.Owner)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [owner, setOwner] = useState('')
  const numReviews = spot.numReviews
  const ratingScore = spot.avgRating


  const roundedRatingScore = (ratingScore) => {
    if (ratingScore === "No reviews available") {
      return
    } else {
    return Number.parseFloat(ratingScore).toFixed(2)
    }
  }

  const reviewReviews = (numReviews) => {
    if (numReviews === 1) {
      return '1 review'
    } else if (spot.numReviews > 1) {
      return `${numReviews} reviews`
    } else return 'New'
  }

  const noReviews = (numReviews) => {
    if (numReviews === 'No reviews available') return 'Be the first to post a review!'
    else return 'REVIEWS HERE'
  }

  useEffect(() => {
    dispatch(thunkReceiveSpot(spotId))
  }, [dispatch, spotId])

  if (!spot.Owner) return

  if (!spot) return null


  return (
  <div className='spotsPageLayout'>
    <div className='spotInfo'>
      <div className='basicSpotInfo'>
        <h1>Greetings from Scenic {spot.name}~</h1>
        <h2 id='spotLocation'>{spot.city}, {spot.state}, {spot.country}</h2>
      </div>
      <div className='spotImages'>
        <div id='mainImg'>
          main image here
        </div>
        <div id='subImgs'>
          four small images go here
        </div>
      </div>
      <div className='spotDetails'>
        <div className='spotTextDetails'>
        <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
          <p className='spotDescription'>{spot.description}</p>
        </div>
        <div className='bookingDetails'>
          <div className='bookingPriceReviews'>
            <h2>${spot.price}</h2>
            <div className='nightReviewData'>
              <p>night</p>
              <p><i className="fas fa-star" /> {roundedRatingScore(ratingScore)} - {reviewReviews(numReviews)}</p>
            </div>
          </div>
          <button className='reserveButton'>Reserve Button</button>
        </div>
      </div>
    </div>
      <div>
        <h1><i className="fas fa-star" /> {roundedRatingScore(ratingScore)} - {reviewReviews(numReviews)}</h1>
        <button className='reviewButton'>Post Your Review</button>
      <div>
        {noReviews(numReviews)}
      </div>
    </div>
  </div>
  )
}


export default SpotDetail;
