import { useState, useEffect } from "react";

import { CiEdit } from "react-icons/ci";

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
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(value);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <input
            type={
              label === "bookPages" || label === "movieDuration"
                ? "number"
                : "text"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 p-1 mr-2"
          />
          <button onClick={handleSaveClick} className="mr-2">
            Save
          </button>
          <button onClick={handleCancelClick} className="">
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="mr-2">
            {label === "moviePoster" || label === "bookImage" ? (
              <img
                src={value}
                alt={`${label}`}
                className="w-24 h-24 object-cover mr-2"
              />
            ) : (
              value
            )}
          </p>
          <button onClick={handleEditClick} className="ml-2">
            <CiEdit />
          </button>
        </>
      )}
    </div>
  );
};

export default EditAdaptation;
