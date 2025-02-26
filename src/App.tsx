import { useState, useEffect } from "react";
import './App.css'
import farewell1 from "./assets/farewell1.png"
import farewell2 from "./assets/farewell2.png"
import farewell3 from "./assets/farewell3.png"
import farewell4 from "./assets/farewell4.png"
import wemadeit1 from "./assets/wemadeit1.png"
import wemadeit2 from "./assets/wemadeit2.png"
import wemadeit3 from "./assets/wemadeit3.png"
import wemadeit4 from "./assets/wemadeit4.png"

const FadeImages = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); //  Change every 3 seconds

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [images.length]);

  const opacityTransition = (index) => {
    if (index === 0) {
      return "transition-opacity duration-1000 opacity-100";
    }
    if (index === images.length - 1) {
      if (index === currentImageIndex) {
        return "transition-opacity duration-1000 opacity-100";
      }
      return "transition-opacity duration-1000 opacity-0";
    }
    if (index === currentImageIndex || (index + 1) % images.length === currentImageIndex) {
      return "transition-opacity duration-1000 opacity-100";
    } else {
      return "opacity-0";
    }
  }

  const imageArray = images.map((image, index) => (
    <img
      key={`Image ${index + 1}`}
      src={image}
      alt={`Image ${index + 1}`}
      className={`absolute inset-0 w-128 h-auto object-contain ${opacityTransition(index)}`}
    />
  ))

  return (
    <div className="relative w-128 h-[272px] object-contain rounded-lg mb-4">
      {imageArray}
    </div>
  );
};

const beforeImages = [
  farewell1, farewell2, farewell3, farewell4
];

const afterImages = [
  wemadeit1, wemadeit2, wemadeit3, wemadeit4
];

function SlideShow(images) {
  return (
    <div className="w-128 h-auto justify-center items-center bg-gray-200">
      <FadeImages images={images} />
    </div>
  );
}

const DDayCounter = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null; // D-day has passed
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  let image
  if (timeLeft) {
    image = SlideShow(beforeImages)
  }
  else {
    image = SlideShow(afterImages)
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      {image}
      <h1 className="text-2xl font-bold">
        {timeLeft
          ? (
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl font-bold">아미쿠스가 날 데리러 돌아올 때까지</span>
              <span className="text-2xl">{`${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초`}</span>
            </div>
          )
          : "보고싶었어 아미쿠스! 🎉"}
      </h1>
    </div>
  );
};

export default function App() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <DDayCounter
          targetDate="2028-03-17T00:00:00"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-300 p-2">
        <h4 className="text-black text-center font-bold"><a href="https://echoproject.itch.io/adastra" target="_blank">ADASTRA Visual Novel Link</a></h4>
        <h4 className="text-black text-center font-bold"><a href="https://docs.google.com/spreadsheets/d/1d7krqp6mc05DfyeHV6SidZ_jjSYIl1jv3dNBuhIN4hY/edit?usp=sharing" target="_blank">한국어 버전 링크</a></h4>
      </div>
    </>
  );
}
