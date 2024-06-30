import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdaptationById } from "../../services/adaptationsApi";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adaptation) {
    return <div>Adaptation not found</div>;
  }

  return (
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
        <p className="text-gray-600">Book Pages: {adaptation.bookPages}</p>
      </div>
    </div>
  );
};

export default Adaptation;
