  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {  addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDhGYyjZFxTNb2wBGiQoPLIxzwsMpHqsfM",
    authDomain: "peliculas-b85e5.firebaseapp.com",
    projectId: "peliculas-b85e5",
    storageBucket: "peliculas-b85e5.appspot.com",
    messagingSenderId: "211133796060",
    appId: "1:211133796060:web:aa4877bb944061bce06e19",
    measurementId: "G-HRG2Y83H9X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  
export const save = (Peliculas) => {
    
    addDoc(collection(db, 'Peliculas'), Peliculas)
}

export const getData = (data) => {
   
    onSnapshot(collection(db, 'Peliculas'), data)
}


export const eliminar = (id) =>{
   
    deleteDoc(doc(db,'Peliculas',id))
}


export const obtener = (id) => getDoc(doc(db,'Peliculas',id))


export const update = (id,Peliculas) =>{
   updateDoc(doc(db,'Peliculas',id), Peliculas)
}