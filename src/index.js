import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc,
    deleteDoc, doc, query, where, orderBy, serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCuoc0FnBVEvGh64Ms3IGHsBJlh-nbAmaA",
    authDomain: "subtracker-3be72.firebaseapp.com",
    projectId: "subtracker-3be72",
    storageBucket: "subtracker-3be72.appspot.com",
    messagingSenderId: "663098749757",
    appId: "1:663098749757:web:d493fb11de44304866cb54",
    measurementId: "G-5RVE91EFSW"
  };

  initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// // collection ref
// const colRef = collection (db, 'books')

// // queries
// const q = query(colRef, orderBy("createdAt"))

// // real time collection data
// onSnapshot(q, (snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
// })

// //adding documents
// const addBookForm = document.querySelector('.add')
// addBookForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     addDoc(colRef, {
//         title: addBookForm.title.value,
//         author: addBookForm.author.value,
//         createdAt: serverTimestamp()
//     })
//     .then(() => {
//         addBookForm.reset()
//     })
// })

// //deleting document
// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const docRef = doc(db, 'books', deleteBookForm.id.value)

//     deleteDoc(docRef)
//         .then(() => {
//             deleteBookForm.reset()
//         })
// })

// // get a single document
// const docRef = doc(db, 'books', '9AmgZ8L9rs69C8Ufrih8')


// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(),doc.id)
// })

// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const docRef = doc(db, 'books', updateForm.id.value)

//     updateDoc(docRef, {
//         title: 'updated title'
//     })
//     .then(() => {
//         updateForm.reset()
//     })
// })

// const signupForm = document.querySelector('.signin__form-btn')
// signupForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const email = signupForm.email.value
//     const password = signupForm.password.value

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((cred) => {
//             console.log('user created:', cred.user)
//             signupForm.reset()
//         })
//         .catch((err) => {
//             console.log(err.message)
//         })

// })

// logging in and out

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .catch((err) => {
            console.log(err.message)
    })
})

const loginForm = document.querySelector('.signin__form') 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .catch((err) => {
            console.log(err.message)
        })

})

//subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)

})