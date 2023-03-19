import app from "./firebase_config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  where,
  query,
  runTransaction,
  collection,
  setDoc,
  getDoc,
  getFirestore,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const addSubscriptionForm = document.querySelector(".modal__form");
const editSubscriptionForm = document.querySelector(".edit__form");
const colRef = collection(db, "subscriptions");

const subscriptionName = localStorage.getItem("subscriptionName");
const subscriptionValue = localStorage.getItem("subscriptionValue");
const subscriptionDate = localStorage.getItem("subscriptionDate");
const subscriptionFreq = localStorage.getItem("subscriptionFreq");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "../dist/sign_in.html";
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (subscriptionName != null) {
      addDoc(colRef, {
        subscriptionName: subscriptionName,
        subscriptionValue: subscriptionValue,
        subscriptionDate: subscriptionDate,
        subscrriptionFreq: subscriptionFreq,
        user: user.uid,
        createdAt: serverTimestamp(),
      }).then(() => {
        localStorage.removeItem(
          "subscriptionName",
          "subscriptionValue",
          "subscriptionDate",
          "subscriptionFreq"
        );
      });
    }
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // real time collection data
    const uid = user.uid;
    const q = query(colRef, where("user", "==", uid));
    onSnapshot(q, (snapshot) => {
      let subscriptions = [];
      snapshot.docs.forEach((doc) => {
        subscriptions.push({ ...doc.data(), id: doc.id });
      });

      const totalSubs = document.getElementById("totalSubs");
      for (var c = 0; c <= subscriptions.length; c++) {
        let num = 0;
        num += c;
        totalSubs.innerHTML = num;
      }

      container = document.getElementById("subTableBody");
      document.getElementById("subTableBody").innerHTML = "";
      for (let i = 0; i < subscriptions.length; i++) {
        let subName = subscriptions[i].subscriptionName;
        let subValue = subscriptions[i].subscriptionValue;
        let subDate = subscriptions[i].subscriptionDate;
        let subFreq = subscriptions[i].subscriptionFreq;
        let subID = subscriptions[i].id;
        let newRow = document.createElement("div");
        newRow.className = "divTableRow";
        container.appendChild(newRow);
        let newSubNameRow = document.createElement("div");
        let newSubValueRow = document.createElement("div");
        let newSubDateRow = document.createElement("div");
        let newSubFreqRow = document.createElement("div");
        let editSubBtn = document.createElement("div");
        const svgDelete =
          "<input type='image' class='deleteBtn' data-internalid=" +
          subID +
          " src='../delete-alt-svgrepo-com.svg'>";
        const svgEdit =
          "<input type='image' class='editBtn' data-internalid=" +
          subID +
          " src='../edit-svgrepo-com.svg'>";
        newSubNameRow.classList.add("divTableCell");
        newSubValueRow.classList.add("divTableCell");
        newSubDateRow.classList.add("divTableCell");
        newSubDateRow.setAttribute("id", "date");
        newSubFreqRow.classList.add("divTableCell");
        editSubBtn.classList.add("divTableCell-btn");
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
        let subValue = [
          {
            value: parseFloat(subscriptions[i].subscriptionValue),
            freq: subscriptions[i].subscriptionFreq,
          },
        ];

        if (subValue.some((code) => code.freq === "Yearly")) {
          subValue.forEach((yearlyValue) => {
            let calc = yearlyValue.value / 12;
            totalSubValue += calc;
          });
        } else if (subValue.some((code) => code.freq === "Weekly")) {
          subValue.forEach((weeklyValue) => {
            let calc = weeklyValue.value * 4.34524;
            totalSubValue += calc;
          });
        } else if (subValue.some((code) => code.freq === "Fortnightly")) {
          subValue.forEach((fortnightlyValue) => {
            let calc = fortnightlyValue.value * 2.17262;
            totalSubValue += calc;
          });
        } else {
          subValue.forEach((monthlyValue) => {
            totalSubValue += monthlyValue.value;
          });
        }
      }
      monthlyCost.innerHTML = totalSubValue.toFixed(2);

      const yearlyCost = document.getElementById("yearlySubCost");
      let yearlySubCost = totalSubValue * 12;
      yearlyCost.innerHTML = yearlySubCost.toFixed(2);
    });
  } else {
    console.log("Not logged in");
  }
});

