import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import {  connectFirestoreEmulator } from "firebase/firestore"; 
import { db } from "./firebase";  

if (process.env.NODE_ENV === "development") {
  
  connectFirestoreEmulator(db, "localhost", 8080);
}

const favoritesCollection = collection(db, "favorites");

const addFavoriteToFirebase = async (userId, article) => {

  try {
    await addDoc(favoritesCollection, {
      userId,
      title: article.title,
      
    });
  } catch (error) {
    throw error;
  }
};

const removeFavoriteFromFirebase = async (userId, article) => {
 
  try {
    const querySnapshot = await getDocs(favoritesCollection);
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId && doc.data().title === article.title) {
        deleteDoc(doc(favoritesCollection, doc.id));
      }
    });
  } catch (error) {
    throw error;
  }
};

export { addFavoriteToFirebase, removeFavoriteFromFirebase };
