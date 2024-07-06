import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Table = () => {
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            console.log("User document found:", userDoc.data());
            setIsAdmin(userDoc.data().role === "admin");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        console.log("No user is authenticated");
      }
    });

    const fetchTableState = async () => {
      try {
        const tableStateDoc = await getDoc(doc(db, "tableState", "state"));
        if (tableStateDoc.exists()) {
          setClicked(tableStateDoc.data().clicked);
        }
      } catch (error) {
        console.error("Error fetching table state:", error);
      }
    };

    fetchTableState();

    return () => unsubscribe();
  }, []);

  const handleClick = async (index) => {
    if (isAdmin) {
      console.log(`Clicked on index ${index}`);
      setClicked((prevClicked) => {
        const newClicked = [...prevClicked];
        newClicked[index] = !newClicked[index];
        updateTableStateInFirestore(newClicked);
        return newClicked;
      });
    } else {
      console.log("User is not an admin");
    }
  };

  const updateTableStateInFirestore = async (newClicked) => {
    try {
      await setDoc(doc(db, "tableState", "state"), { clicked: newClicked });
    } catch (error) {
      console.error("Error updating table state:", error);
    }
  };

  const getClassName = (index) => {
    return clicked[index]
      ? "border-2 w-[15rem] p-2 bg-teal-500"
      : "border-2 w-[15rem] p-2";
  };

  return (
    <div className="flex flex-col text-white text-center bg-teal-900 p-3 rounded-[15px] w-72 justify-center ">
      <div className={getClassName(0)} onClick={() => handleClick(0)}>
        Plot Fidelity
      </div>
      <div className={getClassName(1)} onClick={() => handleClick(1)}>
        Character Fidelity
      </div>
      <div className={getClassName(2)} onClick={() => handleClick(2)}>
        Themes and Messages
      </div>
      <div className={getClassName(3)} onClick={() => handleClick(3)}>
        Setting and World-Building
      </div>
    </div>
  );
};

export default Table;
