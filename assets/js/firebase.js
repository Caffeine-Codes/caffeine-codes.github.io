import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmWheIYLOlQIg_3n0klOwOuCidqJhbd0k",
  authDomain: "contactform-caffeinecodes.firebaseapp.com",
  databaseURL: "https://contactform-caffeinecodes-default-rtdb.firebaseio.com",
  projectId: "contactform-caffeinecodes",
  storageBucket: "contactform-caffeinecodes.firebasestorage.app",
  messagingSenderId: "93418793018",
  appId: "1:93418793018:web:f7a79a0728aca15075ed03"
};

let countryName = ""
fetch('https://api.ipregistry.co/?key=tryout').then(function (response) {
    return response.json();
})
.then(function (payload) {
  countryName = payload.location.city + ', ' + payload.location.country.name;
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var contactFormDB = getDatabase(app);

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var subject = getElementVal("subject");
  var message = getElementVal("message");

  var messageid = moment().format('YYYY-MM-DDTHH:mm:ss');
  set(ref(contactFormDB, 'messages/'+messageid),{
    name,
    email,
    subject,
    message,
    countryName
  });

  //   enable alert
  document.querySelector('.sent-message').classList.add('d-block');

  //   remove the alert
  setTimeout(() => {
    document.querySelector('.sent-message').classList.remove('d-block');
  
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
