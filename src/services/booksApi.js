import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getBooks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        
    }
}