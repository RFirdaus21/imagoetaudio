import React, { useState } from 'react';

const ImageCompresser = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImageData, setCompressedImageData] = useState(null); // Stores compressed image data URL

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const compressImage = async (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      // Resize image proportionally to fit within a certain width
      const MAX_WIDTH = 800; // Adjust this value as needed
      let width = img.width;
      let height = img.height;
      if (width > MAX_WIDTH) {
        const ratio = MAX_WIDTH / width;
        width = MAX_WIDTH;
        height *= ratio;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to compressed image data and update state
      setCompressedImageData(canvas.toDataURL('image/jpeg', 0.8)); 
    };
    img.src = URL.createObjectURL(image);
  };

  const handleDownloadImage = () => {
    if (compressedImageData) {
      const link = document.createElement('a');
      link.href = compressedImageData;
      link.download = 'compressed_image.jpg';
      link.click();
    }
  };

  return (
    <div className='image-comp'>
      <label htmlFor="file-upload">Select Image</label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <button className='bn632-hover bn25' onClick={() => compressImage(selectedImage)}>Compress</button>
      )}
      {compressedImageData && (
        <div className='compressed'>
          {/* Conditionally render the compressed image based on data URL existence */}
          {compressedImageData && <img src={compressedImageData} alt="Compressed Image" />}
          <button className='bn632-hover bn25' onClick={handleDownloadImage}>Download</button>
        </div>
      )}
    </div>
  );
};

export default ImageCompresser;
