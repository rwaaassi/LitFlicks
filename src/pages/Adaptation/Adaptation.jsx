import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAdaptationById,
  useUpdateAdaptation,
  getUserComment,
  getAllComments,
} from "../../services/adaptationsApi";
import DeleteAdaptation from "../../Hooks/DeleteAdaptation";
import EditAdaptation from "../../Hooks/EditAdaptation";
import Table from "../../components/Table";
import { onAuthStateListener } from "../../context/UsersApi";
import { renderComparison } from "../../Hooks/EditAdaptation";
import Comments from "../../components/Comments";

const Adaptation = () => {
  const { adaptationId } = useParams();
  const [adaptation, setAdaptation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateAdaptation } = useUpdateAdaptation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchAdaptation = async () => {
      try {
        const adaptationData = await getAdaptationById(adaptationId);
        if (!adaptationData.tableData) {
          adaptationData.tableData = [];
        }
        setAdaptation(adaptationData);
        const comments = await getAllComments(adaptationId);
        setAllComments(comments);
      } catch (error) {
        console.error("Error fetching adaptation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdaptation();
  }, [adaptationId]);

  useEffect(() => {
    onAuthStateListener(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsAdmin(authUser.role === "admin");
        await fetchUserComment(authUser.uid, adaptationId);
      } else {
        setUser(null);
        setIsAdmin(false);
        setHasCommented(false);
      }
    });
  }, [adaptationId]);

  const fetchUserComment = async (userId, adaptationId) => {
    try {
      const userComment = await getUserComment(userId, adaptationId);
      if (userComment) {
        setComment(userComment.text);
        setCommentId(userComment.id);
        setHasCommented(true);
      } else {
        setComment("");
        setCommentId(null);
        setHasCommented(false);
      }
    } catch (error) {
      console.error("Error fetching user comment:", error);
    }
  };

  const handleSave = async (field, value) => {
    await updateAdaptation(adaptation.id, { [field]: value });
    setAdaptation((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adaptation) {
    return <div>Adaptation not found</div>;
  }

  return (
    <div className="bg-orange-50 p-10">
      <div className="bg-orange-50 flex flex-col">
        <div className="container flex flex-col p-4 md:p-10 items-center mx-auto">
          {/* Movie Details */}
          <div className="flex flex-col bg-[#faeddd] md:flex-row items-centre gap-4 md:gap-8 text-orange-50 rounded-lg border-2 border-white shadow-lg p-10 w-full md:w-auto">
            <div className="w-full md:w-[25rem] h-auto md:h-[30rem]">
              {isAdmin && (
                <EditAdaptation
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("moviePoster", value)}
                />
              )}
              <img
                src={adaptation.moviePoster}
                alt={`Poster for ${adaptation.movieTitle}`}
                className="rounded-lg object-cover w-full md:w-[25rem] h-auto md:h-[30rem] p-4"
              />
            </div>
            <div className="flex flex-col justify-start w-full overflow-auto max-h-[30rem]">
              <div className="bg-[#153448] rounded-lg  mt-20 p-10">
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.movieTitle}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("movieTitle", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Title:{" "}
                    <span className="font-normal">{adaptation.movieTitle}</span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.movieDirector}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("movieDirector", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Director:{" "}
                    <span className="font-normal">
                      {adaptation.movieDirector}
                    </span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.movieDuration}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("movieDuration", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Duration:{" "}
                    <span className="font-normal text-white">
                      {adaptation.movieDuration} Minutes
                    </span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.movieDesc}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("movieDesc", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Description:{" "}
                    <span className="font-normal">{adaptation.movieDesc}</span>
                  </h2>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col bg-[#faeddd] md:flex-row items-start gap-4 md:gap-8 text-orange-50 rounded-lg mt-8 border-2 border-white shadow-lg p-10">
            <div className="w-full md:w-[25rem] h-auto md:h-[30rem]">
              {isAdmin && (
                <EditAdaptation
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("bookImage", value)}
                />
              )}
              <img
                src={adaptation.bookImage}
                alt={`Cover for ${adaptation.bookTitle}`}
                className="rounded-lg object-cover w-full md:w-[25rem] h-auto md:h-[30rem] p-4"
              />
            </div>
            <div className="flex flex-col justify-start w-full overflow-auto max-h-[30rem]">
              <div className="bg-[#153448] rounded-lg mt-20 p-10">
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.bookTitle}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("bookTitle", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Title:{" "}
                    <span className="font-normal">{adaptation.bookTitle}</span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.bookAuthor}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("bookAuthor", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Author:{" "}
                    <span className="font-normal">{adaptation.bookAuthor}</span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.bookPages}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("bookPages", value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold mb-2">
                    Pages:{" "}
                    <span className="font-normal">{adaptation.bookPages}</span>
                  </h2>
                )}
                {isAdmin ? (
                  <EditAdaptation
                    value={adaptation.bookDesc}
                    adaptationId={adaptationId}
                    onSave={(value) => handleSave("bookDesc", value)}
                  />
                ) : (
                  <p className="text-lg font-semibold">
                    Description:{" "}
                    <span className="font-normal">{adaptation.bookDesc}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 justify-around">
          <div className="p-5 mt-5 mb-5 w-[66.5%] flex flex-col justify-center text-pretty font-bold object-center ml-10 bg-orange-50 text-[#153448] rounded-[20px] border-2 border-[#153448] shadow-xl md:w-[50rem] sm:w-[40rem] ">
            <h1 className="text-xl justify-center text-center bg-[#153448] text-white font-bold">
              Comparison
            </h1>
            {isAdmin ? (
              <EditAdaptation
                label="comparison"
                value={adaptation.comparison}
                onSave={(value) => handleSave("comparison", value)}
              />
            ) : (
              <div className="p-10 ">
                {renderComparison(adaptation.comparison)}
              </div>
            )}
          </div>

          {/* <Table /> */}
        </div>

        {isAdmin && <DeleteAdaptation adaptation={adaptation} />}
      </div>

      <Comments />
    </div>
  );
};

export default Adaptation;
