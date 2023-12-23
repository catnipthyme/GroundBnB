import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Navigation'
import * as sessionActions from '../../store/session'

function CreateNewSpotLink() {
  const sessionUser = useSelector(state => state.session.user)

  console.log('user currently logged in: ', sessionUser)

//   if (!sessionUser) {
//     return null;
//   }

useEffect(() => {
  
})


  return (
    <>
      Placeholder Text
    </>
  )
}

export default CreateNewSpotLink
