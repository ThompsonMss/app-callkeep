import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Clipboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import makeStyles from './styles';

import CallIcon from '../../assets/media/images/call.png';

import {requestTokenFirebase} from '../../services/firebase';

export default function Main() {
  const styles = makeStyles();
  const [token, setToken] = React.useState('');

  /*  RECUPERANDO TOKEN DO FIREBASE */

  async function getToken() {
    const tokenRequest = await requestTokenFirebase();
    setToken(tokenRequest);
  }

  function copy(_token) {
    if (_token) {
      Clipboard.setString(_token);
      ToastAndroid.show('Token copiado!', ToastAndroid.SHORT);
    }
  }

  function handleCallRemote() {
    Alert.alert(
      'Chamada Remota',
      "É um serviço para realizar uma 'chamada' online e tempo real que usa o seu token do firebase para localizar seu celular. \n\nVocê vai ser redirecionado para o site do serviço, depois localize e clique no botão 'Ligar' do site para ver a mágica acontencer.",
      [{text: 'Prosseguir', onPress: () => Linking.openURL('')}],
    );
  }

  React.useEffect(getToken, []);

  return (
    <View style={styles.container}>
      {/* Container Imagem */}
      <View>
        <Image
          source={CallIcon}
          resizeMode="cover"
          style={{height: 100, width: 100}}
        />
        <View style={styles.contentTitle}>
          <Text style={[styles.contentTitle.text, styles.contentTitle.bold]}>
            Call
          </Text>
          <Text style={styles.contentTitle.text}>Keep</Text>
        </View>
      </View>

      {/* Container Actions */}
      <View style={styles.contentAction}>
        <View style={styles.contentToken}>
          <Text style={styles.contentToken.text}>Seu token do firebase:</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => copy(token)}
            style={styles.contentToken.box}>
            <Text style={styles.contentToken.box.text}>{token}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => handleCallRemote()}
          style={[styles.buttons.button, styles.buttons.button.colorPink]}>
          <Text style={styles.buttons.button.text}>Chamada Remota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons.button, styles.buttons.button.colorBlurple]}>
          <Text style={styles.buttons.button.text}>Chamada Local</Text>
        </TouchableOpacity>
      </View>

      {/* Container Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://thompson.dev.br')}
          style={styles.footer.button}>
          <Text style={styles.footer.text}>thompson.dev.br</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
