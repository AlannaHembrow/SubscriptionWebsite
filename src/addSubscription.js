import app from './firebase_config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { where, query, collection, getFirestore, orderBy, getDocs, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const colRef = collection(db, 'subscriptions')

//add subscription
onAuthStateChanged(auth, (user) => {
    if (user) {
        const addSubscriptionForm = document.querySelector('.user__input')
        addSubscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault()

        addDoc(colRef, {
            subscriptionName: addSubscriptionForm.subscription.value,
            subscriptionValue: addSubscriptionForm.price.value,
            user: user.uid,
            createdAt: serverTimestamp()
        })
        .then(() => {
            addSubscriptionForm.reset()
        })
     })
     } else {
        console.log('not logged in')
        // location.href = "sign_up.html";
    }
})

// show subscription if logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // real time collection data
        const uid = user.uid;   
        console.log(uid)
        const q = query(colRef, where("user", "==", uid));
        onSnapshot(q, (snapshot) => {
            let subscriptions = []
            snapshot.docs.forEach((doc) => {
                subscriptions.push({ ...doc.data(), id: doc.id })
            })
            console.log(subscriptions)
        })
    } else {
        console.log('Not logged in');
    }
})
