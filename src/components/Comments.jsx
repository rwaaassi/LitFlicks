import { useState, useEffect } from "react";
import {
  getUserComment,
  getAllComments,
  saveUserComment,
  deleteUserComment,
  authState,
} from "../services/adaptationsApi";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const Comments = () => {
  const { adaptationId } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [editCommentMode, setEditCommentMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getAllComments(adaptationId);
        setAllComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    const unsubscribe = authState(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userComment = await getUserComment(authUser.uid, adaptationId);
        if (userComment) {
          setComment(userComment.text);
          setCommentId(userComment.id);
          setHasCommented(true);
        }
        setIsAdmin(authUser.role === "admin");
      } else {
        setUser(null);
        setHasCommented(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, [adaptationId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSave = async () => {
    if (user && comment.trim()) {
      try {
        await saveUserComment(user.uid, adaptationId, comment.trim());
        setHasCommented(true);
        setEditCommentMode(false);
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
        setEditCommentMode(false);
        const comments = await getAllComments(adaptationId);
        setAllComments(comments);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEditComment = () => {
    setEditCommentMode(true);
  };

  const handleCancelEdit = () => {
    setEditCommentMode(false);
  };

  const handleAddComment = () => {
    setEditCommentMode(true);
  };

  return (
 <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-2/3 ml-10 h-[25%]">
    <h3 className="text-lg font-semibold mb-2">Comments & Discussions : </h3>
    <hr />
    <div className="space-y-4 mt-10">
      {/* Display all comments */}
      {allComments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200 pb-2">
          <p className=" text-black font-bold">
            {comment.email}: <span className="font-semibold">{comment.text}</span>
            {!isAdmin && user && user.uid === comment.userId && (
              <span className="ml-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    handleEditComment(comment.id, "Updated text")
                  }
                >
                  <CiEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  <RiDeleteBin6Line />
                </button>
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
    {!isAdmin && (
      <div>
        {/* Your Comment section */}
        {editCommentMode ? (
          <>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-teal-950 text-white px-4 py-2 rounded-lg"
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
                    <CiEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleCommentDelete}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </>
            ) : (
              <button
                className="bg-teal-950 text-white px-4 py-2 rounded-lg mt-20"
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
  );
};
export default Comments;
