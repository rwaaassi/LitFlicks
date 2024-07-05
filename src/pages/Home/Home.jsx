import { useState, useEffect } from "react";
import { getAdaptations } from "../../services/adaptationsApi";
import background from "../../assets/background-home-2.jpg";
// import atonement1 from "../../assets/atonement1.jpg"
import atonement2 from "../../assets/atonement2.jpg";
import shawshank from "../../assets/shawshank.jpg";
import mockingbird from "../../assets/mockingbird.jpg";
import godfather from "../../assets/godfather.jpg";
import gatsby from "../../assets/gatsby.jpg";
import { useNavigate } from "react-router-dom";

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
        const adaptationsWithBackgrounds = adaptationList.map((adaptation) => ({
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

  if (adaptations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen flex">
      {/* Slider Section */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${adaptations[currentIndex].background})`,
          backgroundSize: "cover",
          width: "49.5vw",
        }}
        onClick={() => handleSliderClicked(adaptations[currentIndex])}
      ></div>
      <div className="relative w-1/2 h-full z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-70 w-full"></div>{" "}
        <div className="relative z-20 flex items-center justify-center max-w-5xl mx-auto">
          {adaptations[currentIndex] && (
            <div className="text-center">
              <img
                src={adaptations[currentIndex].bookImage}
                alt={adaptations[currentIndex].bookTitle}
                className="h-72 w-full object-cover mx-auto mb-4 rounded-lg shadow-lg"
                style={{ opacity: 1 }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Welcome Message Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <p className="text-black text-3xl font-semibold mb-4">
          Welcome to LitFlicks
        </p>
        <span className="text-black text-4xl font-bold mb-8">
          Where Literature Meets Cinema
        </span>
        <h1 className="text-2xl font-semibold mb-4">
          Explore our latest additions
        </h1>
      </div>
    </div>
  );
};

export default Home;
