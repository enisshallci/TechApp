import { useEffect, useRef, useState } from 'react';
import './Offers.css'
const Data = [
    {
      url: "https://images.unsplash.com/photo-1536632087471-3cf3f2986328?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        text: "Cameras",
        description1 :"Looking to upgrade your photography game?",
        description2: "Upgrade your photography game with our ecommerce camera section."
    },
    {
      url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        text: 'Printers',
        description1 :"Upgrade your printing game with our ecommerce printer section. ",
        description2: "Featuring top brands and knowledgeable staff to help you find the perfect printer.."
    },
    {
      url: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: 'Laptops',
      description1 :"We offer a wide range of high-quality laptops.",
      description2: "From top brands such as Dell, HP, and Apple, so you can find the perfect device to meet your needs."
    },
    {
      url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
      text: 'Headphones',
      description1 :"Browse our selection of high-quality headphones.",
      description2: "From top brands such as Bose and Sony and find the perfect pair to suit your style and budget."
    },
    {
      url: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      text: 'Monitors',
      description1 :"We offer a wide selection of high-quality monitors",
      description2: "From top brands such as Dell and Samsung, so you can find the perfect display to suit your needs."
     },
    {
      url: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      text: 'Tablets',
      description1 :"Browse our selection of high-quality tablets",
      description2: "From top brands such as Apple and Microsoft and find your device to stay connected on-the-go."
    },
    {
      url: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      text: 'Keyboards',
      description1 :"We offer a wide range of high-quality keyboards",
      description2: "From brands such as Logitech and Corsair, so you can find the perfect keyboard to suit your needs."
    },
]
const delay = 2500;
export const Offers =()=>{
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
  
  
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === Data.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
  
      return () => {
        resetTimeout();
      };
    }, [index]);
  
    return (
        <div className='Offers' id='offers'>
      <div className="slideshow">
      <div className="slideshowSlider"  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
      {Data.map((backgroundImage, index) => (
            <div className="slide" key={index} style={{ 'backgroundImage': `url(${backgroundImage.url})`,'backgroundPosition':'center' }}> <div className='description'><span data-aos-duration="500" data-aos="fade-right" className='text'>{backgroundImage.text}</span><p data-aos-duration="500" data-aos="fade-left">{backgroundImage.description1}</p><p data-aos-duration="500" data-aos="fade-left">{backgroundImage.description2}</p></div></div>
            
          ))}
      </div>
      <div className="slideshowDots">
          {Data.map((_, idx) => (
            <div key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}></div>
          ))}
        </div>
      </div>
      </div>
    )
}