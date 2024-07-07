import { useState } from "react";
import { useAddAdaptation } from "../services/adaptationsApi";
import { showToastSuccessMessage } from "../components/toast/Toast";
import "react-toastify/dist/ReactToastify.css";

const AddAdaptation = ({ onClose }) => {
  const { addAdaptation } = useAddAdaptation();
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
    tableData: {
      clickedCells: [
        false, 
        false, 
        false, 
        false, 
      ],
    },
    comments: [],
  });

  const handleAddAdaptation = async (e) => {
    e.preventDefault();
    const flatClickedCells = newAdaptation.tableData.clickedCells.flat();

    const transformedAdaptation = {
      ...newAdaptation,
      tableData: {
clickedCells: flatClickedCells
      } 
    };

    try {
      await addAdaptation(transformedAdaptation);
       showToastSuccessMessage("Adaptation is successfully added");
      onClose();
    } catch (error) {
      console.error("Error adding adaptation:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdaptation({ ...newAdaptation, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Add New Adaptation
      </h3>
      <form onSubmit={handleAddAdaptation} className="space-y-4">
        <input
          type="text"
          name="bookTitle"
          placeholder="Book Title"
          value={newAdaptation.bookTitle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="bookPages"
          placeholder="Book Pages"
          value={newAdaptation.bookPages}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="bookImage"
          placeholder="Book Image URL"
          value={newAdaptation.bookImage}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="bookAuthor"
          placeholder="Book Author"
          value={newAdaptation.bookAuthor}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <textarea
          placeholder="Book Description"
          name="bookDesc"
          value={newAdaptation.bookDesc}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="movieTitle"
          placeholder="Movie Title"
          value={newAdaptation.movieTitle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="moviePoster"
          placeholder="Movie Poster URL"
          value={newAdaptation.moviePoster}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="movieDuration"
          placeholder="Movie Duration"
          value={newAdaptation.movieDuration}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <input
          type="text"
          name="movieDirector"
          placeholder="Movie Director"
          value={newAdaptation.movieDirector}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <textarea
          placeholder="Movie Description"
          name="movieDesc"
          value={newAdaptation.movieDesc}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <textarea
          placeholder="Comparison"
          name="comparison"
          value={newAdaptation.comparison}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#153448]"
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#153448] text-white rounded-md hover:bg-[#2e6f9a]"
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
