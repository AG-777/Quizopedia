 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//  import { getDatabase,set,ref } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBNQ9CEuYzFtUc82jpJEv3x93FQyAtDTKU",
   authDomain: "login-d5070.firebaseapp.com",
   projectId: "login-d5070",
   storageBucket: "login-d5070.appspot.com",
   messagingSenderId: "562944022739",
   appId: "1:562944022739:web:7464f2b02278f649c79c26"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  const db = getDatabase();
 const auth = getAuth(app);

 //signup button to take you to signup division
 const container = document.querySelector(".container");
 const sign_up_btn = document.querySelector("#sign-up-btn");
 sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
 
 //submit button
 const submit = document.getElementById('submit');
 submit.addEventListener("click",function (event) {
    event.preventDefault()  //prevents page from refreshing

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 
    if (username.trim() === '') {
        // Show SweetAlert2 alert for empty fields
        Swal.fire({
          title: 'Error!',
          text: 'Please fill in all fields.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        Swal.fire({
          title: 'Creating Account...',
          html: 'Please wait while we process your request.',
          allowOutsideClick: false,
          showCancelButton: false, // Hide the cancel button
          showConfirmButton: false, // Hide the confirm button
          onBeforeOpen: () => {
          Swal.showLoading();
          }
        });
        setTimeout(() => {
        // Close loading screen
        Swal.close();
  
        // Show success message
        Swal.fire({
          title: 'Account Created',
          text: 'Successfully!',
          icon: 'success',
          showCancelButton: false, // Hide the cancel button
          showConfirmButton: false, // Hide the confirm button
          allowOutsideClick: false,// Prevent dismissing the popup by clicking outside
        }).then(() => {
              // Redirect to quiz.html
              window.location.href = "quiz.html";
      });

        // Clear form fields after successful login
        
      }, 1000);
      setTimeout(()=>{
        Swal.close();
        this.reset(); // Reset the sign-in form
      },1800);
   })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(email.trim() === '') {
            // Show SweetAlert2 alert for empty fields
        Swal.fire({
            title: 'Error!',
            text: 'Missing  Email !',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
                });
        }
            
        // ..
        });
    }
    
 })