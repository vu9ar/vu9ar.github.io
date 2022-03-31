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

function AuthenticateUser() {
    const dbref = ref(db);
    get(child(dbref, "UsersList/" + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            let dbpass = decPass(snapshot.val().password);
            if (dbpass == pass.value) {
                login();
            } else {
                alert("user does not exist");
            }
        } else {
            alert("username or password is invalid")
        }
    });
}

function decPass(dbpass) {
    var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}

function login(user) {
    let keeploggedIn = document.getElementById('customSwitch1').checked;
    if (!keeploggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "../Main Page/authUserPage.html";
    } else {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location = "../Main Page/authUserPage.html";
    }
}
submit.addEventListener('click', AuthenticateUser);