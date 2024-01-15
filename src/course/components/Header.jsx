import React from 'react'

const Header = ({ courses }) => {
    
  return (
    <>
        <h1>Web development curriculum</h1>
        <h3>{courses[0].name}</h3>
    </>
  )
}

export default Header