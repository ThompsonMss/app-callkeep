import firebase from 'react-native-firebase';

export default async function requestTokenFirebase() {
  if (!(await firebase.messaging().hasPermission())) {
    await firebase.messaging().requestPermission();
  }

  const token = await firebase.messaging().getToken();

  console.log('Token Firebase: ', token);
}
