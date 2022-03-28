import React, { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

const User = () => {
  const [user, setUser] = useState()

  const router = useRouter()

  async function Load() {
    if (!localStorage.getItem('access_token')) {
      router.push('/auth')
      return <div>Loading...</div>
    }
    try {
      await fetch('https://sleepy-crag-49787.herokuapp.com/profile', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((user) => setUser(user))
    } catch (e) {
      console.log(e)
    }
  }

  const Generate = useCallback(Load, [user])

  useEffect(() => {
    if (!user) {
      Generate()
    }
  })

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>{user.role}</h1>
    </>
  )
}

export default User
