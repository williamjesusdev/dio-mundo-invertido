// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

// Import configs
import firebaseConfig from "./secret/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase
export default app;
