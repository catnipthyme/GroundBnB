import { csrfFetch } from "./csrf"

// action type constants
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'

export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'

// action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
  spot
});


// thunk action creators
export const thunkLoadSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: "GET"
  })
  // console.log('thunkLoadSpots res: ', res)
  const data = await res.json()
  // console.log('data: ', data)
  // console.log('data.Spots: ', data.Spots)
  dispatch(loadSpots(data.Spots))
}

export const thunkReceiveSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET"
  })
    // console.log('thunkLoadSpots res: ', res)
  if (res.ok) {
    const data = await res.json()
      // console.log('data: ', data)
      // console.log('data.Spots: ', data.Spots)
    dispatch(receiveSpot(data))
    // console.log("data time: ", data)
    return data
  } 

}


// selectors

/// reducer
const spotsReducer = (state = {}, action) => {
  let spotsState
  switch (action.type) {
    case LOAD_SPOTS: {
      spotsState = {};
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot
      });
      return spotsState
    }
    case RECEIVE_SPOT:
      spotsState = action.spot
      return spotsState;
    default:
    return state;
  }

}
export default spotsReducer
