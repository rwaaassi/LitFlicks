import { useNavigate } from "react-router-dom"; 
import { useDeleteAdaptation } from "../services/adaptationsApi"; 

const DeleteAdaptation = ({ adaptation }) => {
  const navigate = useNavigate();
  const {deleteAdaptation} = useDeleteAdaptation()

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this adaptation?"
    );
    if (confirmDelete && adaptation && adaptation.id) {
      try {
        await deleteAdaptation(adaptation.id);
        navigate("/adaptations"); 
      } catch (error) {
        console.error("Failed to delete adaptation:", error);
      }
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4 flex justify-center items-center"
        onClick={handleDelete}
      >
        Delete Adaptation
      </button>
    </div>
  );
};

export default DeleteAdaptation;
