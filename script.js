// Import Firebase functions using modular syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjI46S2PGPbUsdvQfWXA0EQ6Pd9lpBRCE",
  authDomain: "toxicstudios-6de44.firebaseapp.com",
  databaseURL: "https://toxicstudios-6de44-default-rtdb.firebaseio.com",
  projectId: "toxicstudios-6de44",
  storageBucket: "toxicstudios-6de44.firebasestorage.app",
  messagingSenderId: "22447277764",
  appId: "1:22447277764:web:7635c6bdb024e0d8b6ab91",
  measurementId: "G-9CBQQD863T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Auth service instance

document.addEventListener('DOMContentLoaded', () => {
    console.log('4Mod1 website loaded!');

    // Array of reasons for the "Coming Soon!" 504 error
    const comingSoonReasons = [
        "Backend infrastructure still under construction.",
        "API endpoints not yet fully integrated.",
        "Database synchronization in progress.",
        "Server capacity being scaled up.",
        "Deployment pipelines being finalized.",
        "Load balancer configuration updates pending.",
        "Essential microservices being optimized.",
        "Gateway service experiencing initial setup delays.",
        "Third-party service integrations not complete.",
        "Final testing phase before full rollout."
    ];

    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const randomReason = comingSoonReasons[Math.floor(Math.random() * comingSoonReasons.length)];
            const warningMessage = `(504) ERROR - Coming Soon!: ${randomReason}`;
            console.warn(warningMessage);
            alert(warningMessage);
        });
    });

    // --- Real-time Scroll Area Fit (Throttled) ---
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const footer = document.getElementById('footer');

    let resizeTimeout;
    const resizeInterval = 50; // milliseconds

    function setMainHeight() {
        if (!header || !main || !footer) {
            console.error("Could not find header, main, or footer elements.");
            return;
        }

        const windowHeight = window.innerHeight;
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;

        const availableHeight = windowHeight - headerHeight - footerHeight;
        main.style.height = Math.max(0, availableHeight) + 'px';
    }

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setMainHeight, resizeInterval);
    });

    setMainHeight();
    // --- End Real-time Scroll Area Fit ---


    // --- Firebase Authentication State Handling ---
    const body = document.body;
    const adminButton = document.querySelector('.admin-button');
    const signInLink = document.querySelector('.sign-in');
    const userDisplay = document.querySelector('.user-display');
    const userEmailLabel = userDisplay.querySelector('.user-email-label');
    const logoutLink = document.getElementById('logout-link');

    // Confirmation Dialog Elements
    const confirmDialogOverlay = document.getElementById('confirm-dialog-overlay');
    const logoutConfirmDialog = document.getElementById('logout-confirm-dialog');
    const cancelLogoutButton = document.getElementById('cancel-logout');
    const confirmLogoutButton = document.getElementById('confirm-logout');


    // Function to show the confirmation dialog
    function showConfirmDialog() {
        if (confirmDialogOverlay) {
            confirmDialogOverlay.classList.add('show');
        }
    }

    // Function to hide the confirmation dialog
    function hideConfirmDialog() {
         if (confirmDialogOverlay) {
            confirmDialogOverlay.classList.remove('show');
        }
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User logged in:", user.email);
        body.classList.remove('logged-out');
        body.classList.add('logged-in');

        userEmailLabel.textContent = user.email;

        adminButton.classList.add('logged-in'); // Apply logged-in styles to Admin button


      } else {
        // User is signed out
        console.log("User logged out");
        body.classList.remove('logged-in');
        body.classList.add('logged-out');

        userEmailLabel.textContent = '';
        adminButton.classList.remove('logged-in'); // Remove logged-in styles from Admin button
      }
    });

    // Add event listener for the Logout link in the user dropdown
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            showConfirmDialog(); // Show the confirmation dialog
        });
    } else {
        console.error("Logout link element not found!");
    }

    // Add event listener for the Cancel button in the dialog
    if (cancelLogoutButton) {
        cancelLogoutButton.addEventListener('click', () => {
            hideConfirmDialog(); // Hide the dialog
        });
    }

    // Add event listener for the Log Out button in the dialog
    if (confirmLogoutButton) {
        confirmLogoutButton.addEventListener('click', () => {
            hideConfirmDialog(); // Hide the dialog

            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("User signed out successfully via confirmation");
                // Reload the page after successful logout
                 window.location.reload();
            }).catch((error) => {
                // An error happened.
                console.error("Error signing out:", error);
                alert("Error signing out: " + error.message);
                 // You might choose to reload even on error or handle it differently
                 window.location.reload();
            });
        });
    }

    // --- End Firebase Authentication State Handling ---

});