import app from './firebase_config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { where, query, collection, firebase, getFirestore, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const colRef = collection(db, 'subscriptions')

onAuthStateChanged(auth, (user) => {
    if (!user) {
        location.href = "../dist/sign_in.html";
    }
}) 


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
            document.getElementById('subTableBody').innerHTML = "";
            for (let i = 0; i < subscriptions.length; i++) {
                let subName = subscriptions[i].subscriptionName;
                let subValue = subscriptions[i].subscriptionValue;
                let subDate = subscriptions[i].subscriptionDate;
                let subFreq = subscriptions[i].subscriptionFreq;
                let subID = subscriptions[i].id;
                let newRow = document.createElement('div');
                newRow.className = "divTableRow";
                container.appendChild(newRow);
                    let newSubNameRow = document.createElement('div');
                    let newSubValueRow = document.createElement('div');
                    let newSubDateRow = document.createElement('div');
                    let newSubFreqRow = document.createElement('div');
                    let editSubBtn = document.createElement('div');
                    const svgDelete = "<input type='image' class='deleteBtn' data-internalid=" + subID + " src='../delete-alt-svgrepo-com.svg'>";
                    const svgEdit = "<button class='editBtn'>Edit</button>";
                    newSubNameRow.classList.add('divTableCell');
                    newSubValueRow.classList.add('divTableCell');
                    newSubDateRow.classList.add('divTableCell');
                    newSubFreqRow.classList.add('divTableCell');
                    editSubBtn.classList.add('divTableCell-btn')
                    newSubNameRow.textContent = subName;
                    newSubDateRow.textContent = subDate;
                    newSubFreqRow.textContent = subFreq;
                    newSubValueRow.textContent = subValue;
                    newRow.appendChild(newSubNameRow);
                    newRow.appendChild(newSubDateRow);
                    newRow.appendChild(newSubFreqRow);
                    newRow.appendChild(newSubValueRow);
                    newRow.appendChild(editSubBtn);
                    editSubBtn.innerHTML = svgEdit + svgDelete;
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

const popup = document.getElementById("modal");
const overlay = document.getElementById("overlay");

document.getElementById("addSubButton").onclick = function() {addSub()};
document.getElementById("closeAddSub").onclick = function() {closeAddSub()};


function addSub() {
    popup.classList.add("active");
    overlay.classList.add("active");
}

function closeAddSub() {
    popup.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.addEventListener('click', () => {
    deleteConfirmation.classList.remove("active");
    popup.classList.remove("active");
    overlay.classList.remove("active");
})


const deleteConfirmation = document.getElementById("deleteModal");

document.addEventListener('click', (e)=> {
    let target = e.target;
    if(target.classList.contains("deleteBtn"))  {
        console.log('test')
        let rowID = (e.target.dataset.internalid);
        deleteModal(rowID);
    } 
 });

function deleteModal(rowID) {
    deleteConfirmation.classList.add("active");
    overlay.classList.add("active");
        document.getElementById("confirmDelete").onclick = function() {
            const docRef = doc(db, 'subscriptions', rowID)
            deleteConfirmation.classList.remove("active");
            overlay.classList.remove("active");
            deleteDoc(docRef)
        }
        
        document.getElementById("rejectDelete").onclick = function() {
            deleteConfirmation.classList.remove("active");
            overlay.classList.remove("active");
        }
}


