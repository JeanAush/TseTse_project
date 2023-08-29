import React, {useState, useEffect} from 'react'
const TsetseImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, [images]);

  
    return (
    <div className="tsetse-image-slider">
      {images.map((image, index)=>(
        <img 
        key={index}
          src={image}
          alt={`Tsetse Fly Slide ${index}`}
          className={`slider-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  )}
  
  export default TsetseImageSlider;