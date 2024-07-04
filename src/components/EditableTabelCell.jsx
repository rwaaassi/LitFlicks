import  { useState } from "react";

const EditableTableCell = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    setIsEditing(false);
    onSave(value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(initialValue);
  };

  return (
    <td className="border border-gray-400 px-4 py-2 text-center">
      {isEditing ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-2 py-1"
          />
          <button onClick={handleSave} className="ml-2 text-green-500">
            Save
          </button>
          <button onClick={handleCancel} className="ml-2 text-red-500">
            Cancel
          </button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer">
          {value}
        </div>
      )}
    </td>
  );
};

export default EditableTableCell;
