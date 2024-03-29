import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      let user;
      docSnap.forEach(async doc => {
        user = doc.data();
      });
      await AsyncStorage.setItem('user', JSON.stringify(user));
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

// Register user firebase
export const registerUserFirebase = async userState => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userState.email,
      userState.password,
    );
    delete userState.password;

    const docRef = await addDoc(collection(db, 'users'), {
      id: userCredential.user.uid,
      ...userState,
    });

    const user = {
      id: userCredential.user.uid,
      ...userState,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    return false;
  }
};
