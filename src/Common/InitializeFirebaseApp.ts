import firebase from 'firebase';
import { firebaseConfig } from '../FirebaseConfig/firebaseConfig';

export async function initializeApp(): Promise<void> {
    console.log('Initializing App ..');
    const extraFirebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN
    }
    await firebase.initializeApp({ ...firebaseConfig, ...extraFirebaseConfig });
}