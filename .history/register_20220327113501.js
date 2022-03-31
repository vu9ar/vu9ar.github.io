          // Import the functions you need from the SDKs you need
          import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
          import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
          // TODO: Add SDKs for Firebase products that you want to use
          // https://firebase.google.com/docs/web/setup#available-libraries

          // Your web app's Firebase configuration
          // For Firebase JS SDK v7.20.0 and later, measurementId is optional
          const firebaseConfig = {
              apiKey: "AIzaSyBMTYqa1Ew2jrlJ2-H0mZ90LhgFIDt0wb4",
              authDomain: "tmhlloginreg.firebaseapp.com",
              databaseURL: "https://tmhlloginreg-default-rtdb.europe-west1.firebasedatabase.app",
              projectId: "tmhlloginreg",
              storageBucket: "tmhlloginreg.appspot.com",
              messagingSenderId: "803998512125",
              appId: "1:803998512125:web:ea8fff957afaf87f355f94",
              measurementId: "G-9KRMH3JT74"
          };

          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
          import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
          const db = getDatabase();

          const username = document.getElementById('userInp');
          const pass = document.getElementById('passInp');
          const submit = document.getElementById('sub_btn');

          function isEmptyOrSpaces(str) {
              return str === null || str.match(/^ *$/) !== null;
          }

          function Validation() {
              let userregex = /^[a-zA-Z0-9]{5,}$/;

              if (isEmptyOrSpaces(username.value) ||
                  isEmptyOrSpaces(pass.value)) {
                  alert("you cannot left any field empty!");
                  return false;
              }


              if (!userregex.test(username.value)) {
                  alert("enter a valid username");
                  return false;
              }

              return true;
          }

          function RegisterUser() {
              if (!Validation()) {
                  return;
              };
              const dbRef = ref(db);


              get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
                  if (snapshot.exists()) {
                      alert("Account Already exist");
                  } else {
                      set(ref(db, "UsersList/" + username.value), {
                              username: username.value,
                              password: encPass()
                          })
                          .then(() => {
                              alert("user added successfully");
                          })
                          .catch((error) => {
                              alert("error" + error);
                          })
                  }
              });
          }

          function encPass() {
              var pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
              return pass12.toString();
          }

          submit.addEventListener('click', RegisterUser);