import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

export async function requestTokenFirebase(display) {
  try {
    if (!(await firebase.messaging().hasPermission())) {
      await firebase.messaging().requestPermission();
    }

    firebase.notifications().onNotification(async (notification) => {
      display();
    });

    const token = await firebase.messaging().getToken();
    return token;
  } catch (error) {
    Alert.alert(
      'Poxa :/',
      'Não foi possível recuperar seu token. Verifique sua internet e tente novamente.',
      [{text: 'ok, entendi', onPress: () => null}],
      {cancelable: false},
    );
  }
}
