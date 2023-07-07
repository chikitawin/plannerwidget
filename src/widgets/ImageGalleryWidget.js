import React, { useEffect, useState, useRef } from 'react'
import { data } from '../data';
import "../styles/image.css"

export default function ImageGalleryWidget() {
    const [myImages, setMyImages] = useState([]);
    const [index, setIndex] = useState(0);
    const delay = 2500;
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        setMyImages(data);
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === myImages.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index])

    return (
    <div style={{ minWidth: 400 }}>
        <div className="slideshow">
            <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {myImages.map((currentImage, index) => (
                    <div className="slide" key={index}>
                        <img src={currentImage.path} alt={currentImage.name} className="center"/>
                        <p style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "row", 
                            fontWeight: "bold",
                            fontSize: "20px"
                            }}>{currentImage.name}</p>
                    </div>
                ))}
            </div>
            <div className="slideshowDots">
                {myImages.map((_, idx) => (
                    <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`}
                    onClick={() => {
                        setIndex(idx);
                    }}></div>
                ))}
            </div>
        </div>
    </div>
    )
}