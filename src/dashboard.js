import app from './firebase_config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { where, query, collection, getFirestore, onSnapshot } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const colRef = collection(db, 'subscriptions')

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
            container = document.getElementById('subTableBody');
            for (let i = 0; i < subscriptions.length; i++) {
                let subName = subscriptions[i].subscriptionName;
                let subValue = subscriptions[i].subscriptionValue;
                let subDate = subscriptions[i].subscriptionDate;
                let subFreq = subscriptions[i].subscriptionFreq;
                let newRow = document.createElement('div');
                newRow.className = "divTableRow";
                container.appendChild(newRow);
                    let newSubNameRow = document.createElement('div');
                    newSubNameRow.classList.add('divTableCell');
                    let newSubValueRow = document.createElement('div');
                    newSubValueRow.classList.add('divTableCell');
                    let newSubDateRow = document.createElement('div');
                    newSubDateRow.classList.add('divTableCell');
                    let newSubFreqRow = document.createElement('div');
                    newSubFreqRow.classList.add('divTableCell');
                    newSubNameRow.textContent = subName;
                    newSubDateRow.textContent = subDate;
                    newSubFreqRow.textContent = subFreq;
                    newSubValueRow.textContent = subValue;
                    newRow.appendChild(newSubNameRow);
                    newRow.appendChild(newSubDateRow);
                    newRow.appendChild(newSubFreqRow);
                    newRow.appendChild(newSubValueRow);
            }
        })
    } else {
        console.log('Not logged in');
    }
})