const popup = document.getElementById("modal"),
  overlay = document.getElementById("overlay"),
  editPopup = document.getElementById("edit-modal");

document.getElementById("addSubButton").onclick = function () {
  addSub();
};
document.getElementById("closeAddSub").onclick = function () {
  closeAddSub();
};
document.getElementById("closeEditSub").onclick = function () {
  closeAddSub();
};

function addSub() {
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closeAddSub() {
  popup.classList.remove("active");
  editPopup.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", () => {
  deleteConfirmation.classList.remove("active");
  popup.classList.remove("active");
  editPopup.classList.remove("active");
  overlay.classList.remove("active");
  addSubscriptionForm.reset();
  editSubscriptionForm.reset();
});

const deleteConfirmation = document.getElementById("deleteModal");

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("deleteBtn")) {
    let rowID = e.target.dataset.internalid;
    deleteModal(rowID);
  }
});

function deleteModal(rowID) {
  deleteConfirmation.classList.add("active");
  overlay.classList.add("active");
  document.getElementById("confirmDelete").onclick = function () {
    const docRef = doc(db, "subscriptions", rowID);
    deleteConfirmation.classList.remove("active");
    overlay.classList.remove("active");
    deleteDoc(docRef);
  };

  document.getElementById("rejectDelete").onclick = function () {
    deleteConfirmation.classList.remove("active");
    overlay.classList.remove("active");
  };
}

onAuthStateChanged(auth, (user) => {
  addSubscriptionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await runTransaction(db, async (transaction) => {
      const data = {
        subscriptionName: addSubscriptionForm.subName.value,
        subscriptionValue: addSubscriptionForm.cost.value,
        subscriptionDate: addSubscriptionForm.renewalDate.value,
        subscriptionFreq: addSubscriptionForm.frequency.value,
        subscriptionCategory: addSubscriptionForm.category.value,
        subscriptionNotes: addSubscriptionForm.subNotes.value,
        user: user.uid,
        createdAt: serverTimestamp(),
      };

      const myCollectionRef = collection(db, "subscriptions");
      const myDocRef = doc(myCollectionRef);
      await transaction.set(myDocRef, data);
    }).then(() => {
      addSubscriptionForm.reset();
      popup.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("editBtn")) {
    let editRowID = e.target.dataset.internalid;
    editPopup.classList.add("active");
    overlay.classList.add("active");
    let subscriptionNameValue = document.getElementById("editSubName"),
      costValue = document.getElementById("editCost"),
      renewalDateValue = document.getElementById("editRenewalDate"),
      subNotesValue = document.getElementById("editSubNotes"),
      frequencyValue = document.getElementById("editFrequency"),
      categoryValue = document.getElementById("editSelectCategory");
    getDoc(doc(db, "subscriptions", editRowID)).then((docSnap) => {
      if (docSnap.exists()) {
        costValue.value = docSnap.data().subscriptionValue;
        subscriptionNameValue.value = docSnap.data().subscriptionName;
        categoryValue.value = docSnap.data().subscriptionCategory;
        renewalDateValue.value = docSnap.data().subscriptionDate;
        frequencyValue.value = docSnap.data().subscriptionFreq;
        subNotesValue.value = docSnap.data().subscriptionNotes;
        editSubscriptionForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const docRef = doc(db, "subscriptions", editRowID);
          console.log(editRowID);
          setDoc(
            docRef,
            {
              subscriptionName: subscriptionNameValue.value,
              subscriptionCategory: categoryValue.value,
              subscriptionDate: renewalDateValue.value,
              subscriptionNotes: subNotesValue.value,
              subscriptionFreq: frequencyValue.value,
              subscriptionValue: costValue.value,
            },
            {
              merge: true,
            }
          ).then(() => {
            editRowID = "";
            editPopup.classList.remove("active");
            overlay.classList.remove("active");
          });
        });
      } else {
        console.log("No such document!");
      }
    });

    console.log(editRowID);
  }
});

addSubscriptionForm.reset();
editSubscriptionForm.reset();
