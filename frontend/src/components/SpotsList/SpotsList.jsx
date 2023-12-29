import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadSpots } from "../../store/spots";
import { SpotItem } from "../SpotItem";
import './SpotsList.css'

const SpotsList = () => {
  const dispatch = useDispatch()
  const spotsObj = useSelector((state => state.spots))
  const spots = Object.values(spotsObj)

  useEffect(() => {
    dispatch(thunkLoadSpots())
  }, [dispatch])

  return (
    <div>
      <ul className='allSpotsDisplay'>
        {spots.map((spot) => (
          <SpotItem
            spot={spot}
            key={spot.id}
          />
        ))}
      </ul>
        <h1>Hello Spots</h1>
    </div>
  )
}

export default SpotsList
