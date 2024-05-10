import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='content'>
      <h1>Imago et Audio</h1>
      <h4>Process your image and audio here.</h4>
      <Link to="/image-compresser"><button className='bn632-hover bn25'>Image Compresser</button></Link>
      <Link to="/image-resizer"><button className='bn632-hover bn25'>Image Resizer</button></Link>
      <Link to="/audio-compresser"><button className='bn632-hover bn25'>Audio Compresser</button></Link>
    </div>
  )
}

export default Home
