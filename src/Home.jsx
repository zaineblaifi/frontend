import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>

      <h1>Hello</h1>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Signup</Link>
    </div>
  )
}

export default Home