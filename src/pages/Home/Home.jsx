import { useState, useEffect } from "react";
import { getAdaptations } from "../../services/adaptationsApi";
import background from "../../assets/background-home-2.jpg";
// import atonement1 from "../../assets/atonement1.jpg"
import atonement2 from "../../assets/atonement2.jpg";
import shawshank from "../../assets/shawshank.jpg";
import mockingbird from "../../assets/mockingbird.jpg";
import godfather from "../../assets/godfather.jpg";
import gatsby from "../../assets/gatsby.jpg";
import { useNavigate, Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";

const Home = () => {
  const [adaptations, setAdaptations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const adaptationBackgrounds = {
    //  `url(${atonement1})`,
    "Atonement": atonement2,
    "The Shawshank Redemption": shawshank,
    "To Kill a Mockingbird": mockingbird,
    "The Godfather": godfather,
    "The Great Gatsby": gatsby,
  };

useEffect(() => {
  const fetchAdaptations = async () => {
    try {
      const adaptationList = await getAdaptations();
      const adaptationsWithBackgrounds = adaptationList
        .filter((adaptation) => adaptationBackgrounds[adaptation.bookTitle]) // Filter out adaptations without a background
        .map((adaptation) => ({
          ...adaptation,
          background: adaptationBackgrounds[adaptation.bookTitle],
        }));
      const shuffledAdaptations = adaptationsWithBackgrounds.sort(
        () => 0.5 - Math.random()
      );
      setAdaptations(shuffledAdaptations.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch adaptations:", error);
    }
  };
  fetchAdaptations();
}, []);

  useEffect(() => {
    const sliderId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adaptations.length);
    }, 2500);
    return () => {
      clearInterval(sliderId);
    };
  }, [adaptations.length]);

  const handleSliderClicked = (adaptation) => {
    navigate(`/adaptation/${adaptation.id}`);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };


  if (adaptations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative w-full flex "
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Welcome Message Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-orange-50">
        <p className="text-[#153448] text-3xl font-semibold mb-4">
          Welcome to LitFlicks
        </p>
        <span className="text-[#153448] text-3xl font-bold mb-8">
          Where Literature Meets Cinema
        </span>
        <p className=" text-lg font-semibold mb-4">
          <Link
            to="/adaptations"
            className="text-[#153448] hover:text-red-600"
          >
            Explore our Latest Additions &#10095;&#10095;
          </Link>
        </p>
      </div>

      {/* Slider Section */}
      <div className="relative w-1/2 h-full z-10 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 cursor-pointer"
          style={{
            backgroundImage: `url(${adaptations[currentIndex].background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
          onClick={() => handleSliderClicked(adaptations[currentIndex])}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70 w-full"></div>
        <div className="relative z-20 flex items-center justify-center max-w-5xl mx-auto cursor-pointer">
          {adaptations[currentIndex] && (
            <div
              className="text-center"
              onClick={() => handleSliderClicked(adaptations[currentIndex])}
            >
              <img
                src={adaptations[currentIndex].bookImage}
                alt={adaptations[currentIndex].bookTitle}
                className="h-72 w-full object-cover mx-auto mb-4 rounded-lg shadow-lg"
                style={{ opacity: 1 }}
              />
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {adaptations.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
