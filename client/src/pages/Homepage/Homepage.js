import React, { useEffect } from 'react'

const Homepage = ({ history }) => {
  useEffect(() => {
    history.push('/login')
  }, [])

  return (
    <>
      <h1>Expense Tracker</h1>
    </>
  )
}

export default Homepage
