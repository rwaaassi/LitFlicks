
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",
    });

    console.log("User registered as user");
  } catch (error) {
    console.error("Error registering user: ", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // const [isAdmin, setIsAdmin] = useState(false);
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.role === "admin") {
        console.log("User is an admin");
        setIsAdmin(true);
      } else {
        console.log("User logged in: ", user);
        setIsAdmin(false);
      }
    } else {
      console.log("No such user document!");
    }
  } catch (error) {
    console.error("Error logging in user: ", error);
  }
};

// const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log("User logged in: ", userCredential.user);
//   } catch (error) {
//     console.error("Error logging in user: ", error);
//   }
// };

const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out user: ", error);
  }
};

const onAuthStateListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDoc(doc(db, "users", user.uid))
        .then((doc) => {
          if (doc.exists()) {
            callback({ uid: user.uid, ...doc.data() });
          } else {
            console.log("No such document!");
            callback(null);
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          callback(null);
        });
    } else {
      callback(null);
    }
  });
};

export { registerUser, loginUser, onAuthStateListener, logoutUser };
