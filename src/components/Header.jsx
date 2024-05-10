import React from 'react'

const Header = () => {
  return (
    <nav className='container'>
        <div class="navbar">
           <div className='left'>
           <a href="/">Home</a>
            <a href="/about">About</a>
            <div class="dropdown">
                <button class="dropbtn">Features
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="/image-compresser">Image Compression</a>
                    <a href="/image-resizer">Image Resize</a>
                    <a href="/audio-compresser">Audio Compression</a>
                </div>
            </div>
           </div>
            <div className='mid'>
                <a>Imago et Audio</a>
            </div>
        </div>
        
    </nav>
    )
}

export default Header