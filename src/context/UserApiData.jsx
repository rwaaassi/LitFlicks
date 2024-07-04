// import {
//   doc,
//   getDoc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {  onAuthStateChanged } from "firebase/auth";
// import {db, auth} from "../firebase/firebaseConfig"



// // Get comment
// export const getUserComment = async (userId, adaptationId) => {
//   const commentDocRef = doc(db, "users", userId, "comments", adaptationId);
//   const commentDoc = await getDoc(commentDocRef);
//   if (commentDoc.exists()) {
//     return { id: commentDoc.id, ...commentDoc.data() };
//   } else {
//     return null;
//   }
// };

// // Save comment
// export const saveUserComment = async (userId, adaptationId, text) => {
//   const commentDocRef = doc(db, "users", userId, "comments", adaptationId);
//   await setDoc(commentDocRef, { text });
//   const commentDoc = await getDoc(commentDocRef);
//   return { id: commentDoc.id, ...commentDoc.data() };
// };

// // Delete comment 
// export const deleteUserComment = async (userId, adaptationId) => {
//   const commentDocRef = doc(db, "users", userId, "comments", adaptationId);
//   await deleteDoc(commentDocRef);
// };


// export const authState = (callback) => {
//   onAuthStateChanged(auth, callback);
// };
