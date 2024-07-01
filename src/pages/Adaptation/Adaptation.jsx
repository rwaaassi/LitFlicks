import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdaptationById } from "../../services/adaptationsApi";
import DeleteAdaptation from "../../Hooks/DeleteAdaptation";
import EditAdaptation from "../../Hooks/EditAdaptation";

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

  const handleSave = (label, value) => {
    setAdaptation((prevAdaptation) => ({
      ...prevAdaptation,
      [label]: value,
    }));
  };

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
        <div className="relative">
          <EditAdaptation
            adaptationId={adaptationId}
            onSave={(value) => handleSave("moviePoster", value)}
          />
          <img
            src={adaptation.moviePoster}
            alt={`Poster for ${adaptation.movieTitle}`}
            className="rounded-lg mb-4 object-cover"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <EditAdaptation
              // label="movieTitle"
              value={adaptation.movieTitle}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("movieTitle", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="movieDirector"
              value={adaptation.movieDirector}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("movieDirector", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="movieDuration"
              value={adaptation.movieDuration}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("movieDuration", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="movieDesc"
              value={adaptation.movieDesc}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("movieDesc", value)}
            />
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1">
        <div className="relative">
          <EditAdaptation
            // label="bookImage"
            // value={adaptation.bookImage}
            adaptationId={adaptationId}
            onSave={(value) => handleSave("bookImage", value)}
          />
          <img
            src={adaptation.bookImage}
            alt={`Cover for ${adaptation.bookTitle}`}
            className="rounded-lg mb-4 object-cover"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <EditAdaptation
              // label="bookTitle"
              value={adaptation.bookTitle}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("bookTitle", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="bookAuthor"
              value={adaptation.bookAuthor}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("bookAuthor", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="bookPages"
              value={adaptation.bookPages}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("bookPages", value)}
            />
          </div>
          <div className="flex items-center">
            <EditAdaptation
              // label="bookDesc"
              value={adaptation.bookDesc}
              adaptationId={adaptationId}
              onSave={(value) => handleSave("bookDesc", value)}
            />
          </div>
        </div>
      </div>

      {/* Delete Adaptation */}
      <DeleteAdaptation adaptation={adaptation} />
    </div>
  );
};

export default Adaptation;
