import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import {auth, db} from './firebaseConfig';

// Auth firebase
export const authFirebase = async userState => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userState.email,
      userState.password,
    );
    const userId = userCredential.user.uid;
    const docRef = query(collection(db, 'users'), where('id', '==', userId));
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty) {
      docSnap.forEach(async doc => {
        const user = doc.data();
      });
      await AsyncStorage.setItem('userId', userId);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Forgot password firebase
export const forgotPasswordFirebase = email => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(res => {
        resolve(true);
      })
      .catch(error => {
        resolve(false);
      });
  });
};
