import{ useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { thunkReceiveSpot } from '../../store/spots';
import './SpotDetail.css'


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

  const spotImageArr = spot.SpotImages
  // console.log('spot image array : ', spotImageArr)

  const mainImage = (spotImageArr) => {
    if (!spotImageArr) return 'https://cdn.discordapp.com/attachments/770853160410939414/1187823768446435450/wood-fibre-boards-2857073_1280.jpg?ex=65984a17&is=6585d517&hm=00ad4dd099ca9bba189d13de1ceed44aaca0cc2d972b475e13469115922efbf3&'
    return spotImageArr[0].url
  }

  const sideImg1 = (spotImageArr) => {
    if (!spotImageArr[1]) return 'https://cdn.discordapp.com/attachments/770853160410939414/1187823768446435450/wood-fibre-boards-2857073_1280.jpg?ex=65984a17&is=6585d517&hm=00ad4dd099ca9bba189d13de1ceed44aaca0cc2d972b475e13469115922efbf3&'
    return spotImageArr[1].url
  }

  const sideImg2 = (spotImageArr) => {
    if (!spotImageArr[2]) return 'https://cdn.discordapp.com/attachments/770853160410939414/1187823768446435450/wood-fibre-boards-2857073_1280.jpg?ex=65984a17&is=6585d517&hm=00ad4dd099ca9bba189d13de1ceed44aaca0cc2d972b475e13469115922efbf3&'
    return spotImageArr[2].url
  }

  const sideImg3 = (spotImageArr) => {
    if (!spotImageArr[3]) return 'https://cdn.discordapp.com/attachments/770853160410939414/1187823768446435450/wood-fibre-boards-2857073_1280.jpg?ex=65984a17&is=6585d517&hm=00ad4dd099ca9bba189d13de1ceed44aaca0cc2d972b475e13469115922efbf3&'
    return spotImageArr[3].url
  }

  const sideImg4 = (spotImageArr) => {
    if (!spotImageArr[4]) return 'https://cdn.discordapp.com/attachments/770853160410939414/1187823768446435450/wood-fibre-boards-2857073_1280.jpg?ex=65984a17&is=6585d517&hm=00ad4dd099ca9bba189d13de1ceed44aaca0cc2d972b475e13469115922efbf3&'
    return spotImageArr[4].url
  }

  // console.log('plz work: ', mainImage(spotImageArr))

  useEffect(() => {
    dispatch(thunkReceiveSpot(spotId))
  }, [dispatch, spotId])

  const handleClick = async (e) => {
    e.preventDefault();
    alert("Feature coming soon.")
  };

  if (!spot.Owner || !spotImageArr) return

  if (!spot) return null


  return (
  <div className='spotsPageLayout'>
    <div className='spotInfo'>
      <div className='basicSpotInfo'>
        <h1>Greetings from Scenic {spot.name}~</h1>
        <h2 id='spotLocation'>{spot.city}, {spot.state}, {spot.country}</h2>
      </div>
      <div className='spotImages'>
        <img id='mainImg' src={mainImage(spotImageArr)} />
        <div id='subImgSection'>
          <img class='subImgs' src={sideImg1(spotImageArr)} />
          <img class='subImgs' src={sideImg2(spotImageArr)} />
          <img class='subImgs' src={sideImg3(spotImageArr)} />
          <img class='subImgs' src={sideImg4(spotImageArr)} />
        </div>
      </div>
      <div className='spotDetails'>
        <div className='spotTextDetails'>
          <h1 className='spotDescription'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
          <p className='spotDescription'>{spot.description}</p>
        </div>
        <div className='bookingDetails'>
          <div className='bookingPriceReviews'>
            <div className='nightPriceData'>
              <h2>${spot.price}</h2>
              <p>night</p>
            </div>
            <p className='littleReview'><i className="fas fa-star" /> {roundedRatingScore(ratingScore)} - {reviewReviews(numReviews)}</p>
          </div>
          <button className='reserveButton' onClick={handleClick}>Reserve Button</button>
        </div>
      </div>
    </div>
      <div>
        <h1><i className="fas fa-star" /> {roundedRatingScore(ratingScore)} - {reviewReviews(numReviews)}</h1>
        <button
          className='reviewButton'
        >
          Post Your Review
        </button>
      <div>
        {noReviews(numReviews)}
      </div>
    </div>
  </div>
  )
}


export default SpotDetail;
