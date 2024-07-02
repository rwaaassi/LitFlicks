import { useState, useEffect } from "react";
import { getAdaptations } from "../../services/adaptationsApi";
import background from "../../assets/background-home-2.jpg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Home = () => {
  const [adaptations, setAdaptations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAdaptations = async () => {
      try {
        const adaptationList = await getAdaptations();
        const shuffledAdaptations = adaptationList.sort(
          () => 0.5 - Math.random()
        );
        setAdaptations(shuffledAdaptations.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch adaptations:", error);
      }
    };
    fetchAdaptations();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % adaptations.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + adaptations.length) % adaptations.length
    );
  };

  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentIndex, adaptations.length]);

  if (adaptations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative h-screen w-full bg-orange-50">
      <img
        src={background}
        alt="background"
        className="h-screen w-full object-fill"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60 flex flex-col items-center justify-center space-y-4">
        <p className="text-white text-3xl font-semibold">
          Welcome to LitFlicks
        </p>
        <span className="text-white text-4xl font-bold">
          Where Literature Meets Cinema
        </span>
      </div>

      <div className="bg-orange-50">
        {adaptations.length > 0 && (
          <div className="relative w-80  mx-auto bg-blue-300">
            <div className="flex items-center justify-between">
              <FiChevronLeft
                className="text-white text-3xl cursor-pointer bg-black/20 rounded"
                onClick={prevSlide}
              />
              <div className="w-full bg-blue-300 p-4 rounded-lg flex items-center justify-center ">
                {adaptations[currentIndex] && (
                  <div className="text-center">
                    <img
                      src={adaptations[currentIndex].moviePoster}
                      alt={adaptations[currentIndex].movieTitle}
                      className="h-72 mx-auto mb-4"
                    />
                    <h2 className="text-lg font-semibold">
                      {adaptations[currentIndex].movieTitle}
                    </h2>
                  </div>
                )}
              </div>
              <FiChevronRight
                className="text-white text-3xl cursor-pointer  bg-black/20 rounded"
                onClick={nextSlide}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
