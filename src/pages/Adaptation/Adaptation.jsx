import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { getAdaptationById} from "../../services/adaptationsApi";
import DeleteAdaptation from "../../Hooks/DeleteAdaptation";


const Adaptation = () => {
  const { adaptationId } = useParams();
  const [adaptation, setAdaptation] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAdaptation = async () => {
      try {
        const adaptationData = await getAdaptationById(adaptationId);
        setAdaptation(adaptationData);
      } catch (error) {
        console.error("Error fetching adaptation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdaptation();
  }, [adaptationId]);

    // const handleDelete = async () => {
    //   const confirmDelete = window.confirm(
    //     "Are you sure you want to delete this adaptation?"
    //   );
    //   if (confirmDelete) {
    //     try {
    //       await deleteAdaptation(adaptation.id);
    //       navigate("/");
    //     } catch (error) {
    //       console.error("Failed to delete adaptation:", error);
    //     }
    //   }
    // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adaptation) {
    return <div>Adaptation not found</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Movie Details */}
      <div className="flex-1">
        <img
          src={adaptation.moviePoster}
          alt={`Poster for ${adaptation.movieTitle}`}
          className="rounded-lg mb-4 object-cover"
          style={{ maxHeight: "300px" }}
        />
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{adaptation.movieTitle}</h2>
          <p className="text-gray-600 mb-2">
            Director: {adaptation.movieDirector}
          </p>
          <p className="text-gray-600 mb-2">
            Duration: {adaptation.movieDuration} minutes
          </p>
          <p className="text-gray-800">{adaptation.movieDesc}</p>
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1">
        <img
          src={adaptation.bookImage}
          alt={`Cover for ${adaptation.bookTitle}`}
          className="rounded-lg mb-4 object-cover"
          style={{ maxHeight: "300px" }}
        />
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{adaptation.bookTitle}</h3>
          <p className="text-gray-600 mt-4">Author: {adaptation.bookAuthor}</p>
          <p className="text-gray-600 mb-2">Pages: {adaptation.bookPages}</p>
          <p className="text-gray-800">{adaptation.bookDesc}</p>
        </div>
      </div>
      <DeleteAdaptation adaptation={adaptation}/>
    </div>
  );
};

export default Adaptation;
