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

            console.log(subscriptions)
            
        }) 

        const totalSubs = document.getElementById("totalSubs");
            for (var c = 0; c <= subscriptions.length; c++) {
                let num = 0
                num += c;
                totalSubs.innerHTML = num;
            }
        
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
                    let newSubValueRow = document.createElement('div');
                    let newSubDateRow = document.createElement('div');
                    let newSubFreqRow = document.createElement('div');
                    newSubNameRow.classList.add('divTableCell');
                    newSubValueRow.classList.add('divTableCell');
                    newSubDateRow.classList.add('divTableCell');
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

        const monthlyCost = document.getElementById("monthlySubCost");
            let totalSubValue = 0;
            for (let i = 0; i < subscriptions.length; i++) {
                let subValue = parseInt(subscriptions[i].subscriptionValue);
                totalSubValue += subValue; 
            
            } monthlyCost.innerHTML = totalSubValue;

        const yearlyCost = document.getElementById("yearlySubCost");
            let yearlySubCost = (totalSubValue * 12);
            console.log(yearlySubCost);
            yearlyCost.innerHTML = yearlySubCost;
    }) 
    } else {
        console.log('Not logged in');
    }
})






