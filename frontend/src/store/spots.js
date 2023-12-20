import { csrfFetch } from "./csrf"

// action type constants
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'

// action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

// thunk action creators
export const thunkLoadSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: "GET"
  })
  console.log('thunkLoadSpots res: ', res)
  const data = await res.json()
  console.log('data: ', data)
  console.log('data.Spots: ', data.Spots)
  dispatch(loadSpots(data.Spots))
}


// selectors

/// reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = {};
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot
      });
      return spotsState
    }
    default:
    return state;
  }

}
export default spotsReducer
