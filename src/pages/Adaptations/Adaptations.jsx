import  { useState, useEffect } from "react";
import { getAdaptations} from "../../services/adaptationsApi"; 
import { useNavigate } from "react-router-dom";
import AddAdaptation from "../../Hooks/AddAdaptation";
import { onAuthStateListener } from "../../context/UsersApi";


const Adaptations = () => {
  const [adaptations, setAdaptations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
 const [showAddAdaptationForm, setShowAddAdaptationForm] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

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

     onAuthStateListener((user) => {
       if (user) {
         setIsAdmin(user.role === "admin");
       } else {
         setIsAdmin(false);
       }
     });
  }, []);

  console.log(adaptations);

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
    <div className="container mx-auto px-4 py-8 bg-orange-50 flex flex-col justify-center items-center gap-10">
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
                <div className="flex-1">
                  <img
                    src={adaptation.moviePoster}
                    alt={`Poster for ${adaptation.movieTitle}`}
                    className="rounded-lg mb-4"
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

      {isAdmin && (
        <>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4 flex justify-center items-center"
            onClick={() => setShowAddAdaptationForm(true)}
          >
            Add Adaptation
          </button>

          {showAddAdaptationForm && (
            <AddAdaptation onClose={() => setShowAddAdaptationForm(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default Adaptations;
