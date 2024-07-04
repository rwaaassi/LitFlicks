import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAdaptationById,
  useUpdateAdaptation,
  authState,
  getUserComment,
  saveUserComment,
  deleteUserComment,
  getAllComments,
} from "../../services/adaptationsApi";
import DeleteAdaptation from "../../Hooks/DeleteAdaptation";
import EditAdaptation from "../../Hooks/EditAdaptation";
import EditableTableCell from "../../components/EditableTabelCell";
// import { onAuthStateListener } from "../../context/UsersApi";
// import {
//   authState,
//   getUserComment,
//   saveUserComment,
//   deleteUserComment,
// } from "../../context/UserApiData";

const Adaptation = () => {
  const { adaptationId } = useParams();
  const [adaptation, setAdaptation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateAdaptation } = useUpdateAdaptation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
        console.error("Error fetching adaptation :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdaptation();
  }, [adaptationId]);

  useEffect(() => {
    const unsubscribe = authState((user) => {
      if (user) {
        setUser(user);
        setIsAdmin(user.role === "admin");
        fetchUserComment(user.uid, adaptationId);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
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

  const handleTableCellSave = async (rowIndex, colIndex, value) => {
    const updatedTableData = [...adaptation.tableData];
    updatedTableData[rowIndex][colIndex] = value;
    await updateAdaptation(adaptation.id, { tableData: updatedTableData });
    setAdaptation((prev) => ({ ...prev, tableData: updatedTableData }));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

   const handleCommentSave = async () => {
     if (user && comment.trim()) {
       try {
         if (commentId) {
           await saveUserComment(
             user.uid,
             adaptationId,
             comment.trim(),
             commentId
           );
         } else {
           await saveUserComment(user.uid, adaptationId, comment.trim());
         }
         setHasCommented(true);
         setEditMode(false);
         const comments = await getAllComments(adaptationId);
         setAllComments(comments);
       } catch (error) {
         console.error("Error saving comment:", error);
       }
     }
   };

  const handleCommentDelete = async () => {
    if (user && commentId) {
      try {
        await deleteUserComment(user.uid, adaptationId);
        setComment("");
        setCommentId(null);
        setHasCommented(false);
        setEditMode(false);
        const comments = await getAllComments(adaptationId);
        setAllComments(comments);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEditComment = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };


  const handleAddComment = () => {
    setEditMode(true);
  };

  // const handleGetAllComments = async () => {
  //   try {
  //     const userComment = await getUserComment(user.uid, adaptationId);
  //     if (userComment) {
  //       setComment(userComment.text);
  //       setHasCommented(true);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user comment:", error);
  //   }
  //   console.log(comment);
  // };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adaptation) {
    return <div>Adaptation not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Movie Details */}
        <div className="flex-1">
          <div className="relative">
            {isAdmin && (
              <EditAdaptation
                adaptationId={adaptationId}
                onSave={(value) => handleSave("moviePoster", value)}
              />
            )}
            <img
              src={adaptation.moviePoster}
              alt={`Poster for ${adaptation.movieTitle}`}
              className="rounded-lg mb-4 object-cover"
              style={{ maxHeight: "300px" }}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.movieTitle}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("movieTitle", value)}
                />
              ) : (
                <h2>{adaptation.movieTitle}</h2>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.movieDirector}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("movieDirector", value)}
                />
              ) : (
                <p>{adaptation.movieDirector}</p>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.movieDuration}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("movieDuration", value)}
                />
              ) : (
                <p>{adaptation.movieDuration}</p>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.movieDesc}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("movieDesc", value)}
                />
              ) : (
                <p>{adaptation.movieDesc}</p>
              )}
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <div className="relative">
            {isAdmin && (
              <EditAdaptation
                adaptationId={adaptationId}
                onSave={(value) => handleSave("bookImage", value)}
              />
            )}
            <img
              src={adaptation.bookImage}
              alt={`Cover for ${adaptation.bookTitle}`}
              className="rounded-lg mb-4 object-cover"
              style={{ maxHeight: "300px" }}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.bookTitle}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("bookTitle", value)}
                />
              ) : (
                <h2>{adaptation.bookTitle}</h2>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.bookAuthor}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("bookAuthor", value)}
                />
              ) : (
                <p>{adaptation.bookAuthor}</p>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.bookPages}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("bookPages", value)}
                />
              ) : (
                <p>{adaptation.bookPages}</p>
              )}
            </div>
            <div className="flex items-center">
              {isAdmin ? (
                <EditAdaptation
                  value={adaptation.bookDesc}
                  adaptationId={adaptationId}
                  onSave={(value) => handleSave("bookDesc", value)}
                />
              ) : (
                <p>{adaptation.bookDesc}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-red-200 mt-5 mb-5">
        <h1>Comparison</h1>
        {isAdmin ? (
          <EditAdaptation
            value={adaptation.comparison}
            adaptationId={adaptationId}
            onSave={(value) => handleSave("comparison", value)}
          />
        ) : (
          <p>{adaptation.comparison}</p>
        )}
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">
                Plot Fidelity
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Character Fidelity
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Themes and Messages
              </th>
              <th className="border border-gray-400 px-4 py-2">Casting</th>
              <th className="border border-gray-400 px-4 py-2">
                Setting and World-Building
              </th>
            </tr>
          </thead>
          <tbody>
            {adaptation.tableData &&
              adaptation.tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <EditableTableCell
                      key={`${rowIndex}-${colIndex}`}
                      initialValue={cell}
                      onSave={(value) =>
                        handleTableCellSave(rowIndex, colIndex, value)
                      }
                      readOnly={!isAdmin}
                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isAdmin && <DeleteAdaptation adaptation={adaptation} />}

      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="space-y-4">
          {/* Display all comments */}
          {allComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-2">
              <p className="text-sm text-gray-600">
                <strong>{comment.email}:</strong> {comment.text}
              </p>
            </div>
          ))}
        </div>
        {!isAdmin && (
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Your Comment</h3>
            {editMode ? (
              <>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleCommentSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {hasCommented ? (
                  <>
                    <p>{comment}</p>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleEditComment}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleCommentDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleAddComment}
                  >
                    Add Comment
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {/* {!isAdmin && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Comment</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            value={comment}
            onChange={handleCommentChange}
            disabled={hasCommented}
          />
          <div className="flex justify-end">
            {!hasCommented ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCommentSave}
              >
                Save Comment
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCommentDelete}
              >
                Delete Comment
              </button>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Adaptation;
