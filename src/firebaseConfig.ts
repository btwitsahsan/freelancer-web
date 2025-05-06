import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, OAuthProvider, onIdTokenChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCU09UdMZ6DZvGxnCHXt1gKW1QIzvVZniE",
    authDomain: "freelancing-platform-70819.firebaseapp.com",
    projectId: "freelancing-platform-70819",
    storageBucket: "freelancing-platform-70819.firebasestorage.app",
    messagingSenderId: "657599703947",
    appId: "1:657599703947:web:0963d1e87ab2d031689d8e",
    measurementId: "G-PG1Y69Z5VH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onIdTokenChanged(auth, async (user) => {
    if (user) {
        const idToken = await user.getIdToken(true);
        localStorage.setItem('freelancingPlatformAuthToken', idToken);
    } else {
        console.log('User is logged out.')
    }
});

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export default app;