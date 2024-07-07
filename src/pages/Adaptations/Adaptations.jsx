import { useState, useEffect } from "react";
import { getAdaptations } from "../../services/adaptationsApi";
import { useNavigate } from "react-router-dom";
import AddAdaptation from "../../Hooks/AddAdaptation";
import { onAuthStateListener } from "../../context/UsersApi";

const Adaptations = () => {
  const [adaptations, setAdaptations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showAddAdaptationForm, setShowAddAdaptationForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAdaptations = async () => {
    try {
      const adaptationsData = await getAdaptations();
      setAdaptations(adaptationsData || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdaptations();

    onAuthStateListener((user) => {
      if (user) {
        setIsAdmin(user.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!showAddAdaptationForm) {
      fetchAdaptations();
    }
  }, [showAddAdaptationForm]);

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
    <div className="container mx-auto  px-24 py-12 shadow-xl border-2 border-orange-100 bg-orange-50 flex flex-col justify-center items-center gap-10 ">
      {adaptations.length === 0 ? (
        <p className="text-gray-600">No adaptations found.</p>
      ) : (
        <ul className="grid gap-10 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3">
          {adaptations.map((adaptation) => (
            <li
              key={adaptation.id}
              className="bg-[#153448] rounded-lg shadow-lg p-4 cursor-pointer w-full h-[500px] text-white relative mr-36 transition-transform  duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              
              onClick={() => handleAdaptationClicked(adaptation)}
            >
              <div className="relative flex justify-center  items-center h-[80%] w-full">
                <div className="relative mr-36">
                  <img
                    src={adaptation.bookImage}
                    alt={`Poster for ${adaptation.movieTitle}`}
                    className="rounded-lg ml-14"
                    style={{ maxHeight: "18.75rem" }}
                  />
                  <img
                    src={adaptation.moviePoster}
                    alt={`Cover for ${adaptation.bookTitle}`}
                    className="rounded-lg absolute z-20"
                    style={{
                      maxHeight: "18.75rem",
                      left: "60%",
                      top: "3.125rem",
                    }}
                  />
                </div>
                <h2 className="absolute bottom-0 right-30 top-[400px] text-xl font-bold bg-opacity-75 p-2 rounded-lg">
                  {adaptation.movieTitle}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isAdmin && (
        <>
          <button
            className="px-4 py-2 text-white rounded-md mb-4 flex justify-center items-center bg-[#153448] hover:bg-[#2e6f9a]"
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
