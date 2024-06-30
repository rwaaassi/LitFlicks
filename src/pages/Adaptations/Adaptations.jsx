import  { useState, useEffect } from "react";
import { getAdaptations } from "../../services/adaptationsApi"; 
import { useNavigate } from "react-router-dom";


const Adaptations = () => {
  const [adaptations, setAdaptations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAdaptations = async () => {
      try {
        const adaptationsData = await getAdaptations(); 
        setAdaptations(adaptationsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAdaptations();
  }, []);

   const handleAdaptationClicked = (adaptation) => {
     navigate(`/adaptation/${adaptation.id}`);
   };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-50">
      {/* <h1 className="text-3xl font-bold mb-4">All Adaptations</h1> */}
      {adaptations.length === 0 ? (
        <p className="text-gray-600">No adaptations found.</p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {adaptations.map((adaptation) => (
            <li
              key={adaptation.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => handleAdaptationClicked(adaptation)}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 ">
                  <img
                    src={adaptation.moviePoster}
                    alt={`Poster for ${adaptation.movieTitle}`}
                    className="rounded-lg mb-4 justify-around items-center"
                    style={{ maxHeight: "300px" }}
                  />
                  <h2 className="text-xl font-bold">{adaptation.movieTitle}</h2>
                  <p className="text-gray-600">
                    Movie Duration: {adaptation.movieDuration} minutes
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src={adaptation.bookImage}
                    alt={`Cover for ${adaptation.bookTitle}`}
                    className="rounded-lg mb-4"
                    style={{ maxHeight: "300px" }}
                  />
                  <h3 className="text-xl font-bold">{adaptation.bookTitle}</h3>
                  <p className="text-gray-600">
                    Book Pages: {adaptation.bookPages}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Adaptations;