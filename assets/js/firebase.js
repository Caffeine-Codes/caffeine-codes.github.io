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

  var today = new Date()
  var messageid = today.toLocaleDateString().replaceAll("/",'-') + "-" + today.toLocaleTimeString()
  set(ref(contactFormDB, 'messages/'+messageid  ),{
    name: name,
    email: email,
    subject: subject,
    message: message
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
