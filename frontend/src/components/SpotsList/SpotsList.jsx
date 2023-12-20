import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadSpots } from "../../store/spots";
import { SpotItem } from "../SpotItem";

const SpotsList = () => {
  const dispatch = useDispatch()
  const spotsObj = useSelector((state => state.spots))
  const spots = Object.values(spotsObj)

  useEffect(() => {
    dispatch(thunkLoadSpots())
  }, [dispatch])

  return (
    <div>
      <ul>
        {spots.map((spot) => (
          <SpotItem
            spot={spot}
            key={spot.id}
            previewImage={spot.previewImage}
          />
        ))}
      </ul>
        <h1>Hello Spots</h1>
    </div>
  )
}

export default SpotsList
