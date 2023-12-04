// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Import the function correctly
import {
  getFirestore,
  collection,
  addDoc,
  query,
  endAt,
  getDocs,
  orderBy,
  where,
  limit,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-X9dFeP6zgHwIP0KeaiRJbTHUS5lwwIY',
  authDomain: 'dictionary-app-38393.firebaseapp.com',
  projectId: 'dictionary-app-38393',
  storageBucket: 'dictionary-app-38393.appspot.com',
  messagingSenderId: '603555571608',
  appId: '1:603555571608:web:6580f4ff20eff8abe8aded',
  measurementId: 'G-FS76T7NSV1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addSearchedWord = async (word) => {
  try {
    const collectionRef = collection(db, 'dictionary-app');
    const lowerCase = word.toLowerCase();

    const q = query(
      collectionRef,
      orderBy('value'),
      where('value', '==', lowerCase)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) return;

    const data = { key: 'word', value: lowerCase };
    // Add a new document to the collection
    const docRef = await addDoc(collectionRef, data);
    console.log(docRef);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const suggestedWords = async (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const searchTermUpperBound =
    searchTermLower.slice(0, -1) +
    String.fromCharCode(
      searchTermLower.charCodeAt(searchTermLower.length - 1) + 1
    );

  const collectionRef = collection(db, 'dictionary-app');
  const q = query(
    collectionRef,
    orderBy('value'),
    where('value', '>=', searchTermLower),
    where('value', '<', searchTermUpperBound),
    // Apply the limit directly here
    limit(5)
  );

  const snapshot = await getDocs(q); // Pass the constructed 'Query' object 'q'

  // Extract and return the suggested words
  const suggestedWords = [];
  snapshot.forEach((doc) => suggestedWords.push(doc.data().value));
  return suggestedWords;
};
