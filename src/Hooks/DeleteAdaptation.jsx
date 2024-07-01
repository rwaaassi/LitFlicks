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
      <button onClick={handleDelete}>Delete Adaptation</button>
    </div>
  );
};

export default DeleteAdaptation;
