import app from './firebase_config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { where, query, collection, getFirestore, orderBy, getDocs, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const colRef = collection(db, 'subscriptions')
const addSubscriptionForm = document.querySelector('.user__input')

//add subscription
onAuthStateChanged(auth, (user) => {
    if (user) {
        addSubscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault()

        addDoc(colRef, {
            subscriptionName: addSubscriptionForm.subscription.value,
            subscriptionValue: addSubscriptionForm.price.value,
            subscriptionDate: addSubscriptionForm.renewalDate.value,
            subscrriptionFreq: addSubscriptionForm.frequency.value,
            user: user.uid,
            createdAt: serverTimestamp()
        })
        .then(() => {
            addSubscriptionForm.reset()
        })
     })
     } else {
        addSubscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('not logged in');
            localStorage.setItem("subscriptionName", addSubscriptionForm.subscription.value);
            localStorage.setItem("subscriptionValue", addSubscriptionForm.price.value);
            localStorage.setItem("subscriptionDate", addSubscriptionForm.renewalDate.value);
            localStorage.setItem("subscriptionFreq", addSubscriptionForm.frequency.value);
            const subscriptionName = localStorage.getItem("subscriptionName");
            const subscriptionValue = localStorage.getItem("subscriptionValue");
            const subscriptionDate = localStorage.getItem("subscriptionDate");
            const subscriptionFreq = localStorage.getItem("subscriptionFreq");
            console.log(subscriptionName, subscriptionValue, subscriptionDate, subscriptionFreq);
            location.href = "sign_in.html";
        }) 
    }
})
