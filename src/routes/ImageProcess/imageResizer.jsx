import React from 'react';

const ImageResizer = () => {
  const resizeImage = (event) => {
    const file = event.target.files[0];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const reader = new FileReader();
    reader.onload = function(e) {
      img.onload = function() {
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataURL = canvas.toDataURL('image/jpeg');
        document.getElementById('resizedImage').src = dataURL;
        document.getElementById('downloadButton').onclick = function() {
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'resized_image.jpg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        document.getElementById('downloadButton').style.display = 'inline-block'; // Show the download button
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
  };

  return (
    <div className='image-rsz'>
      <label>Select Image</label>
      <input type="file" accept="image/*" onChange={resizeImage} />
      <canvas id="canvas" style={{ display: 'none' }}></canvas>
      <img id="resizedImage" src="" alt="Resized Image" />
      <button className='bn632-hover bn25' id="downloadButton" style={{ display: 'none' }}>Download Resized Image</button>
    </div>
  );
};

export default ImageResizer;
