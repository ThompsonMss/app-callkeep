import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

export async function requestTokenFirebase() {
  try {
    if (!(await firebase.messaging().hasPermission())) {
      await firebase.messaging().requestPermission();
    }

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
