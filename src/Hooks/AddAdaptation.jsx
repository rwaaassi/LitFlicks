import { useState } from "react";
import { useAddAdaptation } from "../services/adaptationsApi";


const AddAdaptation = ({ onClose }) => {
  const {addAdaptation} = useAddAdaptation();
  const [newAdaptation, setNewAdaptation] = useState({
    bookTitle: "",
    bookPages: "",
    bookImage: "",
    bookAuthor: "",
    bookDesc: "",
    movieTitle: "",
    moviePoster: "",
    movieDuration: "",
    movieDirector: "",
    movieDesc: "",
    comparison: "",
      "tableData": [
        ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3", "Row 1, Col 4", "Row 1, Col 5"],
        ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3", "Row 2, Col 4", "Row 2, Col 5"]],
        comments: []
  });

  const handleAddAdaptation = async (e) => {
    e.preventDefault();
    try {
      await addAdaptation(newAdaptation);
      onClose();
    } catch (error) {
      console.error("Error adding adaptation:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Add New Adaptation
      </h3>
      <form onSubmit={handleAddAdaptation} className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={newAdaptation.bookTitle}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, bookTitle: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Book Pages"
          value={newAdaptation.bookPages}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, bookPages: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Book Image URL"
          value={newAdaptation.bookImage}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, bookImage: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Book Author"
          value={newAdaptation.bookAuthor}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, bookAuthor: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Book Description"
          value={newAdaptation.bookDesc}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, bookDesc: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Movie Title"
          value={newAdaptation.movieTitle}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, movieTitle: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Movie Poster URL"
          value={newAdaptation.moviePoster}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, moviePoster: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Movie Duration"
          value={newAdaptation.movieDuration}
          onChange={(e) =>
            setNewAdaptation({
              ...newAdaptation,
              movieDuration: e.target.value,
            })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Movie Director"
          value={newAdaptation.movieDirector}
          onChange={(e) =>
            setNewAdaptation({
              ...newAdaptation,
              movieDirector: e.target.value,
            })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Movie Description"
          value={newAdaptation.movieDesc}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, movieDesc: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Comparison"
          value={newAdaptation.comparison}
          onChange={(e) =>
            setNewAdaptation({ ...newAdaptation, comparison: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Adaptation
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdaptation;
