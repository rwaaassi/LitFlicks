import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc
} from "firebase/firestore";
import {auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const getAdaptations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "adaptations"));
    const adaptations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return adaptations;
  } catch (error) {
    console.error("Error fetching adaptations:", error);
    throw new Error("Error fetching adaptations");
  }
};

export const getAdaptationById = async (adaptationId) => {
  try {
    const docRef = doc(db, "adaptations", adaptationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Adaptation not found");
    }
  } catch (error) {
    throw new Error("Error fetching adaptation");
  }
};

export const useAddAdaptation = () => {
  const navigate = useNavigate();
  const addAdaptation = async (adaptationData) => {
    try {
      const collectionRef = collection(db, "adaptations");
      const docRef = await addDoc(collectionRef, adaptationData);
      navigate(`/adaptation/${docRef.id}`);
      return { id: docRef.id, ...adaptationData };
    } catch (error) {
      throw new Error("Error adding adaptation");
    }
  };

  return { addAdaptation };
};

export const useDeleteAdaptation = () => {

  const deleteAdaptation = async (adaptationId) => {
    
    try {
      const docRef = doc(db, "adaptations", adaptationId);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("Error deleting adaptation");
    }
  };
  return {deleteAdaptation}
}

export const useUpdateAdaptation = () => {

 const updateAdaptation = async (adaptationId, updatedData) => {
    try {
      const docRef = doc(db, "adaptations", adaptationId);
      await updateDoc(docRef, updatedData);
      return { id: adaptationId, ...updatedData };
    } catch (error) {
      throw new Error("Error updating adaptation");
    }
  
  };
  return {updateAdaptation}
}

// Get user comment
export const getUserComment = async (userId, adaptationId) => {
  const commentDocRef = doc(db, "adaptations", adaptationId, "comments", userId);
  const commentDoc = await getDoc(commentDocRef);
  if (commentDoc.exists()) {
    return { id: commentDoc.id, ...commentDoc.data() };
  } else {
    return null;
  }
};

// Get all comments for an adaptation
export const getAllComments = async (adaptationId) => {
  const commentsCollectionRef = collection(db, "adaptations", adaptationId, "comments");
  const commentSnapshot = await getDocs(commentsCollectionRef);
  return commentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Save user comment
export const saveUserComment = async (userId, adaptationId, text) => {
  const commentDocRef = doc(db, "adaptations", adaptationId, "comments", userId);
  await setDoc(commentDocRef, { userId, text });
  const commentDoc = await getDoc(commentDocRef);
  return { id: commentDoc.id, ...commentDoc.data() };
};

// Delete user comment
export const deleteUserComment = async (userId, adaptationId) => {
  const commentDocRef = doc(db, "adaptations", adaptationId, "comments", userId);
  await deleteDoc(commentDocRef);
};

// Listen to auth state
export const authState = (callback) => {
  return onAuthStateChanged(auth, callback);
};