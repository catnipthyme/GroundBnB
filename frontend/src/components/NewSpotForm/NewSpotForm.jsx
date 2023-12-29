import { useState } from 'react';
import { useDispatch } from 'react-redux'

import './NewSpotForm.css'

const NewSpotForm = () => {

  const dispatch = useDispatch()
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [region, setRegion] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [previewImg, setPreviewImg] = useState("")
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [image4, setImage4] = useState("")

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    return null
  }

  return (
    <form
      className='newSpotForm'
      onSubmit={handleSubmit}
    >
      <div className='location'>
        <div className='formHeader'>
          <h1>Create a New Spot</h1>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </div>
        <div className='locationInputs'>
          <div className='locationSegment'>
            <label>Country</label>
            <input
              type='text'
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className='locationSegment'>
            <label>Street Address</label>
            <input
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='locationSegment'>
            <label>City</label>
            <input
              type='text'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className='locationSegment'>
            <label>State</label>
            <input
              type='text'
              placeholder='State or Province'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className='description'>
        <div className='formHeader'>
          <h2>Describe your place to guests.</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            placeholder='Please write at least 30 characters'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='title'>
        <div className='formHeader'>
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type='text'
            placeholder='Name of your spot'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='price'>
        <div className='formHeader'>
          <h2>Set a base price for your spot</h2>
          <p>Competetive pricing can help your listing stand out and rank higher in search results.</p>
          $ <input
            type='number'
            placeholder='Price per night (USD)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='images'>
        <div className='formHeader'>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type='text'
            placeholder='Preview Image URL'
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Image URL'
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
          />
          <input
            type='text'
            placeholder='Image URL'
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
          <input
            type='text'
            placeholder='Image URL'
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          />
          <input
            type='text'
            placeholder='Image URL'
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
          />
      </div>
      </div>
      <button className='createSpotButton'>Create Spot</button>
    </form>
  )
}


export default NewSpotForm
