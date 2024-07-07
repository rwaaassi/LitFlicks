import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { showToastSuccessMessage } from "../components/toast/Toast";
const EditAdaptation = ({
  label,
  value = "",

  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (
      (label === "bookPages" || label === "movieDuration") &&
      inputValue < 0
    ) {
      alert("Value cannot be negative");
      return;
    }

    setIsEditing(false);
    onSave(inputValue);
    showToastSuccessMessage("Changes Saved Successfully!");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(value);
  };

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter" && !isNaN(inputValue)) {
    e.preventDefault();
    onSave(inputValue.trim().split(/\s+/).join("\n"));
    setIsEditing(false);
  }
};

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 p-1 mr-2 w-full resize-y text-black font-semibold"
            rows={2}
          />
          <button
            onClick={handleSaveClick}
            className="mr-2 bg-green-500 rounded-lg p-1 text-white hover:bg-green-300"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="mr-2 bg-red-500 rounded-lg p-1 text-white hover:bg-red-400"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>{renderComparison(value)}</div>
          <button onClick={handleEditClick} className="ml-2">
            <CiEdit />
          </button>
        </>
      )}
    </div>
  );
};

export const renderComparison = (text) => {
  if (!text || typeof text !== "string") return null;
  const points = text.split("\n").filter((point) => point.trim() !== "");
  return (
    <ul>
      {points.map((point, index) => (
        <li key={index} className="tracking-wide leading-8">
          <strong>
          {point}
          
          </strong>

          </li>
      ))}
    </ul>
  );
};

export default EditAdaptation;
